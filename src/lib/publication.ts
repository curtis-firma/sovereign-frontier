import fs from "fs";
import path from "path";
import matter from "gray-matter";

/**
 * The publication registry.
 *
 * The single source of truth for the library is the frontmatter of the MDX
 * files under `content/<volumeId>/`. This module reads that frontmatter and
 * assembles the manifest that drives chapter order, Part grouping, routes,
 * navigation, previous/next links, landing pages, reading progress, search,
 * and related-chapter references — for every volume. Nothing else should
 * hard-code publication structure.
 */

export interface ChapterPlate {
  /** Stable id used by inline <Plate id="..."/> references (src basename). */
  id: string;
  src: string;
  width: number;
  height: number;
  alt: string;
  caption: string;
  /** "full" spans the reading column; "half" renders at reduced width. */
  display: "full" | "half";
}

export interface Chapter {
  volumeId: string;
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

const CONTENT_ROOT = path.join(process.cwd(), "content");

const ROMAN = ["I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X"];

/** Chapter-number label prefix per volume (CH_01, HB_01, …). */
const LABEL_PREFIX: Record<string, string> = {
  frontier: "CH",
  handbook: "HB",
  architecture: "AR",
  standard: "ST",
};

const caches = new Map<string, Chapter[]>();

export function getVolumeIds(): string[] {
  return fs
    .readdirSync(CONTENT_ROOT, { withFileTypes: true })
    .filter((d) => d.isDirectory())
    .map((d) => d.name)
    .sort();
}

export function getChapters(volumeId = "frontier"): Chapter[] {
  const cached = caches.get(volumeId);
  if (cached) return cached;

  const dir = path.join(CONTENT_ROOT, volumeId);
  if (!fs.existsSync(dir)) return [];
  const files = fs
    .readdirSync(dir)
    .filter((f) => f.endsWith(".mdx"))
    .sort();

  const chapters = files.map((file): Chapter => {
    const raw = fs.readFileSync(path.join(dir, file), "utf8");
    const { data, content } = matter(raw);
    return {
      volumeId,
      title: String(data.title),
      shortTitle: String(data.shortTitle ?? data.title),
      slug: String(data.slug),
      order: Number(data.order),
      part: Number(data.part),
      partTitle: String(data.partTitle),
      volume: String(data.volume ?? ""),
      status: data.status === "published" ? "published" : "pending",
      summary: String(data.summary ?? ""),
      sourceNotionUrl: String(data.source_notion_url ?? ""),
      lastSynced: data.last_synced ? String(data.last_synced) : null,
      related: Array.isArray(data.related) ? data.related.map(String) : [],
      plates: Array.isArray(data.plates)
        ? data.plates.map(
            (p: Record<string, unknown>): ChapterPlate => ({
              id: String(p.src).split("/").pop()!.replace(/\.\w+$/, ""),
              src: String(p.src),
              width: Number(p.width),
              height: Number(p.height),
              alt: String(p.alt ?? ""),
              caption: String(p.caption ?? ""),
              display: p.display === "half" ? "half" : "full",
            })
          )
        : [],
      body: content,
    };
  });

  chapters.sort((a, b) => a.order - b.order);
  caches.set(volumeId, chapters);
  return chapters;
}

export function getChapter(
  slug: string,
  volumeId = "frontier"
): Chapter | undefined {
  return getChapters(volumeId).find((c) => c.slug === slug);
}

export function getParts(volumeId = "frontier"): Part[] {
  const parts = new Map<number, Part>();
  for (const chapter of getChapters(volumeId)) {
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

export function getAdjacentChapters(
  slug: string,
  volumeId = "frontier"
): {
  previous: Chapter | null;
  next: Chapter | null;
} {
  const chapters = getChapters(volumeId);
  const index = chapters.findIndex((c) => c.slug === slug);
  if (index === -1) return { previous: null, next: null };
  return {
    previous: index > 0 ? chapters[index - 1] : null,
    next: index < chapters.length - 1 ? chapters[index + 1] : null,
  };
}

export function getRelatedChapters(
  slug: string,
  volumeId = "frontier"
): Chapter[] {
  const chapter = getChapter(slug, volumeId);
  if (!chapter) return [];
  return chapter.related
    .map((s) => getChapter(s, volumeId))
    .filter((c): c is Chapter => Boolean(c));
}

/** Route for a chapter in any volume. */
export function routeOf(chapter: { volumeId: string; slug: string }): string {
  return `/${chapter.volumeId}/${chapter.slug}`;
}

/** Legacy helper: route for a Volume I chapter slug. */
export function chapterRoute(slug: string): string {
  return `/frontier/${slug}`;
}

export function formatChapterNumber(order: number): string {
  return String(order).padStart(2, "0");
}

/** Chapter label for a volume (e.g. CH_04, HB_02). */
export function chapterLabel(volumeId: string, order: number): string {
  return `${LABEL_PREFIX[volumeId] ?? "CH"}_${formatChapterNumber(order)}`;
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
  route: string;
  order: number;
  status: "published" | "pending";
}

export function getNavManifest(volumeId = "frontier"): NavPart[] {
  return getParts(volumeId).map((part) => ({
    number: part.number,
    numeral: part.numeral,
    title: part.title,
    chapters: part.chapters.map((c) => ({
      title: c.title,
      shortTitle: c.shortTitle,
      slug: c.slug,
      route: routeOf(c),
      order: c.order,
      status: c.status,
    })),
  }));
}
