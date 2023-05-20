import fs from "fs";
import path from "path";
import { describe, expect, it } from "vitest";

import transform, {
  TransformAction,
  TransformSchema,
  TransformState,
  TransformTransition,
} from "./transform";

const content = fs
  .readFileSync(path.resolve(__dirname, "./transform.case.js"))
  .toString();

const first: TransformState = {
  id: "first",
  transitionId: "firstTransition",
};
const second: TransformState = {
  id: "second",
  transitionId: "secondTransition",
};
const third: TransformState = {
  id: "third",
};

const fourth: TransformState = {
  id: "fourth",
  transitionId: "fourthTransition",
};

const firstTransition: TransformTransition = {
  id: "firstTransition",
  faildToStateId: "third",
  successToStateId: "second",
  actionId: "firstAction",
};
const secondTransition: TransformTransition = {
  id: "secondTransition",
  successToStateId: "fourth",
  actionId: "secondAction",
};
const fourthTransition: TransformTransition = {
  id: "fourthTransition",
  actionId: "fourthAction",
};

const firstAction: TransformAction = { id: "firstAction", content };
const secondAction: TransformAction = { id: "secondAction", content };
const fourthAction: TransformAction = { id: "fourthAction", content };

const schema: TransformSchema = {
  id: "test schema",
  states: {
    first,
    second,
    third,
    fourth,
  },
  transitions: {
    firstTransition,
    secondTransition,
    fourthTransition,
  },
  actions: {
    firstAction,
    secondAction,
    fourthAction,
  },
};

describe("transform", () => {
  it("first->second", async () => {
    const payload = {
      count: 0,
      rule: {
        0: true,
      },
    };
    const result = await transform(first, schema, payload);
    expect(result).toEqual({
      result: {
        count: 1,
      },
      stateId: "second",
    });
  });
  it("first->third", async () => {
    const payload = {
      count: 0,
      0: false,
    };
    const result = await transform(first, schema, payload);
    expect(result).toEqual({
      stateId: "third",
    });
  });
  it("first->second->fourth", async () => {
    const payload = {
      count: 0,
      rule: {
        0: true,
        1: true,
      },
    };
    const result = await transform(first, schema, payload);
    expect(result).toEqual({
      result: {
        count: 2,
      },
      stateId: "fourth",
    });
  });
});
