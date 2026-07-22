import type { Metadata } from "next";
import { ChapterArticle } from "@/components/ChapterArticle";
import { getChapter, getChapters } from "@/lib/publication";

export function generateStaticParams() {
  return getChapters("standard").map((c) => ({ slug: c.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const chapter = getChapter(slug, "standard");
  if (!chapter) return {};
  return { title: chapter.title, description: chapter.summary };
}

export default async function StandardSpecPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  return <ChapterArticle volumeId="standard" slug={slug} />;
}
