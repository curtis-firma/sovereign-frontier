import Link from "next/link";
import {
  chapterRoute,
  formatChapterNumber,
  getChapter,
} from "@/lib/publication";
import { volumeNumber, type Volume } from "@/lib/volumes";

/**
 * Landing page for a reserved (forthcoming) volume of the library.
 * Its scope quotes the questions the published canon assigns to it.
 */
export function VolumePage({ volume }: { volume: Volume }) {
  return (
    <main className="min-h-screen px-5 py-12 sm:px-8 lg:py-16">
      <article className="mx-auto max-w-2xl">
        <header>
          <p className="flex flex-wrap items-baseline justify-between gap-2 border-b-2 border-ink pb-3 font-mono text-[0.62rem] font-semibold uppercase tracking-[0.2em] text-ink">
            <span>✴ The library</span>
            <span>Vol. {volumeNumber(volume.number)}</span>
          </p>
          <h1 className="mt-8 font-sans text-4xl font-bold leading-[1.0] tracking-tight text-ink sm:text-6xl">
            {volume.title}
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-ink-soft">
            {volume.description}
          </p>
        </header>

        <div className="shadow-print mt-10 border border-ink bg-white/60 px-6 py-8 text-center">
          <p className="inline-block border border-clay px-2 py-1 font-mono text-[0.62rem] font-semibold uppercase tracking-[0.2em] text-clay">
            Status: forthcoming
          </p>
          <p className="mx-auto mt-3 max-w-md font-serif text-base leading-relaxed text-ink-soft">
            This volume&apos;s canon is being written in the editorial
            workspace. It will publish here, chapter by chapter, through the
            same approval discipline as Volume I.
          </p>
        </div>

        {volume.scope.length > 0 && (
          <section aria-label="Assigned scope" className="mt-12">
            <h2 className="font-mono text-[0.62rem] font-semibold uppercase tracking-[0.2em] text-ink-faint">
              ✴ What the published canon assigns to this volume
            </h2>
            <ul className="mt-4 divide-y divide-rule border-y border-ink">
              {volume.scope.map((s) => {
                const chapter = getChapter(s.source);
                return (
                  <li key={s.item} className="py-4">
                    <p className="font-serif text-base leading-relaxed text-ink">
                      {s.item}
                    </p>
                    {chapter && (
                      <Link
                        href={chapterRoute(s.source)}
                        className="mt-1.5 inline-block font-mono text-[0.62rem] font-semibold uppercase tracking-[0.14em] text-accent hover:underline"
                      >
                        ← Assigned by CH_{formatChapterNumber(chapter.order)} ·{" "}
                        {chapter.title}
                      </Link>
                    )}
                  </li>
                );
              })}
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
