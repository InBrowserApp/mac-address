import csv from "csvtojson";
import path from "path";
import fs from "fs/promises";
import type { MACPrefixEntry } from "../src/data/mac-registry/types";

const folder = "src/data/mac-registry";

const infos = [
  {
    name: "cid", // Company ID
    url: "https://standards-oui.ieee.org/cid/cid.csv",
  },
  {
    name: "iab", // IEEE Assignment Block
    url: "https://standards-oui.ieee.org/iab/iab.csv",
  },
  {
    name: "oui", // Organizationally Unique Identifier
    url: "https://standards-oui.ieee.org/oui/oui.csv",
  },
  {
    name: "oui28", // Organizationally Unique Identifier for 28-bit MAC addresses
    url: "https://standards-oui.ieee.org/oui28/mam.csv",
  },
  {
    name: "oui36", // Organizationally Unique Identifier for 36-bit MAC addresses
    url: "https://standards-oui.ieee.org/oui36/oui36.csv",
  },
];

interface MACPrefixEntryRaw {
  Registry: string;
  Assignment: string;
  "Organization Name": string;
  "Organization Address": string;
}

for (const info of infos) {
  console.log(`Downloading ${info.name} from ${info.url}`);
  const response = await fetch(info.url);
  // write to folder/{name}.csv
  const csvText = await response.text();
  await fs.writeFile(path.join(folder, `${info.name}.csv`), csvText);
  console.log(`Saved ${info.name}.csv`);

  // write to folder/{name}.json
  const csvJsonData = await csv().fromString(csvText);
  const data = csvJsonData.map(
    (entry: MACPrefixEntryRaw): MACPrefixEntry => ({
      registry: entry.Registry,
      assignment: entry.Assignment,
      organizationName: entry["Organization Name"],
      organizationAddress: entry["Organization Address"],
    }),
  );

  await fs.writeFile(
    path.join(folder, `${info.name}.json`),
    JSON.stringify(data, null, 2),
  );
  console.log(`Saved ${info.name}.json`);

  // write to folder/{name}.ts
  const tsCode = `import type { MACPrefixEntry } from "./types";\n\nexport default ${JSON.stringify(data, null, 2)} as MACPrefixEntry[]`;
  await fs.writeFile(path.join(folder, `${info.name}.ts`), tsCode);
  console.log(`Saved ${info.name}.ts`);
}
