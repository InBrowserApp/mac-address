import { describe, it, expect } from "vitest";
import { toNumber, toBigInt } from "../convert";

describe("toNumber", () => {
  it("should convert MAC address to number", () => {
    const example = "00:11:22:33:44:55";
    const result = toNumber(example, 16);
    expect(result).toBe("1122334455");
  });

  it("should convert MAC address to number in different bases", () => {
    const example = "00:11:22:33:44:55";
    const result16 = toNumber(example, 16);
    expect(result16).toBe("1122334455");

    const result10 = toNumber(example, 10);
    expect(result10).toBe("73588229205");

    const result8 = toNumber(example, 8);
    expect(result8).toBe("1044214642125");

    const result2 = toNumber(example, 2);
    expect(result2).toBe("1000100100010001100110100010001010101");

    const result36 = toNumber(example, 36);
    expect(result36).toBe("xt0j51x");

    const result64 = toNumber(example, 64);
    expect(result64).toBe("14YCqHL");

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    expect(() => toNumber(example, 65 as any)).toThrow("Unsupported base: 65");
  });

  it("should handle leading zeros", () => {
    const example = "00:00:00:00:00:00";
    const result = toNumber(example, 64);
    expect(result).toBe("0");
  });
});

describe("toBigInt", () => {
  it("should convert MAC address to BigInt", () => {
    const example = "00:11:22:33:44:55";
    const result = toBigInt(example);
    expect(result).toBe(73588229205n);
  });
});
