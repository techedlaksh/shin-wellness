import fs from "node:fs";
import path from "node:path";
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const manifest = JSON.parse(
  fs.readFileSync(path.join(root, "design-archive/critics.json"), "utf8"),
);
const markerPath = path.join(root, ".context/current-design-variant");
const managedFiles = [
  "app/globals.css",
  "app/page.tsx",
  "components/artwork.tsx",
  "tests/browser/landing.spec.ts",
];

function git(args, options = {}) {
  const result = spawnSync("git", args, {
    cwd: root,
    encoding: "utf8",
    stdio: options.quiet ? "ignore" : "pipe",
  });
  if (!options.allowFailure && result.status !== 0) {
    throw new Error((result.stderr || result.stdout || "Git command failed").trim());
  }
  return result;
}

function tagFor(value) {
  const id = Number(value);
  if (!Number.isInteger(id) || id < 1 || id > manifest.length) {
    throw new Error("Choose a critic number from 1 through 48, or use ‘current’.");
  }
  return `design/critic-${String(id).padStart(2, "0")}`;
}

function matches(source) {
  return git(["diff", "--quiet", source, "--", ...managedFiles], {
    allowFailure: true,
    quiet: true,
  }).status === 0;
}

function detectedSource() {
  if (fs.existsSync(markerPath)) {
    const marked = fs.readFileSync(markerPath, "utf8").trim();
    const source = marked === "current" ? "HEAD" : tagFor(marked);
    if (matches(source)) return marked;
    throw new Error(
      "The design files were edited after the last variant switch. Commit or stash those edits before switching.",
    );
  }
  if (matches("HEAD")) return "current";
  for (const critic of manifest) {
    if (matches(tagFor(critic.id))) return String(critic.id);
  }
  throw new Error(
    "The design files contain unarchived edits. Commit or stash them before switching variants.",
  );
}

export function restoreVariant(value) {
  const current = detectedSource();
  const target = value === "current" ? "current" : String(Number(value));
  const source = target === "current" ? "HEAD" : tagFor(target);
  git(["restore", `--source=${source}`, "--worktree", "--", ...managedFiles]);
  fs.mkdirSync(path.dirname(markerPath), { recursive: true });
  fs.writeFileSync(markerPath, `${target}\n`);
  return { current, target, source };
}

export function listVariants() {
  return manifest.map((critic) => ({
    ...critic,
    tag: tagFor(critic.id),
    commit: git(["rev-parse", "--short=10", tagFor(critic.id)]).stdout.trim(),
  }));
}

const [command = "list", value] = process.argv.slice(2);
if (fileURLToPath(import.meta.url) === path.resolve(process.argv[1] ?? "")) {
  try {
    if (command === "list") {
      for (const variant of listVariants()) {
        console.log(
          `${String(variant.id).padStart(2, "0")}  ${variant.score.toFixed(1)}/10  ${variant.commit}  ${variant.tag}`,
        );
      }
    } else if (command === "restore" && value) {
      const result = restoreVariant(value);
      console.log(
        `Restored ${result.target === "current" ? "the current branch design" : `critic ${String(result.target).padStart(2, "0")}`}.`,
      );
    } else {
      throw new Error("Usage: design-variants.mjs list | restore <1-48|current>");
    }
  } catch (error) {
    console.error(error instanceof Error ? error.message : error);
    process.exitCode = 1;
  }
}
