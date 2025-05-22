import { describe, it, expect } from "vitest";
import { toIPv6LinkLocal } from "../ipv6";

describe("toIPv6LinkLocal", () => {
  it("should convert MAC address to IPv6 link-local address", () => {
    const mac = "00:11:22:33:44:55";
    const expected = "fe80::211:22ff:fe33:4455";
    expect(toIPv6LinkLocal(mac)).toBe(expected);
  });

  it("should handle different MAC address formats", () => {
    const mac1 = "00-11-22-33-44-55";
    const mac2 = "00.11.22.33.44.55";
    const mac3 = "00 11 22 33 44 55";
    const expected = "fe80::211:22ff:fe33:4455";

    expect(toIPv6LinkLocal(mac1)).toBe(expected);
    expect(toIPv6LinkLocal(mac2)).toBe(expected);
    expect(toIPv6LinkLocal(mac3)).toBe(expected);
  });

  it("should handle MAC addresses with different case", () => {
    const mac = "Aa:Bb:Cc:Dd:Ee:Ff";
    const expected = "fe80::a8bb:ccff:fedd:eeff";
    expect(toIPv6LinkLocal(mac)).toBe(expected);
  });

  it("should handle invalid MAC addresses", () => {
    const mac = "00:11:22:33:44:55:66";
    expect(() => toIPv6LinkLocal(mac)).toThrow();
  });

  it("should handle MAC addresses with leading zeros", () => {
    const mac = "00:00:00:00:00:00";
    const expected = "fe80::200:ff:fe00:0";
    expect(toIPv6LinkLocal(mac)).toBe(expected);
  });
});
