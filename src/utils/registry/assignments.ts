import { normalize } from "../normalize";
import { getRegistryData, getAssignmentsMap } from "../../data/mac-registry";
import type { MACPrefixEntry } from "../../data/mac-registry/types";

/**
 * Looks up a MAC address prefix across all MAC address registries.
 *
 * Searches through the IEEE MA-L, MA-M, MA-S, CID and IAB registries to find matching
 * assignments. A match occurs when either:
 * 1. The input address starts with a registered prefix, or
 * 2. A registered prefix starts with the input address
 *
 * For example:
 * - Input "00:11:22" would match assignment "00:11:22:33:44:55"
 * - Input "00:11:22:33:44:55" would match assignment "00:11:22"
 *
 * The address can be in any format - it will be normalized before comparison.
 * Common formats include:
 * - 00:11:22:33:44:55
 * - 00-11-22-33-44-55
 * - 001122334455
 *
 * @param address - The MAC address or prefix to look up
 * @returns An array of matching registry entries. May be empty if no matches found.
 */
export async function searchAssignments(
  address: string,
): Promise<MACPrefixEntry[]> {
  const normalized = normalize(address, { case: "upper" });
  const data = await getRegistryData();

  // 1) Find the first assignment >= normalized
  const startIdx = lowerBound(data, (entry) => entry.assignment >= normalized);

  const results: MACPrefixEntry[] = [];

  // 2) Scan forward from startIdx, collecting all assignments that start with normalized
  for (let i = startIdx; i < data.length; i++) {
    const assn = data[i].assignment;
    if (assn.startsWith(normalized)) {
      results.push(data[i]);
    } else {
      break; // No more matches possible
    }
  }

  // 3) Scan backward from startIdx-1, collecting all entries where normalized starts with the assignment
  for (let i = startIdx - 1; i >= 0; i--) {
    const assn = data[i].assignment;
    if (normalized.startsWith(assn)) {
      results.push(data[i]);
    } else {
      break;
    }
  }

  return results;
}

/**
 * Looks up a specific MAC address prefix assignment.
 *
 * Retrieves the registry entry for an exact MAC address prefix assignment.
 * The assignment must match exactly - no partial matches are performed.
 *
 * @param assignment - The exact MAC address prefix assignment to look up
 * @returns The matching registry entry, or undefined if not found
 */
export async function getAssignment(
  assignment: string,
): Promise<MACPrefixEntry | undefined> {
  const normalizedAssignment = normalize(assignment, { case: "upper" });
  const assignmentsMap = await getAssignmentsMap();
  return assignmentsMap.get(normalizedAssignment);
}

/**
 * Finds the first index in a sorted array where the predicate becomes true.
 *
 * Uses binary search to efficiently find the lower bound in O(log n) time.
 * The predicate should return false for all elements before the target point
 * and true for all elements at and after the target point.
 *
 * @param arr - The sorted array to search
 * @param predicate - Function that returns true for elements >= target point
 * @returns The first index where predicate returns true, or arr.length if no match
 *
 * @example
 * // Find first number >= 5 in [1,2,3,5,5,6]
 * lowerBound([1,2,3,5,5,6], x => x >= 5) // returns 3
 */
function lowerBound<T>(arr: T[], predicate: (item: T) => boolean): number {
  let leftBound = 0,
    rightBound = arr.length; // [leftBound, rightBound)
  while (leftBound < rightBound) {
    const middleIndex = (leftBound + rightBound) >>> 1;
    if (predicate(arr[middleIndex])) {
      rightBound = middleIndex;
    } else {
      leftBound = middleIndex + 1;
    }
  }
  return leftBound;
}
