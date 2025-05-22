/**
 * Represents an entry in the MAC address registry database.
 */
export type MACPrefixEntry = {
  /** The registry type (e.g. "MA-L", "MA-M", "MA-S", "CID", "IAB") */
  registry: MACRegistry;
  /** The MAC address prefix */
  assignment: string;
  /** The name of the organization that owns this MAC address prefix */
  organizationName: string;
  /** The registered address of the organization */
  organizationAddress: string;
};

/**
 * The type of MAC address registry.
 */
export type MACRegistry = "CID" | "IAB" | "MA-L" | "MA-M" | "MA-S";
