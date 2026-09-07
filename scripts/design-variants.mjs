import { spawnSync } from "node:child_process";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const [command = "list", value] = process.argv.slice(2);
const archive = ".agents/skills/design-iteration-archive/scripts/archive.py";
const args = command === "restore"
  ? [archive, "restore", value === "current" ? "baseline" : value, "--run", "shin-wellness-studio-redesign"]
  : [archive, "list", "--run", "shin-wellness-studio-redesign"];
const result = spawnSync("python3", args, { cwd: root, stdio: "inherit" });
process.exitCode = result.status ?? 1;
