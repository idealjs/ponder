import type { Action, Schema, State, Transition } from "@prisma/client";
import { StateType } from "@prisma/client";

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
    return state.stateType === StateType.START_STATE;
  });

  if (startState == null) {
    return;
  }

  return await transform(
    { state: startState, payload, actionStack: [] },
    {
      stateRecords: arrayToRecord(schema.states),
      transitionRecords: arrayToRecord(schema.transitions),
      actionRecords: arrayToRecord(schema.actions),
    }
  );
};

export default runSchema;
