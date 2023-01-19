import type { Action, Schema, State, Transition } from "@prisma/client";

import arrayToRecord from "./arrayToRecord";
import transform from "./transform";

const runSchema = async (
  schema: Schema & {
    states: State[];
    transitions: Transition[];
    actions: Action[];
  },
  payload?: any
) => {
  const startState = schema.states.find((state) => {
    return state.isStartState;
  });
  if (startState == null) {
    return;
  }

  return await transform(
    startState,
    {
      ...schema,
      states: arrayToRecord(schema.states),
      transitions: arrayToRecord(schema.transitions),
      actions: arrayToRecord(schema.actions),
    },
    payload
  );
};

export default runSchema;
