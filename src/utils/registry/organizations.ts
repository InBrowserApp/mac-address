import { getRegistryData } from "../../data/mac-registry";
import type { MACPrefixEntry } from "../../data/mac-registry/types";

/**
 * Gets a list of all unique organizations in the MAC address registry.
 *
 * Returns an array of organization names from all MAC prefix assignments,
 * with duplicates removed. Organizations are sorted alphabetically.
 *
 * @returns Array of unique organization names
 */
export async function getOrganizations(): Promise<string[]> {
  const map = await getOrganizationAssignmentsMap();
  return Array.from(map.keys());
}

/*
/*
 * Gets all MAC address prefix assignments for a specific organization.
 *
 * Searches through all MAC prefix assignments to find entries matching
 * the given organization name. The search is case-insensitive.
 *
 * @param organizationName - The name of the organization to search for
 * @returns Array of MAC prefix entries for the organization
 */
export async function getOrganizationAssignments(
  organizationName: string,
): Promise<MACPrefixEntry[]> {
  const map = await getOrganizationAssignmentsMap();
  return map.get(organizationName) ?? [];
}

let organizationAssignmentsMap: Promise<Map<string, MACPrefixEntry[]>> | null =
  null;
/**
 * Builds a map of organization names to their MAC address prefix assignments.
 *
 * Creates a Map where:
 * - Keys are organization names
 * - Values are arrays of MAC prefix entries for that organization
 *
 * This map can be used to efficiently look up all assignments for a given organization
 * without having to scan through the entire registry data each time.
 *
 * @returns A Map mapping organization names to their MAC prefix entries
 */
export async function getOrganizationAssignmentsMap(): Promise<
  Map<string, MACPrefixEntry[]>
> {
  if (organizationAssignmentsMap) {
    return organizationAssignmentsMap;
  }

  const promise = (async () => {
    const map = new Map<string, MACPrefixEntry[]>();
    const data = await getRegistryData();

    for (const entry of data) {
      const orgName = entry.organizationName;
      const result = map.get(orgName);

      if (result) {
        result.push(entry);
      } else {
        map.set(orgName, [entry]);
      }
    }

    return map;
  })();

  organizationAssignmentsMap = promise;
  return promise;
}
