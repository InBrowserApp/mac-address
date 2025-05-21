import { describe, it, expect } from "vitest";
import { normalize } from "../normalize";

describe("normalize", () => {
  it("should convert MAC address to uppercase and remove non-hex characters", () => {
    expect(normalize("00:11:22:33:44:55")).toBe("001122334455");
    expect(normalize("00-11-22-33-44-55")).toBe("001122334455");
    expect(normalize("00.11.22.33.44.55")).toBe("001122334455");
    expect(normalize("00 11 22 33 44 55")).toBe("001122334455");
  });

  it("should handle lowercase input", () => {
    expect(normalize("00:11:22:33:44:55")).toBe("001122334455");
    expect(normalize("aa:bb:cc:dd:ee:ff")).toBe("AABBCCDDEEFF");
  });

  it("should handle mixed case input", () => {
    expect(normalize("Aa:Bb:Cc:Dd:Ee:Ff")).toBe("AABBCCDDEEFF");
  });

  it("should handle input with extra characters", () => {
    expect(normalize("00:11:22:33:44:55#")).toBe("001122334455");
    expect(normalize("00:11:22:33:44:55!")).toBe("001122334455");
  });
});
