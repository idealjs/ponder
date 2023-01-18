import type { Action, Schema, State, Transition } from "@prisma/client";

import transform from "./transfrom";

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
  return await transform(startState, schema, payload);
};

export default runSchema;
