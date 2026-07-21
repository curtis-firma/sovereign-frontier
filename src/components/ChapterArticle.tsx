import { notFound } from "next/navigation";
import Link from "next/link";
import { compileMDX } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";
import {
  chapterLabel,
  getAdjacentChapters,
  getChapter,
  getRelatedChapters,
  routeOf,
} from "@/lib/publication";
import { getVolume } from "@/lib/volumes";
import { extractToc } from "@/lib/toc";
import { mdxComponents } from "@/components/mdx-components";
import { PlateFigure } from "@/components/PlateFigure";
import { TocNav, MobileToc } from "@/components/TocNav";
import { ChapterPager } from "@/components/ChapterPager";

/** Chapter renderer for library volumes beyond Volume I. */
export async function ChapterArticle({
  volumeId,
  slug,
}: {
  volumeId: string;
  slug: string;
}) {
  const chapter = getChapter(slug, volumeId);
  if (!chapter) notFound();
  const volume = getVolume(volumeId);

  const { previous, next } = getAdjacentChapters(slug, volumeId);
  const related = getRelatedChapters(slug, volumeId);
  const toc = extractToc(chapter.body);

  const plateLabelFor = (i: number) =>
    `${chapterLabel(volumeId, chapter.order).replace("_", " ")}${
      chapter.plates.length > 1 ? `.${i + 1}` : ""
    }`;

  const referenced = new Set(
    [...chapter.body.matchAll(/<Plate\s+id="([^"]+)"/g)].map((m) => m[1])
  );
  const unplaced = chapter.plates.filter((p) => !referenced.has(p.id));

  function Plate({ id }: { id: string }) {
    const i = chapter!.plates.findIndex((p) => p.id === id);
    if (i === -1) return null;
    return <PlateFigure plate={chapter!.plates[i]} label={plateLabelFor(i)} />;
  }

  const { content } = await compileMDX({
    source: chapter.body,
    components: { ...mdxComponents, Plate },
    options: {
      mdxOptions: {
        remarkPlugins: [remarkGfm],
        rehypePlugins: [rehypeSlug],
      },
    },
  });

  return (
    <div className="flex">
      <main className="min-w-0 flex-1 px-5 py-10 sm:px-8 lg:px-14 lg:py-14">
        <article className="mx-auto max-w-2xl">
          <header className="mb-10">
            <p className="flex flex-wrap items-baseline justify-between gap-2 border-b-2 border-ink pb-3 font-mono text-[0.62rem] font-semibold uppercase tracking-[0.2em] text-ink">
              <span>
                ✴ {volume?.title ?? chapter.volume} · {chapter.partTitle}
              </span>
              <span>{chapterLabel(volumeId, chapter.order)}</span>
            </p>
            <h1 className="mt-6 font-sans text-3xl font-bold leading-[1.05] tracking-tight text-ink sm:text-5xl">
              {chapter.title}
            </h1>
            <p className="mt-5 border-b border-rule pb-8 text-lg leading-relaxed text-ink-soft">
              {chapter.summary}
            </p>
          </header>

          <MobileToc entries={toc} />

          <div className="reading">{content}</div>

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
                      <PlateFigure plate={plate} label={plateLabelFor(i)} />
                    </div>
                  );
                })}
              </div>
            </section>
          )}

          {related.length > 0 && (
            <aside className="mt-14 border-t border-ink/25 pt-6">
              <h2 className="font-mono text-[0.62rem] font-semibold uppercase tracking-[0.2em] text-ink-faint">
                ✴ Related
              </h2>
              <ul className="mt-3 space-y-1.5">
                {related.map((r) => (
                  <li key={r.slug} className="flex gap-3">
                    <span className="font-mono text-sm text-ink-faint">
                      {chapterLabel(volumeId, r.order)}
                    </span>
                    <Link
                      href={routeOf(r)}
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

          {chapter.lastSynced && (
            <p className="mt-6 font-mono text-[0.6rem] uppercase tracking-[0.16em] text-ink-faint">
              ✴ Last updated · {chapter.lastSynced}
            </p>
          )}
        </article>
      </main>

      <aside className="hidden w-60 shrink-0 xl:block">
        <div className="sticky top-0 max-h-screen overflow-y-auto py-14 pr-8">
          <TocNav entries={toc} />
        </div>
      </aside>
    </div>
  );
}
