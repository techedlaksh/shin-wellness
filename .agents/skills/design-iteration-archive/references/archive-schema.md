# Archive schema (version 1)

Each run lives at `design-reviews/<run-id>/manifest.json`. Paths are repository-relative and source refs are under `refs/tags/design/<run-id>/`.

Required top-level fields are `schemaVersion`, `runId`, `title`, `status`, `createdAt`, `config`, `baseline`, `iterations`, `managedPaths`, and `winner`.

- `config` records route, viewport, full-page capture, critic model and effort, target, limit, prompt path, and immutable creative-direction text.
- `baseline` records an archive commit and tree.
- Each iteration records its number, completeness, archive commit/tree/ref, screenshot and review paths, delivered score/model/effort/timestamp, and optional failure note.
- `managedPaths` is the union of paths changed between the baseline and captured sources. Archive infrastructure and generated review artifacts are excluded.
- `winner` is the highest scored complete iteration; equal scores resolve to the later iteration.

The manifest is canonical. `index.html` and the launcher are reproducible views. PNGs and Markdown reviews are canonical evidence. Git refs preserve source trees independently of later branch changes.
