import type { MetadataRoute } from "next";
import { chapterRoute, getChapters } from "@/lib/publication";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://sovereign-frontier.netlify.app";
  return [
    { url: `${base}/frontier`, priority: 1 },
    ...getChapters().map((c) => ({
      url: `${base}${chapterRoute(c.slug)}`,
      priority: 0.8,
    })),
    { url: `${base}/frontier/glossary`, priority: 0.5 },
    { url: `${base}/standard`, priority: 0.3 },
    { url: `${base}/architecture`, priority: 0.3 },
  ];
}
