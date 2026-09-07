#!/usr/bin/env python3
"""Portable, repository-local design iteration archive."""

from __future__ import annotations

import argparse
import datetime as dt
import html
import json
import os
from pathlib import Path
import re
import shutil
import subprocess
import sys
import tempfile
import threading
import webbrowser
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from urllib.parse import urlparse

SCHEMA_VERSION = 1
DEFAULT_RUN = "design-iteration"
EXCLUDED_PREFIXES = ("design-reviews/", ".agents/")
EXCLUDED_PATHS = {".gitattributes"}


class ArchiveError(RuntimeError):
    pass


def now() -> str:
    return dt.datetime.now(dt.timezone.utc).isoformat().replace("+00:00", "Z")


def run_command(args: list[str], cwd: Path, env: dict[str, str] | None = None,
                check: bool = True, input_text: str | None = None) -> subprocess.CompletedProcess[str]:
    result = subprocess.run(args, cwd=cwd, env=env, input=input_text, text=True,
                            stdout=subprocess.PIPE, stderr=subprocess.PIPE)
    if check and result.returncode:
        raise ArchiveError((result.stderr or result.stdout or f"Command failed: {' '.join(args)}").strip())
    return result


def repo_root() -> Path:
    result = run_command(["git", "rev-parse", "--show-toplevel"], Path.cwd())
    return Path(result.stdout.strip()).resolve()


def git(root: Path, *args: str, env: dict[str, str] | None = None,
        check: bool = True) -> str:
    return run_command(["git", *args], root, env=env, check=check).stdout.strip()


def require_lfs(root: Path) -> None:
    if shutil.which("git-lfs") is None and run_command(["git", "lfs", "version"], root, check=False).returncode:
        raise ArchiveError("Git LFS is required. Install it, then run `git lfs install --local`.")
    attrs = root / ".gitattributes"
    expected = "design-reviews/**/screenshots/*.png filter=lfs diff=lfs merge=lfs -text"
    if not attrs.exists() or expected not in attrs.read_text(encoding="utf-8"):
        raise ArchiveError(f".gitattributes must contain: {expected}")


def archive_root(root: Path) -> Path:
    return root / "design-reviews"


def resolve_run(root: Path, requested: str | None) -> tuple[str, Path]:
    if requested:
        run_id = requested
    else:
        candidates = sorted(p.parent.name for p in archive_root(root).glob("*/manifest.json"))
        if len(candidates) != 1:
            raise ArchiveError("Pass --run <run-id> when zero or multiple archives exist.")
        run_id = candidates[0]
    if not re.fullmatch(r"[a-z0-9][a-z0-9._-]*", run_id):
        raise ArchiveError("Run IDs may contain lowercase letters, digits, dots, underscores, and hyphens.")
    return run_id, archive_root(root) / run_id


def load_manifest(run_dir: Path) -> dict:
    path = run_dir / "manifest.json"
    if not path.exists():
        raise ArchiveError(f"Archive not found: {path}")
    return json.loads(path.read_text(encoding="utf-8"))


def save_manifest(run_dir: Path, manifest: dict) -> None:
    run_dir.mkdir(parents=True, exist_ok=True)
    (run_dir / "manifest.json").write_text(json.dumps(manifest, indent=2) + "\n", encoding="utf-8")


def snapshot(root: Path, run_id: str, label: str, parent: str | None = None) -> dict[str, str]:
    with tempfile.NamedTemporaryFile(prefix="design-archive-index-", delete=False) as handle:
        index_path = handle.name
    os.unlink(index_path)
    env = os.environ.copy()
    env["GIT_INDEX_FILE"] = index_path
    try:
        head = git(root, "rev-parse", "HEAD")
        git(root, "read-tree", head, env=env)
        git(root, "add", "-A", env=env)
        tree = git(root, "write-tree", env=env)
        command = ["commit-tree", tree, "-m", f"Design archive {run_id}: {label}"]
        if parent:
            command.extend(["-p", parent])
        commit = git(root, *command)
        git(root, "update-ref", f"refs/heads/design-archive/{run_id}", commit)
        return {"commit": commit, "tree": tree}
    finally:
        Path(index_path).unlink(missing_ok=True)


def changed_paths(root: Path, baseline: str, source: str) -> list[str]:
    paths = git(root, "diff", "--name-only", baseline, source).splitlines()
    return [p for p in paths if p and p not in EXCLUDED_PATHS and not p.startswith(EXCLUDED_PREFIXES)]


