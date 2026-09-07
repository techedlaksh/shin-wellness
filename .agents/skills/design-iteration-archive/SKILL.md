---
name: design-iteration-archive
description: Capture, import, browse, compare, and safely restore screenshot-based design iterations with their delivered critic analyses. Use when preserving design work performed by any agent or building a local design-review gallery without controlling the redesign loop.
---

# Design Iteration Archive

Use `scripts/archive.py` as the canonical, agent-neutral interface. Run it from the repository root. Read `references/archive-schema.md` before modifying the manifest or integrating another agent.

## Common commands

```text
archive.py init
archive.py capture --screenshot <path>
archive.py review --iteration <n> --stdin
archive.py import-codex [--session <path>]
archive.py build-gallery
archive.py serve --open
archive.py restore <iteration|winner|baseline>
archive.py finalize
```

Pass `--run <run-id>` to select a run; it may be omitted when exactly one run exists. `init` defaults to GPT-6 Astra/high, target 8.0, limit 12, and a 1440px full-page viewport.

## Integrity rules

- Capture the source before asking the critic. The command uses a temporary Git index and does not change the user's real index or branch.
- Save only the critic's delivered response. Never attempt to collect private reasoning or chain-of-thought.
- Treat canonical screenshots, reviews, manifests, galleries, and refs as repository history. Keep derived ZIP and bundle backups local.
- A missing source snapshot stays explicitly incomplete. Do not invent a source state.
- Restore only managed design paths. Refuse to overwrite changes that do not match a known archived state.
- Serve the gallery only on `127.0.0.1`.
- Require Git LFS before initialization or capture, and track canonical PNGs through `.gitattributes`.
