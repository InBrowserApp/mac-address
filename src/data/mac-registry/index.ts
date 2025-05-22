export type { MACPrefixEntry } from "./types";
import type { MACPrefixEntry } from "./types";

/**
 * Retrieves the raw MAC address prefix registry data.
 * @returns A promise that resolves to an array of MAC prefix entries
 */
export async function getRegistryData(): Promise<MACPrefixEntry[]> {
  const data = await import("./data.json");
  return data.default as MACPrefixEntry[];
}

/**
 * A cached map of MAC address assignments.
 * The map is keyed by the assignment value and contains the full MAC prefix entry.
 * The map is created on first call and cached for subsequent calls.
 */
let assignmentsMapPromise: Promise<Map<string, MACPrefixEntry>>;

/**
 * Gets a cached map of MAC address assignments.
 * The map is keyed by the assignment value and contains the full MAC prefix entry.
 * The map is created on first call and cached for subsequent calls.
 * @returns A promise that resolves to a Map of MAC prefix entries
 */
export async function getAssignmentsMap(): Promise<
  Map<string, MACPrefixEntry>
> {
  if (!assignmentsMapPromise) {
    assignmentsMapPromise = getRegistryData().then(
      (data) => new Map(data.map((entry) => [entry.assignment, entry])),
    );
  }
  return assignmentsMapPromise;
}
