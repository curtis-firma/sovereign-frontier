import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import {
  chapterRoute,
  formatChapterNumber,
  getChapters,
  getParts,
} from "@/lib/publication";

export const metadata: Metadata = {
  title: "The Sovereign Frontier",
};

export default function FrontierLanding() {
  const parts = getParts();
  const chapters = getChapters();
  const firstChapter = chapters[0];
  const publishedCount = chapters.filter((c) => c.status === "published").length;

  return (
    <main className="px-5 py-10 sm:px-8 lg:px-14 lg:py-14">
      <div className="mx-auto max-w-3xl">
        {/* Title plate */}
        <header>
          <div className="flex flex-wrap items-baseline justify-between gap-2 border-b-2 border-ink pb-3 font-mono text-[0.62rem] font-semibold uppercase tracking-[0.2em] text-ink">
            <span>✴ A field guide</span>
            <span>
              Vol. 01 · {chapters.length} chapters · {parts.length} parts
            </span>
          </div>

          <h1 className="mt-8 font-sans text-5xl font-bold leading-[0.95] tracking-tight text-ink sm:text-7xl">
            The Sovereign
            <br />
            Frontier
          </h1>

          <div className="mt-8 grid items-start gap-8 sm:grid-cols-[1fr_17rem]">
            <div>
              <p className="max-w-xl text-lg leading-relaxed text-ink-soft">
                An atlas of emerging political and settlement concepts. The
                guide moves from foundational political language — nation,
                state, sovereignty — into the architecture of settlement, and
                ends in a living case study: ATX, a Settlemint in formation.
              </p>
              <Link
                href={chapterRoute(firstChapter.slug)}
                className="shadow-print-sm mt-6 inline-block border border-ink bg-ink px-6 py-3.5 text-center font-mono text-[0.7rem] font-semibold uppercase tracking-[0.16em] text-paper transition-colors duration-150 hover:bg-accent active:translate-x-px active:translate-y-px active:shadow-none"
              >
                Start reading → CH_01
              </Link>
              <p className="mt-8 border-t border-rule pt-3 font-mono text-[0.62rem] uppercase tracking-[0.16em] text-ink-faint">
                Status: {formatChapterNumber(publishedCount)}/
                {formatChapterNumber(chapters.length)} chapters published
                <br />
                Reading order below
              </p>
            </div>
            <figure className="mx-auto w-full max-w-[17rem]">
              <div className="shadow-print border border-ink">
                <Image
                  src="/plates/building-living-nations-cover.webp"
                  alt="Guide cover: Building Living Nations — a field guide to Settlemints and network states, with a live oak, mission ruins, a golden sun, and a container module village"
                  width={1122}
                  height={1402}
                  priority
                  className="block w-full"
                />
              </div>
              <figcaption className="mt-2 text-center font-mono text-[0.58rem] uppercase tracking-[0.16em] text-ink-faint">
                ✴ Guide No. 001 · MMXXVI
              </figcaption>
            </figure>
          </div>
        </header>

        {/* Table of contents */}
        <section aria-label="Table of contents" className="mt-14 space-y-12">
          {parts.map((part) => (
            <div key={part.number}>
              <div className="grid gap-5 sm:grid-cols-[8rem_1fr]">
                <div>
                  <div className="shadow-print-sm border border-ink">
                    <Image
                      src={`/plates/part-${part.number}.png`}
                      alt=""
                      width={640}
                      height={640}
                      className="block w-full"
                    />
                  </div>
                  <p className="mt-2 font-mono text-[0.6rem] font-semibold uppercase tracking-[0.18em] text-ink">
                    Part {part.numeral}
                  </p>
                  <p className="font-sans text-sm font-bold tracking-tight text-ink">
                    {part.title}
                  </p>
                </div>

                <ol className="divide-y divide-rule border-y border-ink self-start">
                  {part.chapters.map((chapter) => (
                    <li key={chapter.slug}>
                      <Link
                        href={chapterRoute(chapter.slug)}
                        className="group flex gap-4 px-3 py-4 transition-colors duration-150 hover:bg-white/70"
                      >
                        <span className="shrink-0 pt-1 font-mono text-xs text-ink-faint">
                          {formatChapterNumber(chapter.order)}
                        </span>
                        <span className="min-w-0">
                          <span className="block font-sans text-lg font-bold leading-snug tracking-tight text-ink group-hover:text-accent">
                            {chapter.title}
                            {chapter.status === "pending" && (
                              <span className="ml-2 inline-block translate-y-[-2px] border border-ink-faint/60 px-1.5 py-0.5 align-middle font-mono text-[0.55rem] font-medium uppercase tracking-[0.12em] text-ink-faint">
                                soon
                              </span>
                            )}
                          </span>
                          <span className="mt-1 block font-serif text-[0.95rem] leading-relaxed text-ink-soft">
                            {chapter.summary}
                          </span>
                        </span>
                      </Link>
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          ))}

          {/* Appendix */}
          <div className="grid gap-5 sm:grid-cols-[8rem_1fr]">
            <div>
              <p className="font-mono text-[0.6rem] font-semibold uppercase tracking-[0.18em] text-ink">
                ✴ Appendix
              </p>
            </div>
            <div className="border-y border-ink self-start">
              <Link
                href="/frontier/glossary"
                className="group flex gap-4 px-3 py-4 transition-colors duration-150 hover:bg-white/70"
              >
                <span className="shrink-0 pt-1 font-mono text-xs text-clay">✴</span>
                <span>
                  <span className="block font-sans text-lg font-bold leading-snug tracking-tight text-ink group-hover:text-accent">
                    Glossary
                  </span>
                  <span className="mt-1 block font-serif text-[0.95rem] leading-relaxed text-ink-soft">
                    The guide&apos;s working vocabulary, gathered in one place — every definition quoted from its chapter.
                  </span>
                </span>
              </Link>
            </div>
          </div>
        </section>

        <footer className="mt-16 border-t-2 border-ink pt-4 font-mono text-[0.62rem] uppercase tracking-[0.16em] text-ink-faint">
          ✴ The publication reads in order. Each chapter stands on its own.
        </footer>
      </div>
    </main>
  );
}
