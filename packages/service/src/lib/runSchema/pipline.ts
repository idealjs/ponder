import type { Action, Schema, State, Transition } from "@prisma/client";
import { StateType } from "@prisma/client";
import { last, Subject, tap } from "rxjs";

import { EffectStatus } from "../effect/type";
import act from "./act";
import arrayToRecord from "./arrayToRecord";

export interface IPipelineData<Payload> {
  state: State;
  payload: Payload;
}

export interface IRecord {
  stateId: string;
  effectStack: { pipelineData: IPipelineData<unknown> }[];
}

export class Pipeline {
  public runner = new Subject<IPipelineData<unknown>>();
  public cleaner = new Subject<IRecord>();
  public failureCounter = 0;
  public actionRecords: Partial<Record<string, Action>>;
  public transitionRecords: Partial<Record<string, Transition>>;
  public stateRecords: Partial<Record<string, State>>;
  public currentPipelineData?: IPipelineData<unknown>;
  public records: IRecord[] = [];

  constructor(params: {
    schema: Schema;
    states: State[];
    transitions: Transition[];
    actions: Action[];
  }) {
    this.actionRecords = arrayToRecord(params.actions);
    this.stateRecords = arrayToRecord(params.states);
    this.transitionRecords = arrayToRecord(params.transitions);

    this.runner.pipe(
      tap(async (pipelineData: IPipelineData<unknown>) => {
        const state = pipelineData.state;

        const transition = state?.transitionId
          ? this.transitionRecords[state.transitionId]
          : null;

        const action = transition?.actionId
          ? this.actionRecords[transition.actionId]
          : null;

        let record = this.records.find((v) => v.stateId === state.id);
        if (record == null) {
          record = {
            stateId: state.id,
            effectStack: [],
          };
          this.records.push(record);
        }
        record.effectStack.push({ pipelineData });

        if (state?.stateType === StateType.FINAL_STATE) {
          this.runner.complete();
          return;
        }

        if (action?.content == null) {
          this.retry(pipelineData);
          return;
        }

        try {
          const actResult = await act(
            {
              content: action.content,
            },
            pipelineData
          );
          if (actResult.error != null) {
            this.retry(pipelineData);
            return;
          }

          const nextStateId =
            actResult.status === EffectStatus.SUCCESS
              ? transition?.successToStateId
              : transition?.faildToStateId;

          const nextState =
            nextStateId != null ? this.stateRecords[nextStateId] : null;

          if (nextState == null) {
            this.retry(pipelineData);
            return;
          }

          const nextPipelineData = {
            state: nextState,
            payload: actResult.data,
          };

          this.runner.next(nextPipelineData);
          this.failureCounter = 0;
        } catch (error) {
          this.retry(pipelineData);
        }
      }),
      last()
    );

    this.cleaner.pipe(
      tap(async (record: IRecord) => {}),
      last()
    );
  }

  public start = <Payload>(payload: Payload) => {
    const startState = Object.values(this.stateRecords).find((state) => {
      return state?.stateType === StateType.START_STATE;
    });
    if (startState == null) {
      return;
    }
    this.runner.next({
      state: startState,
      payload,
    });
  };

  public retry = (pipelineData: IPipelineData<unknown>) => {
    const state = pipelineData.state;
    if (state.tolerance == null || this.failureCounter > state.tolerance) {
      recordsToDB({
        records: this.records,
      });
      this.clean(state.id);
      throw new Error("Reached the maximum failure tolerance");
    }
    this.failureCounter++;
    this.runner.next(pipelineData);
  };

  public clean = (stateId: string) => {
    const record = this.records.find((r) => r.stateId === stateId);
    if (record == null) {
      throw new Error(`No related record while clean effect ${stateId}`);
    }
    this.cleaner.next(record);
  };
}

export const recordsToDB = async (params: { records: IRecord[] }) => {};
