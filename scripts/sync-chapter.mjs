#!/usr/bin/env node
/**
 * Controlled Notion→GitHub chapter sync.
 *
 * Takes a chapter body as exported from the Notion editorial workspace,
 * applies the publication's conversion rules, and — if the text changed —
 * writes the MDX body and (with --pr) opens a pull request for review.
 * Nothing is ever published without a human merging the PR.
 *
 * Usage:
 *   node scripts/sync-chapter.mjs <slug> --from-file <notion-export.md> [--pr] [--dry-run]
 *
 * Conversion rules (same rules used for the original imports):
 *   - strip the editorial metadata header (Web route / Editorial status / …)
 *   - drop the "Related chapters" and "Editorial and sourcing notes" sections
 *   - demote headings one level (Notion # → site ##)
 *   - convert Notion chapter links to local /frontier/<slug> routes
 *   - convert Notion HTML tables to GFM pipe tables
 *   - update last_synced in the frontmatter
 *
 * Note: inline <Plate id="…"/> placements are not carried over from Notion;
 * if the previous body had inline plates the script warns so the reviewer can
 * re-place them in the PR. Unplaced plates automatically render in a grid
 * after the chapter text, so nothing is lost — only layout.
 */

import fs from "node:fs";
import path from "node:path";
import { execSync } from "node:child_process";

const args = process.argv.slice(2);
const slug = args[0];
const fromFile = args.includes("--from-file")
  ? args[args.indexOf("--from-file") + 1]
  : null;
const openPr = args.includes("--pr");
const dryRun = args.includes("--dry-run");

if (!slug || !fromFile) {
  console.error(
    "Usage: node scripts/sync-chapter.mjs <slug> --from-file <notion-export.md> [--pr] [--dry-run]"
  );
  process.exit(1);
}

const CONTENT_DIR = path.join(process.cwd(), "content", "frontier");

// ---------------------------------------------------------------- registry
const files = fs.readdirSync(CONTENT_DIR).filter((f) => f.endsWith(".mdx"));
const chapters = files.map((file) => {
  const raw = fs.readFileSync(path.join(CONTENT_DIR, file), "utf8");
  const fm = raw.match(/^---\n([\s\S]*?)\n---\n/);
  const get = (key) =>
    (fm?.[1].match(new RegExp(`^${key}: (.*)$`, "m")) ?? [])[1]?.trim();
  return {
    file,
    slug: get("slug"),
    notionId: (get("source_notion_url") ?? "").match(/([0-9a-f]{32})/)?.[1],
    raw,
  };
});

const target = chapters.find((c) => c.slug === slug);
if (!target) {
  console.error(`Unknown chapter slug: ${slug}`);
  process.exit(1);
}

const notionIdToRoute = new Map(
  chapters.filter((c) => c.notionId).map((c) => [c.notionId, `/frontier/${c.slug}`])
);

// ------------------------------------------------------------- conversion
function convertTable(html) {
  const rows = [...html.matchAll(/<tr>([\s\S]*?)<\/tr>/g)].map((m) =>
    [...m[1].matchAll(/<td>([\s\S]*?)<\/td>/g)].map((c) =>
      c[1].replace(/\s+/g, " ").trim()
    )
  );
  if (rows.length === 0) return "";
  const out = [];
  out.push(`| ${rows[0].join(" | ")} |`);
  out.push(`| ${rows[0].map(() => "---").join(" | ")} |`);
  for (const row of rows.slice(1)) out.push(`| ${row.join(" | ")} |`);
  return out.join("\n");
}

function convert(source) {
  let text = source.replace(/\r\n/g, "\n");

  // Strip editorial metadata header lines.
  text = text
    .split("\n")
    .filter(
      (line) =>
        !/^\*\*(Web route|Editorial status|Source material|Last consolidated):\*\*/.test(
          line
        )
    )
    .join("\n");

  // Drop editorial-only sections (everything until the next h1 or EOF).
  text = text.replace(
    /^# (Related chapters|Editorial and sourcing notes)\n[\s\S]*?(?=^# |\n*$(?![\s\S]))/gm,
    ""
  );

  // Convert Notion HTML tables to GFM.
  text = text.replace(/<table[^>]*>[\s\S]*?<\/table>/g, (m) => convertTable(m));

  // Demote headings one level.
  text = text.replace(/^(#{1,5}) /gm, "#$1 ");

  // Convert Notion chapter links to local routes.
  const unknown = [];
  text = text.replace(
    /https:\/\/app\.notion\.com\/p\/(?:[\w-]*?)([0-9a-f]{32})/g,
    (m, id) => {
      const route = notionIdToRoute.get(id);
      if (!route) {
        unknown.push(id);
        return m;
      }
      return route;
    }
  );

  // Tidy whitespace.
  text = text.replace(/\n{3,}/g, "\n\n").trim() + "\n";
  return { text, unknown };
}

// ------------------------------------------------------------------ apply
const source = fs.readFileSync(fromFile, "utf8");
const { text: newBody, unknown } = convert(source);

const fmMatch = target.raw.match(/^(---\n[\s\S]*?\n---\n)/);
const frontmatter = fmMatch[1].replace(
  /^last_synced:.*$/m,
  `last_synced: ${new Date().toISOString().slice(0, 10)}`
);
const oldBody = target.raw.slice(fmMatch[1].length);

const normalize = (s) => s.replace(/\s+/g, " ").trim();
if (normalize(oldBody.replace(/<Plate[^>]*\/>/g, "")) === normalize(newBody)) {
  console.log(`No content changes for ${slug} — nothing to sync.`);
  process.exit(0);
}

const hadInlinePlates = /<Plate\s/.test(oldBody);
if (hadInlinePlates) {
  console.warn(
    `⚠ ${slug} had inline <Plate/> placements; they are not carried over.\n` +
      `  Plates will render in the end-of-chapter grid until re-placed in the PR.`
  );
}
if (unknown.length > 0) {
  console.warn(`⚠ Unmapped Notion links left as-is: ${unknown.join(", ")}`);
}

if (dryRun) {
  console.log(`--dry-run: ${slug} would be updated (${newBody.length} chars).`);
  process.exit(0);
}

const filePath = path.join(CONTENT_DIR, target.file);
fs.writeFileSync(filePath, frontmatter + "\n" + newBody);
console.log(`Updated ${target.file}.`);

if (openPr) {
  const branch = `sync/${slug}-${new Date().toISOString().slice(0, 10)}`;
  const run = (cmd) => execSync(cmd, { stdio: "inherit" });
  run(`git checkout -b ${branch}`);
  run(`git add "${filePath}"`);
  run(`git commit -m "sync(${slug}): re-import from Notion editorial workspace"`);
  run(`git push -u origin ${branch}`);
  run(
    `gh pr create --title "Sync chapter: ${slug}" --body "Controlled re-import of \\\`${slug}\\\` from the Notion editorial workspace.\n\n- Review the diff for doctrine changes before merging.\n${hadInlinePlates ? "- ⚠ Re-place inline <Plate/> tags — they were reset by the sync.\n" : ""}\n🤖 Generated with [Claude Code](https://claude.com/claude-code)"`
  );
  run(`git checkout main`);
  console.log(`PR opened from ${branch}. Merge to publish.`);
}
