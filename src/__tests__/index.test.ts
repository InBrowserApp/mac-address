import * as pkg from "../index";
import { describe, it, expect } from "vitest";

describe("index", () => {
  it("should export all utils", () => {
    expect(pkg).toBeDefined();
  });
});
