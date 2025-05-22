import { describe, it, expect } from "vitest";
import { searchAssignments, getAssignment } from "../assignments";

describe("search assignments", () => {
  it("should return an array of assignments", async () => {
    const assignments = await searchAssignments("00");
    expect(assignments).toBeDefined();
    expect(assignments.length).toBeGreaterThan(2);
  });

  it("should return only one assignment for 00000000", async () => {
    const assignments = await searchAssignments("00000000");
    expect(assignments.length).toBe(1);
    expect(assignments[0].assignment).toBe("000000");
  });

  it("should return an array of assignments for AA", async () => {
    const assignments = await searchAssignments("AA");
    expect(assignments.length).toBeGreaterThan(2);
  });
});

describe("get assignment", () => {
  it("should return an assignment", async () => {
    const assignment = await getAssignment("100020");
    expect(assignment).toBeDefined();
    expect(assignment?.organizationName).toContain("Apple");
  });
});
