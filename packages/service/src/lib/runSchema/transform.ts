import { Action, State, StateType, Transition } from "@prisma/client";

import { EffectStatus } from "../effect/type";
import act from "./act";
import { IPipelineData } from "./type";

const transform = async (
  currentPipelineData: IPipelineData<unknown>,
  records: {
    stateRecords: Partial<Record<string, State>>;
    transitionRecords: Partial<Record<string, Transition>>;
    actionRecords: Partial<Record<string, Action>>;
  }
): Promise<IPipelineData<unknown>> => {
  const { stateRecords, transitionRecords, actionRecords } = records;
  const state = currentPipelineData.state;

  const transition = state?.transitionId
    ? transitionRecords[state.transitionId]
    : null;

  const action = transition?.actionId
    ? actionRecords[transition.actionId]
    : null;

  if (state?.stateType === StateType.FINAL_STATE) {
    return currentPipelineData;
  }

  if (action?.content == null) {
    return {
      ...currentPipelineData,
      payload: {
        effectStatus: EffectStatus.FAILD,
        data: undefined,
      },
    };
  }

  const result = await act({ content: action.content }, currentPipelineData);

  console.log("[debug] stateId", state?.id);
  console.log("[debug] transition", transition?.id);
  console.log("[debug] action", action?.id);
  console.log("[debug] result", result);

  const nextStateId =
    result.status === EffectStatus.SUCCESS
      ? transition?.successToStateId
      : transition?.faildToStateId;

  const nextState = nextStateId != null ? stateRecords[nextStateId] : null;

  const nextPipelineData = {
    state: nextState,
    payload: result.data,
    actionStack: [action.id, ...(currentPipelineData.actionStack ?? [])],
  };

  return await transform(nextPipelineData, records);
};

export default transform;
