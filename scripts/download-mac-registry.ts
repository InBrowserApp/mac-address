import csv from "csvtojson";
import path from "path";
import fs from "fs/promises";
import type {
  MACPrefixEntry,
  MACRegistry,
} from "../src/data/mac-registry/types";

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

const entries: MACPrefixEntry[] = [];

for (const info of infos) {
  console.log(`Downloading ${info.name} from ${info.url}`);
  const response = await fetch(info.url);
  // write to folder/{name}.csv
  const csvText = await response.text();
  await fs.writeFile(path.join(folder, `${info.name}.csv`), csvText);
  console.log(`Saved ${info.name}.csv`);

  // write to folder/{name}.json
  const csvJsonData: MACPrefixEntryRaw[] = await csv().fromString(csvText);
  const data: MACPrefixEntry[] = csvJsonData.map((entry) => ({
    registry: entry.Registry as MACRegistry,
    assignment: entry.Assignment,
    organizationName: entry["Organization Name"],
    organizationAddress: entry["Organization Address"],
  }));

  // sort by assignment
  data.sort((a, b) => a.assignment.localeCompare(b.assignment));

  await fs.writeFile(
    path.join(folder, `${info.name}.json`),
    JSON.stringify(data, null, 2),
  );
  console.log(`Saved ${info.name}.json`);

  // add data to entries
  entries.push(...data);
}

// sort entries by assignment
entries.sort((a, b) => a.assignment.localeCompare(b.assignment));

await fs.writeFile(
  path.join(folder, "data.json"),
  JSON.stringify(entries, null, 2),
);
