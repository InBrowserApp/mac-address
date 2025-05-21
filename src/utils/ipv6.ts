import { normalize } from "./normalize";

/**
 * Converts a MAC address to an IPv6 link-local address.
 *
 * The conversion follows RFC 4291 and involves:
 * 1. Normalizing the MAC address to remove separators
 * 2. Flipping the U/L bit in the first octet
 * 3. Inserting 'fffe' in the middle
 * 4. Adding the fe80:: prefix
 *
 * @param address - The MAC address to convert (can include separators like :, -, ., or spaces)
 * @returns The corresponding IPv6 link-local address
 * @throws Error if the MAC address is invalid after normalization
 *
 * @example
 * toIPv6LinkLocal("00:11:22:33:44:55") // returns "fe80::211:22ff:fe33:4455"
 * toIPv6LinkLocal("00-11-22-33-44-55") // returns "fe80::211:22ff:fe33:4455"
 * toIPv6LinkLocal("Aa:Bb:Cc:Dd:Ee:Ff") // returns "fe80::a8bb:ccff:fedd:eeff"
 */
export function toIPv6LinkLocal(address: string): string {
  const cleanMac = normalize(address);
  if (!/^[0-9a-f]{12}$/i.test(cleanMac)) {
    throw new Error(`Invalid MAC after normalization: ${cleanMac}`);
  }

  // Flip the U/L bit of the first octet
  const firstOctet = parseInt(cleanMac.slice(0, 2), 16);
  const modifiedOctet = (firstOctet ^ 0x02).toString(16).padStart(2, "0");

  // Build the 64-bit interface ID
  const eui64 = [
    modifiedOctet,
    cleanMac.slice(2, 6),
    "fffe",
    cleanMac.slice(6),
  ].join(""); // e.g. "021122fffe334455"

  // Split into four 4-char hextets and strip leading zeros
  const hostHextets = eui64
    .match(/.{1,4}/g)!
    .map((h) => h.replace(/^0+/, "") || "0");

  // Always compress fe80:0000:0000:0000 to fe80::
  return `fe80::${hostHextets.join(":")}`.toLowerCase();
}
