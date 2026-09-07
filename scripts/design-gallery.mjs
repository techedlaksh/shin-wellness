import { spawnSync } from "node:child_process";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const result = spawnSync("python3", [
  ".agents/skills/design-iteration-archive/scripts/archive.py",
  "serve",
  "--run",
  "shin-wellness-studio-redesign",
  ...process.argv.slice(2),
], { cwd: root, stdio: "inherit" });
process.exitCode = result.status ?? 1;
