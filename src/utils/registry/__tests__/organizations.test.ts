import { describe, it, expect } from "vitest";
import { getOrganizations, getOrganizationAssignments } from "../organizations";

describe("getOrganizations", () => {
  it("should return a set of unique organization names", async () => {
    const organizations = await getOrganizations();
    expect(organizations).toBeInstanceOf(Array);
    expect(organizations.length).toBeGreaterThan(0);
  });

  it("should cache results by default", async () => {
    const first = await getOrganizations();
    const second = await getOrganizations();
    expect(first).toStrictEqual(second);
  });
});

describe("getOrganizationAssignments", () => {
  it("should return assignments for a known organization", async () => {
    const assignments = await getOrganizationAssignments("XEROX CORPORATION");
    expect(assignments).toBeDefined();
    expect(assignments.length).toBeGreaterThan(0);
    expect(assignments[0].organizationName).toBe("XEROX CORPORATION");
  });

  it("should return empty array for unknown organization", async () => {
    const assignments = await getOrganizationAssignments("NonexistentOrg123");
    expect(assignments).toEqual([]);
  });

  it("should be case sensitive", async () => {
    const upper = await getOrganizationAssignments("XEROX CORPORATION");
    const lower = await getOrganizationAssignments("xerox corporation");
    expect(upper).not.toStrictEqual(lower);
  });

  it("should cache results by default", async () => {
    const first = await getOrganizationAssignments("Apple");
    const second = await getOrganizationAssignments("Apple");
    expect(first).toStrictEqual(second);
  });
});
