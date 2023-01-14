import fs from "fs";
import path from "path";
import { describe, expect, it } from "vitest";

import parseModuleFromContent from ".";

describe("parseModuleFromContent", () => {
  it("export default", async () => {
    const script = fs.readFileSync(path.resolve(__dirname, "./sum")).toString();

    const module = await parseModuleFromContent(script);
    const result = module.default(1, 2);
    expect(result).toBe(3);
  });

  it("export sum", async () => {
    const script = fs.readFileSync(path.resolve(__dirname, "./sum")).toString();

    const module = await parseModuleFromContent(script);
    const result = module.sum(1, 2);
    expect(result).toBe(3);
  });
});
