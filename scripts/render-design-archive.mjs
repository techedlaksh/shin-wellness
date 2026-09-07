import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { spawn, spawnSync } from "node:child_process";
import { chromium } from "@playwright/test";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const variants = JSON.parse(
  fs.readFileSync(path.join(root, "design-archive/critics.json"), "utf8"),
);
const output = path.join(root, ".context/design-archive/screenshots");
const temporaryRoot = fs.mkdtempSync(path.join(os.tmpdir(), "shin-design-render-"));
const port = 55189;

function run(command, args, options = {}) {
  const result = spawnSync(command, args, {
    cwd: options.cwd ?? root,
    encoding: "utf8",
    stdio: "pipe",
  });
  if (result.status !== 0) {
    throw new Error(`${command} ${args.join(" ")} failed\n${result.stdout}\n${result.stderr}`);
  }
  return result.stdout?.trim() ?? "";
}

async function waitForPage(url) {
  const deadline = Date.now() + 30_000;
  while (Date.now() < deadline) {
    try {
      const response = await fetch(url);
      if (response.ok) return;
    } catch {}
    await new Promise((resolve) => setTimeout(resolve, 150));
  }
  throw new Error(`Timed out waiting for ${url}`);
}

async function stop(process) {
  if (!process || process.exitCode !== null) return;
  process.kill("SIGTERM");
  await Promise.race([
    new Promise((resolve) => process.once("exit", resolve)),
    new Promise((resolve) => setTimeout(resolve, 2_000)),
  ]);
  if (process.exitCode === null) process.kill("SIGKILL");
}

fs.mkdirSync(output, { recursive: true });
run("git", ["worktree", "add", "--detach", temporaryRoot, "design/critic-01"]);
fs.symlinkSync(path.join(root, "node_modules"), path.join(temporaryRoot, "node_modules"));
const browser = await chromium.launch({ headless: true });

try {
  for (const variant of variants) {
    const id = String(variant.id).padStart(2, "0");
    const tag = `design/critic-${id}`;
    run("git", ["restore", "--source=HEAD", "--worktree", "--", "next-env.d.ts"], {
      cwd: temporaryRoot,
      quiet: true,
    });
    run("git", ["switch", "--detach", tag], { cwd: temporaryRoot, quiet: true });
    // Webpack permits the shared node_modules symlink used by this isolated
    // render worktree; Turbopack intentionally rejects links outside its root.
    run("npm", ["run", "build", "--", "--webpack"], {
      cwd: temporaryRoot,
      quiet: true,
    });

    const next = spawn(
      "npm",
      ["start", "--", "--hostname", "127.0.0.1", "--port", String(port)],
      { cwd: temporaryRoot, stdio: "ignore", env: { ...process.env, NODE_ENV: "production" } },
    );
    try {
      await waitForPage(`http://127.0.0.1:${port}`);
      const page = await browser.newPage({
        viewport: { width: 1440, height: 1000 },
        deviceScaleFactor: 1,
      });
      await page.goto(`http://127.0.0.1:${port}`, { waitUntil: "networkidle" });
      await page.evaluate(async () => {
        for (let y = 0; y < document.documentElement.scrollHeight; y += 650) {
          window.scrollTo(0, y);
          await new Promise((resolve) => setTimeout(resolve, 80));
        }
        window.scrollTo(0, 0);
      });
      await page.addStyleTag({ content: ".skip-link { display: none !important; }" });
      await page.waitForTimeout(300);
      await page.screenshot({
        path: path.join(output, `critic-${id}.png`),
        fullPage: true,
      });
      await page.close();
      console.log(`Rendered ${id}/48 · ${variant.score.toFixed(1)}/10`);
    } finally {
      await stop(next);
    }
  }
} finally {
  await browser.close();
  run("git", ["worktree", "remove", "--force", temporaryRoot]);
}

console.log(`Screenshots saved to ${path.relative(root, output)}`);
