import { cp, mkdir, readdir, rm } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const projectRoot = dirname(dirname(fileURLToPath(import.meta.url)));
const distDirectory = join(projectRoot, "dist");
const clientDirectory = join(distDirectory, "client");
const serverDirectory = join(distDirectory, "server");
const metadataDirectory = join(distDirectory, ".openai");
const reservedEntries = new Set(["client", "server", ".openai"]);

await rm(clientDirectory, { recursive: true, force: true });
await rm(serverDirectory, { recursive: true, force: true });
await rm(metadataDirectory, { recursive: true, force: true });
await mkdir(clientDirectory, { recursive: true });
await mkdir(serverDirectory, { recursive: true });
await mkdir(metadataDirectory, { recursive: true });

for (const entry of await readdir(distDirectory, { withFileTypes: true })) {
  if (reservedEntries.has(entry.name)) continue;

  await cp(join(distDirectory, entry.name), join(clientDirectory, entry.name), {
    recursive: entry.isDirectory(),
  });
}

await cp(join(projectRoot, "worker", "index.js"), join(serverDirectory, "index.js"));
await cp(
  join(projectRoot, ".openai", "hosting.json"),
  join(metadataDirectory, "hosting.json"),
);
