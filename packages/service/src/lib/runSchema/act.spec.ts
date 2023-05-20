import fs from "fs";
import path from "path";
import { describe, expect, it, vi } from "vitest";

import act from "./act";

describe("act", () => {
  it("act result true", async () => {
    let nextPayload;
    const setNextPayload = vi.fn((_payload) => {
      nextPayload = _payload;
    });

    let result;
    const setResult = vi.fn((_result) => {
      result = _result;
    });

    let error;
    const setError = vi.fn((_error) => {
      error = _error;
    });

    const content = fs
      .readFileSync(path.resolve(__dirname, "./act_true.case.js"))
      .toString();

    const actPayload = "any payload";
    const actResult = await act(
      {
        id: "testId",
        content,
      },
      {
        payload: actPayload,
        setNextPayload,
        setResult,
        setError,
      }
    );

    expect(actResult).toBe(true);
    expect(setNextPayload).toBeCalledTimes(1);
    expect(setResult).toBeCalledTimes(1);
    expect(setError).toBeCalledTimes(1);

    expect(nextPayload).toEqual({
      hello: "world",
      inComePayload: actPayload,
    });

    expect(result).toBe("result string");

    expect(error).toBe("error string");
  });

  it("act result false", async () => {
    let nextPayload;
    const setNextPayload = vi.fn((_payload) => {
      nextPayload = _payload;
    });

    let result;
    const setResult = vi.fn((_result) => {
      result = _result;
    });

    let error;
    const setError = vi.fn((_error) => {
      error = _error;
    });

    const content = fs
      .readFileSync(path.resolve(__dirname, "./act_false.case.js"))
      .toString();

    const actPayload = "any payload";
    const actResult = await act(
      {
        id: "testId",
        content,
      },
      {
        payload: actPayload,
        setNextPayload,
        setResult,
        setError,
      }
    );

    expect(actResult).toBe(false);
    expect(setNextPayload).toBeCalledTimes(1);
    expect(setResult).toBeCalledTimes(1);
    expect(setError).toBeCalledTimes(1);

    expect(nextPayload).toEqual({
      hello: "world",
      inComePayload: actPayload,
    });

    expect(result).toEqual({ result: "result object" });

    expect(error).toEqual({ error: "error object" });
  });
});