def select_winner(manifest: dict) -> dict | None:
    eligible = [i for i in manifest["iterations"] if i.get("complete") and i.get("score") is not None and i.get("sourceCommit")]
    if not eligible:
        return None
    item = max(eligible, key=lambda value: (float(value["score"]), int(value["number"])))
    return {"iteration": item["number"], "score": item["score"], "sourceCommit": item["sourceCommit"]}


def parse_score(text: str) -> float | None:
    patterns = [r"(?i)score\s*:\s*(\d+(?:\.\d+)?)\s*/\s*10", r"(?i)(\d+(?:\.\d+)?)\s*/\s*10"]
    for pattern in patterns:
        match = re.search(pattern, text)
        if match:
            score = float(match.group(1))
            if 0 <= score <= 10:
                return score
    return None


def cmd_init(args: argparse.Namespace) -> None:
    root = repo_root()
    require_lfs(root)
    run_id, run_dir = resolve_run(root, args.run or DEFAULT_RUN)
    if (run_dir / "manifest.json").exists():
        raise ArchiveError(f"Run already exists: {run_id}")
    run_dir.mkdir(parents=True)
    (run_dir / "screenshots").mkdir()
    (run_dir / "reviews").mkdir()
    baseline = snapshot(root, run_id, "baseline")
    creative = ""
    if args.creative_direction:
        path = Path(args.creative_direction)
        creative = path.read_text(encoding="utf-8") if path.exists() else args.creative_direction
    manifest = {
        "schemaVersion": SCHEMA_VERSION,
        "runId": run_id,
        "title": args.title or run_id.replace("-", " ").title(),
        "status": "active",
        "createdAt": now(),
        "config": {"route": args.route, "viewport": {"width": args.width, "height": args.height},
                   "fullPage": True, "criticModel": args.model, "criticEffort": args.effort,
                   "targetScore": args.target, "maxIterations": args.limit,
                   "promptPath": ".agents/skills/design-critic-loop/references/critic-prompt.md",
                   "creativeDirection": creative},
        "baseline": {"sourceCommit": baseline["commit"], "sourceTree": baseline["tree"]},
        "iterations": [], "managedPaths": [], "winner": None,
    }
    save_manifest(run_dir, manifest)
    write_launcher(root, run_id, run_dir)
    build_gallery(root, run_dir, manifest)
    print(f"Initialized design archive {run_id} at {run_dir.relative_to(root)}")


def write_launcher(root: Path, run_id: str, run_dir: Path) -> None:
    launcher = run_dir / "Open Gallery.command"
    launcher.write_text("#!/bin/sh\nset -eu\ncd \"$(dirname \"$0\")/../..\"\nexec python3 .agents/skills/design-iteration-archive/scripts/archive.py serve --run " + run_id + " --open\n", encoding="utf-8")
    launcher.chmod(0o755)


def cmd_capture(args: argparse.Namespace) -> None:
    root = repo_root()
    require_lfs(root)
    run_id, run_dir = resolve_run(root, args.run)
    manifest = load_manifest(run_dir)
    number = args.iteration or len(manifest["iterations"]) + 1
    if any(i["number"] == number for i in manifest["iterations"]):
        raise ArchiveError(f"Iteration {number} already exists.")
    source = snapshot(root, run_id, f"critic-{number:03d}", manifest["iterations"][-1].get("sourceCommit") if manifest["iterations"] else manifest["baseline"]["sourceCommit"])
    tag = f"design/{run_id}/critic-{number:03d}"
    git(root, "tag", "-f", tag, source["commit"])
    screenshot_source = Path(args.screenshot).resolve()
    if not screenshot_source.is_file():
        raise ArchiveError(f"Screenshot not found: {screenshot_source}")
    screenshot_rel = f"design-reviews/{run_id}/screenshots/critic-{number:03d}.png"
    shutil.copyfile(screenshot_source, root / screenshot_rel)
    iteration = {"number": number, "complete": False, "sourceCommit": source["commit"],
                 "sourceTree": source["tree"], "sourceRef": tag, "screenshot": screenshot_rel,
                 "review": None, "score": None, "model": args.model or manifest["config"]["criticModel"],
                 "effort": args.effort or manifest["config"]["criticEffort"], "capturedAt": now(),
                 "deliveredAt": None, "failure": None}
    manifest["iterations"].append(iteration)
    all_paths = set(manifest["managedPaths"])
    all_paths.update(changed_paths(root, manifest["baseline"]["sourceCommit"], source["commit"]))
    manifest["managedPaths"] = sorted(all_paths)
    save_manifest(run_dir, manifest)
    build_gallery(root, run_dir, manifest)
    print(f"Captured iteration {number}: {tag}")


