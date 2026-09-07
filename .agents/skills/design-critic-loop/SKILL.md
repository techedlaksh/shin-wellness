---
name: design-critic-loop
description: Run an independent screenshot-driven design critique loop, archive every reviewed source state and delivered critique, and restore the highest-scoring result. Use when asked to iteratively improve a website or UI against an objective visual quality score.
---

# Design Critic Loop

Use the repository archive engine at `../design-iteration-archive/scripts/archive.py`. Read that skill and `references/critic-prompt.md` before starting. Keep the prompt text unchanged for the entire run.

## Defaults

- Critic: GPT-6 Astra, high reasoning effort.
- Target: 8.0/10.
- Maximum: 12 reviewed iterations, then pause and report progress.
- Viewport: 1440px wide, full page.
- Completion: restore the independently highest-scoring source state; ties go to the later iteration.

Explicit run instructions override these defaults.

## Run the loop

1. Initialize the run with `archive.py init`. Provide the immutable creative-direction file or text, route, viewport, model, effort, target, and limit.
2. At each iteration, capture a full-page screenshot of the live design. Use the browser-control capability available to the agent.
3. Run `archive.py capture --screenshot <path>`. It snapshots the exact worktree through a temporary Git index without changing the real index or branch.
4. Start a fresh critic context. Give it only:
   - the screenshot,
   - the immutable creative-direction brief,
   - the exact contents of `references/critic-prompt.md`.
5. Do not reveal source code, implementation details, prior iterations, critiques, scores, the target, or the iteration limit.
6. Pipe only the critic's delivered response to `archive.py review --iteration <n> --stdin`. Never collect hidden reasoning or chain-of-thought.
7. Commit the screenshot, review, manifest, gallery, and source ref metadata as a stable iteration milestone.
8. If the score is below target, implement the single highest-leverage criticism, verify the design, and repeat from step 2.
9. At target or limit, run `archive.py finalize`. This restores the winner using the guarded restore operation and rebuilds the gallery.

Do not reuse a critic context. Do not alter the critic prompt during a run. If an iteration fails, record the failure as incomplete and continue with a fresh context.
