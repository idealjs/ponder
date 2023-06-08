import fs from "fs";
import path from "path";
import { describe, expect, it, vi } from "vitest";

import act from "./act";

describe("act", () => {
  it("act result true", async () => {
    const content = fs
      .readFileSync(path.resolve(__dirname, "./act_true.case.js"))
      .toString();

    console.log(content);
    const actPayload = "any payload";
    const actResult = await act(
      {
        content,
      },
      {
        payload: actPayload,
      }
    );

    expect(actResult).toBe(true);
  });

  it("act result false", async () => {
    const content = fs
      .readFileSync(path.resolve(__dirname, "./act_false.case.js"))
      .toString();

    const actPayload = "any payload";
    const actResult = await act(
      {
        content,
      },
      {
        payload: actPayload,
      }
    );

    expect(actResult).toBe(false);
  });
});
