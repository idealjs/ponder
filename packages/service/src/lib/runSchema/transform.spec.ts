import type { Action, Schema, State, Transition } from "@prisma/client";
import { StateType } from "@prisma/client";
import fs from "fs";
import path from "path";
import { describe, expect, it } from "vitest";

import arrayToRecord from "./arrayToRecord";
import transform from "./transform";

const content = fs
  .readFileSync(path.resolve(__dirname, "./transform.case.js"))
  .toString();

const first: State = {
  id: "first",
  name: "first",
  schemaId: "test schema",
  transitionId: "firstTransition",
  stateType: StateType.START_STATE,
  tolerance: 3,
  positionX: 0,
  positionY: 0,
};

const second: State = {
  id: "second",
  name: "second",
  schemaId: "test schema",
  transitionId: "secondTransition",
  stateType: StateType.ORDINARY_STATE,
  tolerance: 1,
  positionX: 0,
  positionY: 0,
};

const third: State = {
  id: "third",
  name: "third",
  schemaId: "test schema",
  stateType: StateType.ORDINARY_STATE,
  tolerance: 2,
  transitionId: null,
  positionX: 0,
  positionY: 0,
};

const fourth: State = {
  id: "fourth",
  name: "fourth",
  schemaId: "test schema",
  transitionId: null,
  stateType: StateType.FINAL_STATE,
  tolerance: null,
  positionX: 0,
  positionY: 0,
};

const firstTransition: Transition = {
  id: "firstTransition",
  faildToStateId: "third",
  successToStateId: "second",
  actionId: "firstAction",
};

const secondTransition: Transition = {
  id: "secondTransition",
  successToStateId: "fourth",
  faildToStateId: null,
  actionId: "secondAction",
};

const firstAction: Action = { id: "firstAction", name: "firstAction", content };

const secondAction: Action = {
  id: "secondAction",
  name: "secondAction",
  content,
};
const fourthAction: Action = {
  id: "fourthAction",
  name: "fourthAction",
  content,
};

const schema: Schema & {
  states: State[];
  transitions: Transition[];
  actions: Action[];
} = {
  id: "test schema",
  name: "test schema",
  states: [first, second, third, fourth],
  transitions: [firstTransition, secondTransition],
  actions: [firstAction, secondAction, fourthAction],
};

describe("transform", () => {
  it("first->third", async () => {
    const payload = {
      count: 0,
      0: false,
    };
    const result = await transform(
      { state: first, payload },
      {
        stateRecords: arrayToRecord(schema.states),
        transitionRecords: arrayToRecord(schema.transitions),
        actionRecords: arrayToRecord(schema.actions),
      }
    );
    expect(result).toMatchInlineSnapshot(`
      {
        "actionStack": [
          "firstAction",
        ],
        "payload": {
          "data": undefined,
          "effectStatus": "NO_CONTENT",
        },
        "state": {
          "id": "third",
          "name": "third",
          "positionX": 0,
          "positionY": 0,
          "schemaId": "test schema",
          "stateType": "ORDINARY_STATE",
          "tolerance": 2,
          "transitionId": null,
        },
      }
    `);
  });
  it("first->second->fourth", async () => {
    const payload = {
      count: 0,
      rule: {
        0: true,
        1: true,
      },
    };
    const result = await transform(
      { state: first, payload },
      {
        stateRecords: arrayToRecord(schema.states),
        transitionRecords: arrayToRecord(schema.transitions),
        actionRecords: arrayToRecord(schema.actions),
      }
    );
    expect(result).toMatchInlineSnapshot(`
      {
        "actionStack": [
          "firstAction",
        ],
        "payload": {
          "data": undefined,
          "effectStatus": "NO_CONTENT",
        },
        "state": {
          "id": "third",
          "name": "third",
          "positionX": 0,
          "positionY": 0,
          "schemaId": "test schema",
          "stateType": "ORDINARY_STATE",
          "tolerance": 2,
          "transitionId": null,
        },
      }
    `);
  });
});