def cmd_review(args: argparse.Namespace) -> None:
    root = repo_root()
    _, run_dir = resolve_run(root, args.run)
    manifest = load_manifest(run_dir)
    item = next((i for i in manifest["iterations"] if i["number"] == args.iteration), None)
    if item is None:
        raise ArchiveError(f"Iteration {args.iteration} has not been captured.")
    text = Path(args.file).read_text(encoding="utf-8") if args.file else sys.stdin.read()
    if not text.strip():
        raise ArchiveError("The delivered critique is empty.")
    score = args.score if args.score is not None else parse_score(text)
    if score is None:
        raise ArchiveError("Could not find a score. Include `Score: X.X/10` or pass --score.")
    review_rel = f"design-reviews/{manifest['runId']}/reviews/critic-{args.iteration:03d}.md"
    (root / review_rel).write_text(text.rstrip() + "\n", encoding="utf-8")
    item.update({"review": review_rel, "score": score, "complete": bool(item.get("sourceCommit") and item.get("screenshot")),
                 "deliveredAt": now(), "failure": None})
    manifest["winner"] = select_winner(manifest)
    save_manifest(run_dir, manifest)
    build_gallery(root, run_dir, manifest)
    print(f"Recorded critic {args.iteration:03d}: {score:.1f}/10")


def build_gallery(root: Path, run_dir: Path, manifest: dict | None = None) -> None:
    manifest = manifest or load_manifest(run_dir)
    browser_data = json.loads(json.dumps(manifest))
    for item in browser_data["iterations"]:
        review = item.get("review")
        item["analysis"] = (root / review).read_text(encoding="utf-8") if review and (root / review).exists() else ""
    template_path = root / ".agents/skills/design-iteration-archive/assets/gallery-template.html"
    template = template_path.read_text(encoding="utf-8")
    payload = json.dumps(browser_data, ensure_ascii=False).replace("<", "\\u003c")
    output = template.replace("__ARCHIVE_TITLE__", html.escape(manifest["title"])).replace("__ARCHIVE_DATA__", payload)
    (run_dir / "index.html").write_text(output, encoding="utf-8")


def cmd_build(args: argparse.Namespace) -> None:
    root = repo_root(); _, run_dir = resolve_run(root, args.run)
    build_gallery(root, run_dir)
    print(f"Built {run_dir.relative_to(root) / 'index.html'}")


def tree_entries(root: Path, source: str, paths: list[str]) -> dict[str, str | None]:
    result: dict[str, str | None] = {}
    for path in paths:
        line = git(root, "ls-tree", source, "--", path)
        result[path] = line.split()[2] if line else None
    return result


def worktree_hash(root: Path, path: str) -> str | None:
    candidate = root / path
    if not candidate.exists() and not candidate.is_symlink():
        return None
    if candidate.is_dir():
        return "directory"
    return git(root, "hash-object", "--", path)


def matches_source(root: Path, source: str, paths: list[str]) -> bool:
    expected = tree_entries(root, source, paths)
    return all(worktree_hash(root, path) == blob for path, blob in expected.items())


def source_for_target(manifest: dict, target: str) -> tuple[str, str]:
    if target == "baseline":
        return manifest["baseline"]["sourceCommit"], "baseline"
    if target == "winner":
        if not manifest.get("winner"):
            raise ArchiveError("No scored winner exists yet.")
        target = str(manifest["winner"]["iteration"])
    try:
        number = int(target)
    except ValueError as error:
        raise ArchiveError("Choose an iteration number, winner, or baseline.") from error
    item = next((i for i in manifest["iterations"] if i["number"] == number), None)
    if not item or not item.get("sourceCommit"):
        raise ArchiveError(f"Iteration {number} has no captured source state.")
    return item["sourceCommit"], f"iteration {number:03d}"


