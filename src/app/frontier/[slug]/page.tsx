import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { compileMDX } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";
import {
  chapterRoute,
  formatChapterNumber,
  getAdjacentChapters,
  getChapter,
  getChapters,
  getRelatedChapters,
  partNumeral,
} from "@/lib/publication";
import { extractToc } from "@/lib/toc";
import { mdxComponents } from "@/components/mdx-components";
import { PlateFigure } from "@/components/PlateFigure";
import { TocNav, MobileToc } from "@/components/TocNav";
import { ChapterPager } from "@/components/ChapterPager";

export function generateStaticParams() {
  return getChapters().map((chapter) => ({ slug: chapter.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const chapter = getChapter(slug);
  if (!chapter) return {};
  return { title: chapter.title, description: chapter.summary };
}

export default async function ChapterPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const chapter = getChapter(slug);
  if (!chapter) notFound();

  const { previous, next } = getAdjacentChapters(slug);
  const related = getRelatedChapters(slug);
  const isPublished = chapter.status === "published";
  const toc = isPublished ? extractToc(chapter.body) : [];

  const plateLabel = (i: number) =>
    `${formatChapterNumber(chapter.order)}${chapter.plates.length > 1 ? `.${i + 1}` : ""}`;

  // Plates placed inline via <Plate id="..."/> in the MDX body; the rest
  // render as a grid after the chapter text.
  const referenced = new Set(
    [...chapter.body.matchAll(/<Plate\s+id="([^"]+)"/g)].map((m) => m[1])
  );
  const unplaced = chapter.plates.filter((p) => !referenced.has(p.id));

  function Plate({ id }: { id: string }) {
    const i = chapter!.plates.findIndex((p) => p.id === id);
    if (i === -1) return null;
    return <PlateFigure plate={chapter!.plates[i]} label={plateLabel(i)} />;
  }

  const content = isPublished
    ? (
        await compileMDX({
          source: chapter.body,
          components: { ...mdxComponents, Plate },
          options: {
            mdxOptions: {
              remarkPlugins: [remarkGfm],
              rehypePlugins: [rehypeSlug],
            },
          },
        })
      ).content
    : null;

  return (
    <div className="flex">
      {/* Center reading column */}
      <main className="min-w-0 flex-1 px-5 py-10 sm:px-8 lg:px-14 lg:py-14">
        <article className="mx-auto max-w-2xl">
          <header className="mb-10">
            <p className="flex flex-wrap items-baseline justify-between gap-2 border-b-2 border-ink pb-3 font-mono text-[0.62rem] font-semibold uppercase tracking-[0.2em] text-ink">
              <span>✴ Part {partNumeral(chapter.part)} — {chapter.partTitle}</span>
              <span>CH_{formatChapterNumber(chapter.order)}</span>
            </p>
            <h1 className="mt-6 font-sans text-3xl font-bold leading-[1.05] tracking-tight text-ink sm:text-5xl">
              {chapter.title}
            </h1>
            <p className="mt-5 border-b border-rule pb-8 text-lg leading-relaxed text-ink-soft">
              {chapter.summary}
            </p>
          </header>

          <MobileToc entries={toc} />

          {isPublished ? (
            <div className="reading">{content}</div>
          ) : (
            <div className="shadow-print border border-ink bg-white/60 px-6 py-10 text-center">
              <p className="inline-block border border-clay px-2 py-1 font-mono text-[0.62rem] font-semibold uppercase tracking-[0.2em] text-clay">
                Status: unpublished
              </p>
              <p className="mt-4 font-sans text-xl font-bold tracking-tight text-ink">
                This chapter has not been imported yet.
              </p>
              <p className="mx-auto mt-2 max-w-md text-base leading-relaxed text-ink-soft">
                Its place in the publication is reserved. The text will appear
                here once the chapter is approved and imported from the
                editorial workspace.
              </p>
            </div>
          )}

          {unplaced.length > 0 && (
            <section aria-label="Plates" className="mt-12">
              <div className="grid gap-x-6 gap-y-2 sm:grid-cols-2">
                {unplaced.map((plate) => {
                  const i = chapter.plates.indexOf(plate);
                  return (
                    <div
                      key={plate.src}
                      className={plate.display === "full" ? "sm:col-span-2" : ""}
                    >
                      <PlateFigure plate={plate} label={plateLabel(i)} />
                    </div>
                  );
                })}
              </div>
            </section>
          )}

          {related.length > 0 && (
            <aside className="mt-14 border-t border-ink/25 pt-6">
              <h2 className="font-mono text-[0.62rem] font-semibold uppercase tracking-[0.2em] text-ink-faint">
                ✴ Related chapters
              </h2>
              <ul className="mt-3 space-y-1.5">
                {related.map((r) => (
                  <li key={r.slug} className="flex gap-3">
                    <span className="font-mono text-sm text-ink-faint">
                      {formatChapterNumber(r.order)}
                    </span>
                    <Link
                      href={chapterRoute(r.slug)}
                      className="font-sans text-base font-medium text-ink underline decoration-ink/30 underline-offset-4 transition-colors hover:text-accent hover:decoration-accent"
                    >
                      {r.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </aside>
          )}

          <ChapterPager previous={previous} next={next} />
        </article>
      </main>

      {/* Right "On this page" navigation (desktop) */}
      <aside className="hidden w-60 shrink-0 xl:block">
        <div className="sticky top-0 max-h-screen overflow-y-auto py-14 pr-8">
          <TocNav entries={toc} />
        </div>
      </aside>
    </div>
  );
}
