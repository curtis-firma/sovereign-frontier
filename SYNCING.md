# Syncing chapters from Notion

The Notion Editorial Hub is the editorial workspace. This repo is the
deployable version. Chapters move from Notion to the site through a
controlled pipeline — nothing publishes without a human merging a PR.

## The rule

> Curtis approves the chapter. The chapter is imported. GitHub becomes the
> deployable version.

## Workflow

1. Export the approved chapter body from Notion (via Claude's Notion
   connection or a manual markdown export) into a file.
2. Run the sync script:

   ```
   node scripts/sync-chapter.mjs <slug> --from-file <export.md> --pr
   ```

   The script applies the conversion rules, updates `last_synced`, and opens
   a PR if the content changed. `--dry-run` previews without writing.
3. Review the PR diff for doctrine changes. Re-place any inline `<Plate/>`
   tags the sync reset (the script warns when this applies).
4. Merge. The deploy workflow publishes `main` to Netlify.

## Conversion rules

- Strip the Notion editorial metadata header (Web route / Editorial status /
  Source material / Last consolidated).
- Drop the "Related chapters" and "Editorial and sourcing notes" sections —
  related chapters live in frontmatter; editorial notes never publish.
- Demote headings one level (Notion `#` → site `##`).
- Convert Notion chapter links to local `/frontier/<slug>` routes.
- Convert Notion HTML tables to GFM pipe tables.
- Never rewrite doctrine, definitions, or terminology. Flag unclear content.
