import Link from "next/link";
import type { Chapter } from "@/lib/publication";
import { chapterLabel, formatChapterNumber, routeOf } from "@/lib/publication";
import { volumeNumber, type Volume } from "@/lib/volumes";

/**
 * Landing page for a library volume. Shows published chapters when they
 * exist; otherwise the reserved state. Planned scope comes from the canon
 * volume pages; `coveredScope` names the scope items already published.
 */
export function VolumePage({
  volume,
  chapters = [],
  coveredScope = [],
}: {
  volume: Volume;
  chapters?: Chapter[];
  coveredScope?: string[];
}) {
  const published = chapters.filter((c) => c.status === "published");
  const planned = volume.scope.filter((s) => !coveredScope.includes(s));
  const groupLabel = published[0]?.partTitle ?? "Chapters";

  return (
    <main className="min-h-screen px-5 py-12 sm:px-8 lg:py-16">
      <article className="mx-auto max-w-2xl">
        <header>
          <p className="flex flex-wrap items-baseline justify-between gap-2 border-b-2 border-ink pb-3 font-mono text-[0.62rem] font-semibold uppercase tracking-[0.2em] text-ink">
            <span>✴ The library · {volume.role}</span>
            <span>Vol. {volumeNumber(volume.number)}</span>
          </p>
          <h1 className="mt-8 font-sans text-4xl font-bold leading-[1.0] tracking-tight text-ink sm:text-6xl">
            {volume.title}
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-ink-soft">
            {volume.description}
          </p>
        </header>

        {published.length === 0 ? (
          <div className="shadow-print mt-10 border border-ink bg-white/60 px-6 py-8 text-center">
            <p className="inline-block border border-clay px-2 py-1 font-mono text-[0.62rem] font-semibold uppercase tracking-[0.2em] text-clay">
              Status: forthcoming
            </p>
            <p className="mx-auto mt-3 max-w-md font-serif text-base leading-relaxed text-ink-soft">
              This volume&apos;s drafts are being consolidated into canonical
              chapters in the editorial workspace. It will publish here through
              the same approval discipline as Volume I.
            </p>
          </div>
        ) : (
          <section aria-label={groupLabel} className="mt-10">
            <div className="flex items-baseline justify-between border-b-2 border-ink pb-2">
              <h2 className="font-mono text-[0.62rem] font-semibold uppercase tracking-[0.2em] text-ink">
                ✴ {groupLabel}
              </h2>
              <span className="font-mono text-[0.6rem] uppercase tracking-[0.16em] text-ink-faint">
                {formatChapterNumber(published.length)} published
              </span>
            </div>
            <ol className="divide-y divide-rule">
              {published.map((chapter) => (
                <li key={chapter.slug}>
                  <Link
                    href={routeOf(chapter)}
                    className="group flex gap-4 px-3 py-4 transition-colors duration-150 hover:bg-white/70"
                  >
                    <span className="shrink-0 pt-1 font-mono text-xs text-ink-faint">
                      {chapterLabel(chapter.volumeId, chapter.order)}
                    </span>
                    <span className="min-w-0">
                      <span className="block font-sans text-lg font-bold leading-snug tracking-tight text-ink group-hover:text-accent">
                        {chapter.title}
                      </span>
                      <span className="mt-1 block font-serif text-[0.95rem] leading-relaxed text-ink-soft">
                        {chapter.summary}
                      </span>
                    </span>
                  </Link>
                </li>
              ))}
            </ol>
          </section>
        )}

        {planned.length > 0 && (
          <section aria-label="Planned scope" className="mt-12">
            <h2 className="font-mono text-[0.62rem] font-semibold uppercase tracking-[0.2em] text-ink-faint">
              ✴ {published.length > 0 ? "Planned" : "Planned scope"}
            </h2>
            <ul className="mt-4 grid gap-x-8 gap-y-0.5 border-y border-ink py-3 sm:grid-cols-2">
              {planned.map((item) => (
                <li key={item} className="flex gap-2.5 py-1.5">
                  <span
                    aria-hidden
                    className="shrink-0 font-mono text-[0.65rem] leading-[1.8] text-clay"
                  >
                    ✴
                  </span>
                  <span className="font-serif text-base leading-relaxed text-ink">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </section>
        )}

        <footer className="mt-14 border-t-2 border-ink pt-5">
          <Link
            href="/frontier"
            className="shadow-print-sm inline-block border border-ink bg-ink px-6 py-3 font-mono text-[0.7rem] font-semibold uppercase tracking-[0.16em] text-paper transition-colors duration-150 hover:bg-accent"
          >
            ← Vol. 01 · The Sovereign Frontier
          </Link>
        </footer>
      </article>
    </main>
  );
}
