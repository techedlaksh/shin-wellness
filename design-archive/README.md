# Design archive compatibility entry point

The canonical archive is now [`design-reviews/shin-wellness-studio-redesign`](../design-reviews/shin-wellness-studio-redesign/).

Existing commands remain available as wrappers around the shared archive engine:

```bash
npm run design:gallery
npm run design:list
npm run design:restore -- 38
npm run design:restore -- current
npm run design:render
```

New runs should use the repository-local `design-critic-loop` or `design-iteration-archive` skill under `.agents/skills/`.
