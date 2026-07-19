import fs from "fs";
import path from "path";
import matter from "gray-matter";

/**
 * The publication registry.
 *
 * The single source of truth for The Sovereign Frontier is the frontmatter of
 * the MDX files in `content/frontier/`. This module reads that frontmatter and
 * assembles the manifest that drives chapter order, Part grouping, routes,
 * left navigation, mobile navigation, previous/next links, the landing page,
 * reading progress, and related-chapter references. Nothing else should
 * hard-code chapter structure.
 */

export interface ChapterPlate {
  src: string;
  width: number;
  height: number;
  alt: string;
  caption: string;
}

export interface Chapter {
  title: string;
  shortTitle: string;
  slug: string;
  order: number;
  part: number;
  partTitle: string;
  volume: string;
  status: "published" | "pending";
  summary: string;
  sourceNotionUrl: string;
  lastSynced: string | null;
  related: string[];
  /** Field-guide plates illustrated for this chapter. */
  plates: ChapterPlate[];
  /** Raw MDX body (frontmatter stripped). */
  body: string;
}

export interface Part {
  number: number;
  numeral: string;
  title: string;
  chapters: Chapter[];
}

const CONTENT_DIR = path.join(process.cwd(), "content", "frontier");

const ROMAN = ["I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X"];

let cache: Chapter[] | null = null;

export function getChapters(): Chapter[] {
  if (cache) return cache;
  const files = fs
    .readdirSync(CONTENT_DIR)
    .filter((f) => f.endsWith(".mdx"))
    .sort();

  const chapters = files.map((file): Chapter => {
    const raw = fs.readFileSync(path.join(CONTENT_DIR, file), "utf8");
    const { data, content } = matter(raw);
    return {
      title: String(data.title),
      shortTitle: String(data.shortTitle ?? data.title),
      slug: String(data.slug),
      order: Number(data.order),
      part: Number(data.part),
      partTitle: String(data.partTitle),
      volume: String(data.volume ?? "The Sovereign Frontier"),
      status: data.status === "published" ? "published" : "pending",
      summary: String(data.summary ?? ""),
      sourceNotionUrl: String(data.source_notion_url ?? ""),
      lastSynced: data.last_synced ? String(data.last_synced) : null,
      related: Array.isArray(data.related) ? data.related.map(String) : [],
      plates: Array.isArray(data.plates)
        ? data.plates.map(
            (p: Record<string, unknown>): ChapterPlate => ({
              src: String(p.src),
              width: Number(p.width),
              height: Number(p.height),
              alt: String(p.alt ?? ""),
              caption: String(p.caption ?? ""),
            })
          )
        : [],
      body: content,
    };
  });

  chapters.sort((a, b) => a.order - b.order);
  cache = chapters;
  return chapters;
}

export function getChapter(slug: string): Chapter | undefined {
  return getChapters().find((c) => c.slug === slug);
}

export function getParts(): Part[] {
  const parts = new Map<number, Part>();
  for (const chapter of getChapters()) {
    if (!parts.has(chapter.part)) {
      parts.set(chapter.part, {
        number: chapter.part,
        numeral: ROMAN[chapter.part - 1] ?? String(chapter.part),
        title: chapter.partTitle,
        chapters: [],
      });
    }
    parts.get(chapter.part)!.chapters.push(chapter);
  }
  return [...parts.values()].sort((a, b) => a.number - b.number);
}

export function getAdjacentChapters(slug: string): {
  previous: Chapter | null;
  next: Chapter | null;
} {
  const chapters = getChapters();
  const index = chapters.findIndex((c) => c.slug === slug);
  if (index === -1) return { previous: null, next: null };
  return {
    previous: index > 0 ? chapters[index - 1] : null,
    next: index < chapters.length - 1 ? chapters[index + 1] : null,
  };
}

export function getRelatedChapters(slug: string): Chapter[] {
  const chapter = getChapter(slug);
  if (!chapter) return [];
  return chapter.related
    .map((s) => getChapter(s))
    .filter((c): c is Chapter => Boolean(c));
}

export function chapterRoute(slug: string): string {
  return `/frontier/${slug}`;
}

export function formatChapterNumber(order: number): string {
  return String(order).padStart(2, "0");
}

export function partNumeral(part: number): string {
  return ROMAN[part - 1] ?? String(part);
}

/**
 * A serializable slice of the manifest for client components (navigation).
 */
export interface NavPart {
  number: number;
  numeral: string;
  title: string;
  chapters: NavChapter[];
}

export interface NavChapter {
  title: string;
  shortTitle: string;
  slug: string;
  order: number;
  status: "published" | "pending";
}

export function getNavManifest(): NavPart[] {
  return getParts().map((part) => ({
    number: part.number,
    numeral: part.numeral,
    title: part.title,
    chapters: part.chapters.map((c) => ({
      title: c.title,
      shortTitle: c.shortTitle,
      slug: c.slug,
      order: c.order,
      status: c.status,
    })),
  }));
}
