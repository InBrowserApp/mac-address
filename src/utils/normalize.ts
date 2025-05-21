/**
 * Normalizes a MAC address string by converting it to the specified case and optionally adding separators.
 *
 * @param address - The MAC address string to normalize
 * @param options - Optional configuration for normalization
 * @param options.case - The case to convert the MAC address to ("upper", "lower", or "keep")
 * @param options.separator - Optional separator character to insert between bytes (e.g. ":", "-", ".")
 * @returns A normalized string containing hexadecimal characters (0-9, A-F) with optional separators
 *
 * @example
 * normalize("00:11:22:33:44:55") // returns "001122334455"
 * normalize("00:11:22:33:44:55", { separator: ":" }) // returns "00:11:22:33:44:55"
 * normalize("00:Aa:Bb:Cc:Dd:Ee", { case: "keep" }) // returns "00AaBbCcDdEe"
 * normalize("00:Aa:Bb:Cc:Dd:Ee", { case: "lower", separator: "-" }) // returns "00-aa-bb-cc-dd-ee"
 */
export function normalize(
  address: string,
  options?: {
    case?: "upper" | "lower" | "keep";
    separator?: string;
  },
): string {
  const normalizeCase = options?.case ?? "upper";
  const separator = options?.separator;

  let text = address;
  if (normalizeCase === "upper") {
    text = text.toUpperCase();
  } else if (normalizeCase === "lower") {
    text = text.toLowerCase();
  }

  // keep only 0-9 and A-F and ignore case
  text = text.replace(/[^0-9A-F]/gi, "");

  if (!separator) {
    return text;
  }

  return text.match(/.{1,2}/g)!.join(separator);
}
