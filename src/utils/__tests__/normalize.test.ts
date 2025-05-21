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

  it("should handle separator", () => {
    expect(normalize("00:11:22:33:44:55", { separator: ":" })).toBe(
      "00:11:22:33:44:55",
    );
    expect(normalize("00:11:22:33:44:55", { separator: "-" })).toBe(
      "00-11-22-33-44-55",
    );
    expect(normalize("00:11:22:33:44:55", { separator: "." })).toBe(
      "00.11.22.33.44.55",
    );
  });

  it("should handle keep case", () => {
    expect(normalize("00:Aa:Bb:Cc:Dd:Ee", { case: "keep" })).toBe(
      "00AaBbCcDdEe",
    );
    expect(normalize("00:Aa:Bb:Cc:Dd:Ee", { case: "lower" })).toBe(
      "00aabbccddee",
    );
    expect(normalize("00:Aa:Bb:Cc:Dd:Ee", { case: "upper" })).toBe(
      "00AABBCCDDEE",
    );
  });

  it("should handle keep case with separator", () => {
    expect(
      normalize("00:Aa:Bb:Cc:Dd:Ee", { case: "keep", separator: ":" }),
    ).toBe("00:Aa:Bb:Cc:Dd:Ee");
    expect(
      normalize("00:Aa:Bb:Cc:Dd:Ee", { case: "lower", separator: ":" }),
    ).toBe("00:aa:bb:cc:dd:ee");
    expect(
      normalize("00:Aa:Bb:Cc:Dd:Ee", { case: "upper", separator: ":" }),
    ).toBe("00:AA:BB:CC:DD:EE");
  });
});
