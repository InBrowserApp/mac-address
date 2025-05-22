# MAC Address Utility Library

A TypeScript library for working with MAC addresses, providing utilities for conversion, normalization, and manipulation of MAC addresses.

## Features

- Convert MAC addresses between different number bases (2, 8, 10, 16, 36, 64)
- Normalize MAC addresses to standard formats
- Convert MAC addresses to BigInt for numerical operations
- IPv6 address generation from MAC addresses
- MAC address validation and formatting
- MAC address registry lookup and organization information
- Search and filter MAC address assignments
- Get detailed information about MAC address registries

## Installation

```bash
npm install @inbrowserapp/mac-address
```

## Usage

```typescript
import { 
  toNumber, 
  toBigInt, 
  normalize, 
  toIPv6LinkLocal,
  getRegistries,
  getRegistryAssignments,
  getOrganizations,
  getOrganizationAssignments,
  searchAssignments,
  getAssignment
} from '@inbrowserapp/mac-address';

// Basic MAC address operations
const example = '00:11:22:33:44:55';
const hex = toNumber(example, 16);        // Convert MAC address to different number bases
const bigInt = toBigInt(example);         // Convert to BigInt
const normalized = normalize(example);     // Normalize MAC address
const ipv6 = toIPv6LinkLocal(example);    // Convert MAC address to IPv6 link-local address

// MAC address registry and organization lookup
const registries = getRegistries();                                    // Get all registries
const registryAssignments = getRegistryAssignments('MA-L');           // Get registry assignments
const organizations = getOrganizations();                             // Get all organizations
const organizationAssignments = getOrganizationAssignments('Apple, Inc.'); // Get organization assignments
const assignments = searchAssignments(example);                       // Search assignments by address
const info = getAssignment("00:03:93:00:00:00");                     // Get assignment information by address
```

## License

MIT

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
