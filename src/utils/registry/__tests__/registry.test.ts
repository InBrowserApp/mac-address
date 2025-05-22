import { describe, it, expect } from "vitest";
import { getRegistries, getRegistryAssignments } from "../registry";

describe("getRegistries", () => {
  it("should return a set of unique registry names", () => {
    const registries = getRegistries();
    expect(registries).toBeInstanceOf(Array);
    expect(registries.length).toBeGreaterThan(0);
    expect(registries).toEqual(["MA-L", "MA-M", "MA-S", "CID", "IAB"]);
  });
});

describe("getRegistryAssignments", () => {
  it("should return assignments for a known registry", async () => {
    const assignments = await getRegistryAssignments("MA-L");
    expect(assignments).toBeDefined();
    expect(assignments.length).toBeGreaterThan(0);
    expect(assignments[0].registry).toBe("MA-L");
  });

  it("should return empty array for unknown registry", async () => {
    const assignments = await getRegistryAssignments("NonexistentRegistry123");
    expect(assignments).toEqual([]);
  });

  it("should be case sensitive", async () => {
    const upper = await getRegistryAssignments("MA-L");
    const lower = await getRegistryAssignments("ma-l");
    expect(upper).not.toStrictEqual(lower);
  });

  it("should cache results by default", async () => {
    const first = await getRegistryAssignments("MA-L");
    const second = await getRegistryAssignments("MA-L");
    expect(first).toStrictEqual(second);
  });
});
