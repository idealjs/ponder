import type { Action, Schema, State, Transition } from "@prisma/client";

import act from "./act";

const transform = async (
  state: State,
  schema: Schema & {
    states: State[];
    transitions: Transition[];
    actions: Action[];
  },
  payload?: any
): Promise<{
  stateId: string;
  error: any | null;
  result: any | null;
}> => {
  const transition = schema.transitions.find(
    (transition) => transition.id === state?.transitionId
  );

  const action = schema.actions.find(
    (action) => action.id === transition?.actionId
  );

  if (action == null) {
    return {
      stateId: state.id,
      result: null,
      error: null,
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

  const nextState = schema.states.find((state) => state.id === nextStateId);

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
