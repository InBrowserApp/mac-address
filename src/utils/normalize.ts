/**
 * Normalizes a MAC address string by converting it to uppercase and removing any non-hexadecimal characters.
 *
 * @param address - The MAC address string to normalize
 * @returns A normalized string containing only hexadecimal characters (0-9, A-F)
 *
 * @example
 * normalize("00:11:22:33:44:55") // returns "001122334455"
 * normalize("00-11-22-33-44-55") // returns "001122334455"
 * normalize("00.11.22.33.44.55") // returns "001122334455"
 */
export function normalize(address: string) {
  const upper = address.toUpperCase();
  // keep only 0-9 and A-F
  return upper.replace(/[^0-9A-F]/g, "");
}
