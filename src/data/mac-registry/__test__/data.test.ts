import { describe, it, expect } from "vitest";
import { getRegistryData } from "../index";

describe("mac registry data", () => {
  it(`data should be defined`, async () => {
    const entries = await getRegistryData();
    expect(entries).toBeDefined();
    expect(entries.length).toBeGreaterThan(100);
  });

  it(`data should be a record`, async () => {
    const entries = await getRegistryData();
    const firstEntry = entries[0];
    expect(firstEntry).toBeDefined();
    expect(typeof firstEntry).toBe("object");
    expect(firstEntry.registry).toBeDefined();
    expect(firstEntry.organizationName).toBeDefined();
    expect(firstEntry.organizationAddress).toBeDefined();
  });
});
