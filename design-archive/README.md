# Shin Wellness design archive

The critic loop is preserved as 48 local Git tags named `design/critic-01`
through `design/critic-48`. Each tag points to the exact four-file source state
used to render that critic's screenshot. The tags are also connected by the
`design-archive/critic-variants` branch.

There are 46 distinct source trees: critics 13/14 and critics 16/17 each
reviewed the same implementation independently. They remain separate gallery
entries because their scores and review passes are distinct.

Run `npm run design:gallery` to open the visual gallery. Each card can be
expanded or restored into the current workspace with one click. Restoring a
variant only changes these design files:

- `app/globals.css`
- `app/page.tsx`
- `components/artwork.tsx`
- `tests/browser/landing.spec.ts`

The restore command refuses to overwrite edits that do not match a known
variant. Use `npm run design:restore -- current` to return those files to the
current branch's committed version.

The rendered PNGs live in `.context/design-archive/screenshots/`, keeping large
generated files out of Git. They can be regenerated from the tags with
`npm run design:render`.

Portable local backups are written to:

- `.context/design-archive/shin-design-variants.bundle` for the Git history.
- `.context/shin-wellness-48-critic-gallery.zip` for the rendered gallery.