def restore(root: Path, run_dir: Path, target: str) -> str:
    manifest = load_manifest(run_dir)
    paths = manifest.get("managedPaths", [])
    if not paths:
        raise ArchiveError("This run has no managed design paths.")
    known = [manifest["baseline"]["sourceCommit"]] + [i["sourceCommit"] for i in manifest["iterations"] if i.get("sourceCommit")]
    if not any(matches_source(root, source, paths) for source in known):
        raise ArchiveError("Managed design files contain unarchived edits. Commit or archive them before restoring another state.")
    source, label = source_for_target(manifest, target)
    entries = tree_entries(root, source, paths)
    present = [path for path, blob in entries.items() if blob]
    if present:
        git(root, "restore", f"--source={source}", "--worktree", "--", *present)
    for path, blob in entries.items():
        if blob is None:
            candidate = root / path
            if candidate.is_file() or candidate.is_symlink():
                candidate.unlink()
    marker = root / ".git" / f"design-archive-{manifest['runId']}.json"
    marker.write_text(json.dumps({"target": target, "sourceCommit": source, "restoredAt": now()}) + "\n", encoding="utf-8")
    return label


def cmd_restore(args: argparse.Namespace) -> None:
    root = repo_root(); _, run_dir = resolve_run(root, args.run)
    label = restore(root, run_dir, args.target)
    print(f"Restored {label}.")


def cmd_finalize(args: argparse.Namespace) -> None:
    root = repo_root(); _, run_dir = resolve_run(root, args.run)
    manifest = load_manifest(run_dir)
    manifest["winner"] = select_winner(manifest)
    if not manifest["winner"]:
        raise ArchiveError("Cannot finalize without a complete scored iteration.")
    restore(root, run_dir, "winner")
    manifest["status"] = "complete"
    manifest["finalizedAt"] = now()
    save_manifest(run_dir, manifest)
    build_gallery(root, run_dir, manifest)
    print(f"Finalized with critic {manifest['winner']['iteration']:03d} at {manifest['winner']['score']:.1f}/10.")


def walk_texts(value, path: tuple[str, ...] = ()):
    if isinstance(value, dict):
        for key, child in value.items():
            yield from walk_texts(child, path + (str(key),))
    elif isinstance(value, list):
        for index, child in enumerate(value):
            yield from walk_texts(child, path + (str(index),))
    elif isinstance(value, str) and len(value) > 30:
        yield path, value


def cmd_import(args: argparse.Namespace) -> None:
    root = repo_root(); _, run_dir = resolve_run(root, args.run)
    manifest = load_manifest(run_dir)
    session = Path(args.session).expanduser() if args.session else None
    if session is None:
        raise ArchiveError("Pass --session <Codex rollout JSONL>. Automatic session discovery is intentionally avoided.")
    imported = 0
    for line in session.read_text(encoding="utf-8").splitlines():
        try:
            event = json.loads(line)
        except json.JSONDecodeError:
            continue
        blob = json.dumps(event)
        name_match = re.search(r"design_critic[_-]?(\d+)", blob, re.I)
        if not name_match:
            continue
        number = int(name_match.group(1))
        candidates = [(path, text) for path, text in walk_texts(event) if parse_score(text) is not None]
        if not candidates:
            continue
        delivered = max(candidates, key=lambda item: len(item[1]))[1]
        item = next((i for i in manifest["iterations"] if i["number"] == number), None)
        if item is None:
            item = {"number": number, "complete": False, "sourceCommit": None, "sourceTree": None,
                    "sourceRef": None, "screenshot": None, "review": None, "score": None,
                    "model": manifest["config"]["criticModel"], "effort": manifest["config"]["criticEffort"],
                    "capturedAt": None, "deliveredAt": None,
                    "failure": "Delivered review imported, but no complete source snapshot was recorded."}
            manifest["iterations"].append(item)
        review_rel = f"design-reviews/{manifest['runId']}/reviews/critic-{number:03d}.md"
        (root / review_rel).write_text(delivered.rstrip() + "\n", encoding="utf-8")
        item.update({"review": review_rel, "score": parse_score(delivered), "deliveredAt": now()})
        item["complete"] = bool(item.get("sourceCommit") and item.get("screenshot"))
        imported += 1
    manifest["iterations"].sort(key=lambda item: item["number"])
    manifest["winner"] = select_winner(manifest)
    save_manifest(run_dir, manifest); build_gallery(root, run_dir, manifest)
    print(f"Imported {imported} delivered critic message(s). Missing source states remain incomplete.")


