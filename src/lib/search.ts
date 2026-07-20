import GithubSlugger from "github-slugger";
import { getChapters } from "./publication";

/**
 * Static full-text search index, built from the publication registry at
 * build time and served as JSON. One record per chapter section.
 */

export interface SearchRecord {
  chapter: string;
  chapterTitle: string;
  order: number;
  section: string;
  anchor: string;
  text: string;
}

function cleanLine(line: string): string {
  return line
    .replace(/<Plate[^>]*\/>/g, "")
    .replace(/^\s*>\s?/, "")
    .replace(/^[-*]\s+/, "")
    .replace(/^\d+\.\s+/, "")
    .replace(/\*\*([^*]+)\*\*/g, "$1")
    .replace(/\*([^*]+)\*/g, "$1")
    .replace(/`([^`]+)`/g, "$1")
    .replace(/\[([^\]]+)\]\([^)]*\)/g, "$1")
    .replace(/^\|[-\s|]+\|$/g, "")
    .replace(/\|/g, " ")
    .trim();
}

export function buildSearchIndex(): SearchRecord[] {
  const records: SearchRecord[] = [];

  for (const chapter of getChapters()) {
    const slugger = new GithubSlugger();
    let section = "Overview";
    let anchor = "";
    let lines: string[] = [];

    const flush = () => {
      const text = lines.filter(Boolean).join(" ").replace(/\s+/g, " ").trim();
      if (text) {
        records.push({
          chapter: chapter.slug,
          chapterTitle: chapter.title,
          order: chapter.order,
          section,
          anchor,
          text,
        });
      }
      lines = [];
    };

    for (const line of chapter.body.split("\n")) {
      const heading = /^(#{2,3})\s+(.+?)\s*$/.exec(line);
      if (heading) {
        flush();
        section = cleanLine(heading[2]);
        anchor = slugger.slug(section);
      } else {
        lines.push(cleanLine(line));
      }
    }
    flush();
  }

  return records;
}
