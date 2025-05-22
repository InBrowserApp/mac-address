import { getRegistryData } from "../../data/mac-registry";
import type { MACPrefixEntry } from "../../data/mac-registry/types";

/**
 * Gets a list of all unique registries in the MAC address registry.
 *
 * Returns an array of registry names from all MAC prefix assignments,
 * with duplicates removed. Registries are sorted alphabetically.
 *
 * @returns Array of unique registry names
 */
export function getRegistries() {
  return ["MA-L", "MA-M", "MA-S", "CID", "IAB"] as const;
}

/**
 * Gets all MAC address prefix assignments for a specific registry.
 *
 * Searches through all MAC prefix assignments to find entries matching
 * the given registry name. The search is case-insensitive.
 *
 * @param registryName - The name of the registry to search for
 * @returns Array of MAC prefix entries for the registry
 */
export async function getRegistryAssignments(
  registryName: string,
): Promise<MACPrefixEntry[]> {
  const map = await getRegistryAssignmentsMap();
  return map.get(registryName) ?? [];
}

let registryAssignmentsMap: Promise<Map<string, MACPrefixEntry[]>> | null =
  null;

/**
 * Builds a map of registry names to their MAC address prefix assignments.
 *
 * Creates a Map where:
 * - Keys are registry names
 * - Values are arrays of MAC prefix entries for that registry
 *
 * This map can be used to efficiently look up all assignments for a given registry
 * without having to scan through the entire registry data each time.
 *
 * @returns A Map mapping registry names to their MAC prefix entries
 */
export async function getRegistryAssignmentsMap(): Promise<
  Map<string, MACPrefixEntry[]>
> {
  if (registryAssignmentsMap) {
    return registryAssignmentsMap;
  }

  const promise = (async () => {
    const map = new Map<string, MACPrefixEntry[]>();
    const data = await getRegistryData();

    for (const entry of data) {
      const regName = entry.registry;
      const result = map.get(regName);

      if (result) {
        result.push(entry);
      } else {
        map.set(regName, [entry]);
      }
    }

    return map;
  })();

  registryAssignmentsMap = promise;
  return promise;
}
