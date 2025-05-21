import { dummy } from "../index";
import { describe, it, expect } from "vitest";

describe("dummy", () => {
  it("should return dummy", () => {
    expect(dummy()).toBe("dummy");
  });
});
