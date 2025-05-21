import { normalize } from "./normalize";

/**
 * The alphabet used for base64 encoding, containing digits, uppercase letters, lowercase letters, and +/ characters.
 */
const BASE64_ALPHABET =
  "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz+/";

/**
 * Converts a MAC address to a number in the specified base.
 *
 * @param address - The MAC address string to convert
 * @param base - The target base for the number (2, 8, 10, 16, 36, or 64)
 * @returns A string representation of the MAC address in the specified base
 *
 * @example
 * toNumber("00:11:22:33:44:55", 16) // returns "1122334455"
 * toNumber("00:11:22:33:44:55", 10) // returns "73588229205"
 * toNumber("00:11:22:33:44:55", 64) // returns "14YCqHL"
 */
export function toNumber(
  address: string,
  base: 2 | 8 | 10 | 16 | 36 | 64,
): string {
  const normalized = normalize(address);
  const number = BigInt("0x" + normalized);
  if (base >= 2 && base <= 36) {
    return number.toString(base);
  } else if (base === 64) {
    let n = number;
    if (n === 0n) return "0";
    let result = "";
    while (n > 0n) {
      const rem = Number(n % 64n);
      result = BASE64_ALPHABET[rem] + result;
      n /= 64n;
    }
    return result;
  } else {
    throw new Error(`Unsupported base: ${base}`);
  }
}

/**
 * Converts a MAC address to a BigInt.
 *
 * @param address - The MAC address string to convert
 * @returns A BigInt representation of the MAC address
 *
 * @example
 * toBigInt("00:11:22:33:44:55") // returns 73588229205n
 */
export function toBigInt(address: string): bigint {
  const normalized = normalize(address);
  return BigInt("0x" + normalized);
}
