import { bench } from "vitest";
import { searchAssignments } from "../assignments";
import { getRegistryData } from "../../../data/mac-registry";
import type { MACPrefixEntry } from "../../../data/mac-registry/types";

/**
 * Benchmark comparing binary search vs linear search implementations for MAC address prefix lookup.
 * Uses vitest's bench() to measure performance of both approaches.
 */

bench(
  "search assignments using binary search",
  async () => {
    await searchAssignments("0A");
  },
  { warmupIterations: 5 },
);

bench(
  "search assignments using linear search",
  async () => {
    await searchAssignmentsByLinearSearch("0A");
  },
  { warmupIterations: 5 },
);

/**
 * Linear search implementation of MAC address prefix lookup.
 *
 * Searches through all assignments sequentially to find matches where either:
 * 1. The assignment starts with the input address, or
 * 2. The input address starts with the assignment
 *
 * @param address - The MAC address or prefix to look up
 * @returns An array of matching registry entries
 */
async function searchAssignmentsByLinearSearch(
  address: string,
): Promise<MACPrefixEntry[]> {
  const assignments = await getRegistryData();
  const results: MACPrefixEntry[] = [];
  for (const assignment of assignments) {
    if (
      assignment.assignment.startsWith(address) ||
      address.startsWith(assignment.assignment)
    ) {
      results.push(assignment);
    }
  }
  return results;
}
