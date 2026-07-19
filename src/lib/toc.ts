import GithubSlugger from "github-slugger";

export interface TocEntry {
  id: string;
  text: string;
  level: 2 | 3;
}

/**
 * Extracts h2/h3 headings from raw MDX for the "On this page" navigation.
 * Ids are generated with github-slugger so they match the ids rehype-slug
 * assigns during MDX compilation.
 */
export function extractToc(markdown: string): TocEntry[] {
  const slugger = new GithubSlugger();
  const entries: TocEntry[] = [];
  let inCodeFence = false;

  for (const line of markdown.split("\n")) {
    if (/^\s*```/.test(line)) {
      inCodeFence = !inCodeFence;
      continue;
    }
    if (inCodeFence) continue;

    const match = /^(#{2,3})\s+(.+?)\s*$/.exec(line);
    if (!match) continue;

    const level = match[1].length as 2 | 3;
    const text = match[2]
      .replace(/\*\*([^*]+)\*\*/g, "$1")
      .replace(/\*([^*]+)\*/g, "$1")
      .replace(/`([^`]+)`/g, "$1")
      .replace(/\[([^\]]+)\]\([^)]*\)/g, "$1");

    entries.push({ id: slugger.slug(text), text, level });
  }

  return entries;
}
