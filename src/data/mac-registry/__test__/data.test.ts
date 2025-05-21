import { describe, it, expect } from "vitest";
import { cid, iab, oui, oui28, oui36 } from "../index";

describe("mac registry data", () => {
  const dataList = {
    cid,
    iab,
    oui,
    oui28,
    oui36,
  };

  for (const [key, data] of Object.entries(dataList)) {
    it(`${key} data should be defined`, () => {
      const entries = data as MACPrefixEntry[];
      expect(entries).toBeDefined();
      expect(Array.isArray(entries)).toBe(true);
      expect(entries.length).toBeGreaterThan(0);
      for (const entry of entries) {
        expect(entry.registry).toBeDefined();
        expect(entry.assignment).toBeDefined();
        expect(entry.organizationName).toBeDefined();
        expect(entry.organizationAddress).toBeDefined();
      }
    });
  }
});
