# The Sovereign Frontier

A field guide to nations, network states, sovereignty, and settlement — from
foundational political language to a living Settlemint case study.

**Live:** https://sovereign-frontier.netlify.app/frontier

One unified publication: ten chapters in four Parts plus a glossary, read
through a single shell with persistent chapter navigation, per-section
"On this page" rails, full-text search (⌘K), and illustrated field-guide
plates throughout.

## Structure

| Concern | Where |
| --- | --- |
| Chapter content (MDX + frontmatter) | `content/frontier/*.mdx` |
| Publication registry — order, Parts, routes, nav, prev/next, plates | `src/lib/publication.ts` |
| Glossary (definitions quoted verbatim from chapters) | `src/lib/glossary.ts` |
| Search index builder | `src/lib/search.ts` |
| Layouts and pages | `src/app/frontier/` |
| Navigation, search, plate components | `src/components/` |
| Typography and theme | `src/app/globals.css` |
| Plate artwork | `public/plates/` (sourced from the ATX Settlemint design system and supplied field-guide plates) |

The frontmatter of the MDX files is the single source of truth: chapter
order, Part grouping, status, summaries, related chapters, and plates all
derive from it. Nothing else hard-codes publication structure.

## Development

```
npm install
npm run dev      # local dev
npm run lint
npx tsc --noEmit
npm run build    # static production build
```

## Content pipeline

Editorial work happens in Notion; approved chapters are imported through a
controlled PR-based sync — see [SYNCING.md](SYNCING.md). Definitions and
doctrine are quoted verbatim from the approved canon; the site never
rewrites them.

## Design

ATX Settlemint treatment: Bone ground, Ink typography, Texas Blue signal,
Mission Coral and Acid Sun accents; Space Grotesk headlines, JetBrains Mono
technical labels, Newsreader long-form text; Swiss hairline rules, hard
offset shadows, and dithered field-guide plates.
