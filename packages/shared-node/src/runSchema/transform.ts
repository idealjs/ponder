import type { State, Transition } from "@prisma/client";

import { Optional } from "../type";
import act, { TransformAction } from "./act";

export type TransformState = Optional<
  Pick<State, "id" | "transitionId">,
  "transitionId"
>;

export type TransformTransition = Optional<
  Pick<Transition, "id" | "actionId" | "faildToStateId" | "successToStateId">,
  "actionId" | "faildToStateId" | "successToStateId"
>;

export type { TransformAction } from "./act";

export type TransformSchema = {
  id: string;
  states: Partial<Record<TransformState["id"], TransformState>>;
  transitions: Partial<Record<TransformTransition["id"], TransformTransition>>;
  actions: Partial<Record<TransformAction["id"], TransformAction>>;
};

const transform = async (
  state: TransformState,
  schema: TransformSchema,
  payload?: any
): Promise<{
  stateId: string;
  error?: any;
  result?: any;
}> => {
  const transition = state?.transitionId
    ? schema.transitions[state.transitionId]
    : null;

  const action = transition?.actionId
    ? schema.actions[transition.actionId]
    : null;

  if (action == null) {
    return {
      stateId: state.id,
    };
  }

  let nextPayload: any;
  let result: any;
  let error: any;

  const success = await act(action, {
    payload,
    setNextPayload(payload) {
      nextPayload = payload;
    },
    setResult(_result: any) {
      result = _result;
    },
    setError(_error: any) {
      error = _error;
    },
  });

  const nextStateId = success
    ? transition?.successToStateId
    : transition?.faildToStateId;

  const nextState = nextStateId ? schema.states[nextStateId] : null;

  if (nextState == null) {
    return {
      stateId: state.id,
      result: result,
      error: error,
    };
  }

  return await transform(nextState, schema, nextPayload);
};

export default transform;
