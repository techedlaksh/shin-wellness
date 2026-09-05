import { mkdir, readdir, rename, writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import path from "node:path";

const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const distDirectory = path.join(projectRoot, "dist");
const clientDirectory = path.join(distDirectory, "client");
const serverDirectory = path.join(distDirectory, "server");

await mkdir(clientDirectory, { recursive: true });

for (const entry of await readdir(distDirectory, { withFileTypes: true })) {
  if (entry.name === "client" || entry.name === "server") continue;
  await rename(path.join(distDirectory, entry.name), path.join(clientDirectory, entry.name));
}

await mkdir(serverDirectory, { recursive: true });
await writeFile(
  path.join(serverDirectory, "index.js"),
  `export default {
  async fetch(request, env) {
    if (!env.ASSETS) {
      return new Response("Static assets are unavailable.", { status: 503 });
    }

    return env.ASSETS.fetch(request);
  },
};
`,
);
