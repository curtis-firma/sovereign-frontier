import type { MetadataRoute } from "next";
import { getChapters, getVolumeIds, routeOf } from "@/lib/publication";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://sovereign-frontier.netlify.app";
  return [
    { url: `${base}/frontier`, priority: 1 },
    ...getVolumeIds().flatMap((v) =>
      getChapters(v)
        .filter((c) => c.status === "published")
        .map((c) => ({ url: `${base}${routeOf(c)}`, priority: 0.8 }))
    ),
    { url: `${base}/frontier/glossary`, priority: 0.5 },
    { url: `${base}/handbook`, priority: 0.4 },
    { url: `${base}/architecture`, priority: 0.4 },
    { url: `${base}/standard`, priority: 0.3 },
  ];
}