def cmd_list(args: argparse.Namespace) -> None:
    root = repo_root(); _, run_dir = resolve_run(root, args.run); manifest = load_manifest(run_dir)
    for item in manifest["iterations"]:
        score = "—" if item.get("score") is None else f"{item['score']:.1f}/10"
        commit = (item.get("sourceCommit") or "incomplete")[:10]
        print(f"{item['number']:03d}  {score:>7}  {commit}  {item.get('sourceRef') or 'no source ref'}")


def cmd_serve(args: argparse.Namespace) -> None:
    root = repo_root(); _, run_dir = resolve_run(root, args.run); build_gallery(root, run_dir)
    class Handler(SimpleHTTPRequestHandler):
        def __init__(self, *handler_args, **kwargs):
            super().__init__(*handler_args, directory=str(run_dir), **kwargs)
        def do_POST(self):
            if urlparse(self.path).path != "/api/restore":
                self.send_error(404); return
            try:
                length = int(self.headers.get("content-length", "0")); payload = json.loads(self.rfile.read(length))
                label = restore(root, run_dir, str(payload.get("value", "")))
                body = json.dumps({"message": f"Restored {label}. The live website can now refresh."}).encode()
                self.send_response(200)
            except Exception as error:
                body = json.dumps({"error": str(error)}).encode(); self.send_response(409)
            self.send_header("content-type", "application/json"); self.send_header("content-length", str(len(body))); self.end_headers(); self.wfile.write(body)
        def log_message(self, format, *values):
            if args.verbose: super().log_message(format, *values)
    server = ThreadingHTTPServer(("127.0.0.1", args.port), Handler)
    address = f"http://127.0.0.1:{args.port}"
    print(f"Design gallery: {address}", flush=True)
    if args.open:
        threading.Timer(0.2, lambda: webbrowser.open(address)).start()
    try: server.serve_forever()
    except KeyboardInterrupt: pass


def parser() -> argparse.ArgumentParser:
    top = argparse.ArgumentParser(description=__doc__)
    sub = top.add_subparsers(dest="command", required=True)
    init = sub.add_parser("init"); init.add_argument("--run"); init.add_argument("--title"); init.add_argument("--route", default="/"); init.add_argument("--width", type=int, default=1440); init.add_argument("--height", type=int, default=1000); init.add_argument("--model", default="gpt-6-astra"); init.add_argument("--effort", default="high"); init.add_argument("--target", type=float, default=8.0); init.add_argument("--limit", type=int, default=12); init.add_argument("--creative-direction"); init.set_defaults(func=cmd_init)
    capture = sub.add_parser("capture"); capture.add_argument("--run"); capture.add_argument("--screenshot", required=True); capture.add_argument("--iteration", type=int); capture.add_argument("--model"); capture.add_argument("--effort"); capture.set_defaults(func=cmd_capture)
    review = sub.add_parser("review"); review.add_argument("--run"); review.add_argument("--iteration", type=int, required=True); review.add_argument("--stdin", action="store_true"); review.add_argument("--file"); review.add_argument("--score", type=float); review.set_defaults(func=cmd_review)
    imp = sub.add_parser("import-codex"); imp.add_argument("--run"); imp.add_argument("--session"); imp.set_defaults(func=cmd_import)
    build = sub.add_parser("build-gallery"); build.add_argument("--run"); build.set_defaults(func=cmd_build)
    serve = sub.add_parser("serve"); serve.add_argument("--run"); serve.add_argument("--port", type=int, default=4178); serve.add_argument("--open", action="store_true"); serve.add_argument("--verbose", action="store_true"); serve.set_defaults(func=cmd_serve)
    restore_parser = sub.add_parser("restore"); restore_parser.add_argument("target"); restore_parser.add_argument("--run"); restore_parser.set_defaults(func=cmd_restore)
    finalize = sub.add_parser("finalize"); finalize.add_argument("--run"); finalize.set_defaults(func=cmd_finalize)
    listing = sub.add_parser("list"); listing.add_argument("--run"); listing.set_defaults(func=cmd_list)
    return top


def main() -> int:
    try:
        args = parser().parse_args(); args.func(args); return 0
    except ArchiveError as error:
        print(f"archive.py: {error}", file=sys.stderr); return 2


if __name__ == "__main__":
    raise SystemExit(main())
