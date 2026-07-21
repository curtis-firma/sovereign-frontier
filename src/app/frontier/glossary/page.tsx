import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { chapterRoute, formatChapterNumber, getChapter } from "@/lib/publication";
import { getGlossary } from "@/lib/glossary";

export const metadata: Metadata = {
  title: "Glossary",
  description:
    "The working vocabulary of The Sovereign Frontier, gathered from the chapters where each term is defined.",
};

export default function GlossaryPage() {
  const entries = getGlossary();

  // Group alphabetically, ignoring a leading "The ".
  const groups = new Map<string, typeof entries>();
  for (const entry of entries) {
    const letter = entry.term.replace(/^The /, "")[0].toUpperCase();
    if (!groups.has(letter)) groups.set(letter, []);
    groups.get(letter)!.push(entry);
  }

  return (
    <main className="px-5 py-10 sm:px-8 lg:px-14 lg:py-14">
      <article className="mx-auto max-w-2xl">
        <header className="mb-10">
          <p className="flex flex-wrap items-baseline justify-between gap-2 border-b-2 border-ink pb-3 font-mono text-[0.62rem] font-semibold uppercase tracking-[0.2em] text-ink">
            <span>✴ Appendix</span>
            <span>{entries.length} terms</span>
          </p>
          <h1 className="mt-6 font-sans text-3xl font-bold leading-[1.05] tracking-tight text-ink sm:text-5xl">
            Glossary
          </h1>
          <p className="mt-4 border-b border-rule pb-8 text-lg leading-relaxed text-ink-soft">
            The guide&apos;s working vocabulary, gathered in one place. Definitions
            are quoted from the chapter where each term is established, or from
            the canon glossary and the Firma organizational architecture —
            follow the reference to read it in context.
          </p>
        </header>

        <figure className="mb-12">
          <div className="shadow-print-sm border border-ink">
            <Image
              src="/plates/symbol-library.webp"
              alt="Field-guide plate: the Settlemint symbol library — sun, mission arch, grove, grid module, coordinate marker, wave, district seal, container star, settlement emblem, and graphic devices, with the five-color palette"
              width={1448}
              height={1086}
              priority
              className="block w-full"
            />
          </div>
          <figcaption className="mt-2.5 font-mono text-[0.6rem] font-medium uppercase tracking-[0.16em] text-ink-faint">
            ✴ Plate A · The Settlemint symbol library — visual language for a
            sovereign future
          </figcaption>
        </figure>

        <div className="space-y-10">
          {[...groups.entries()].map(([letter, group]) => (
            <section key={letter} aria-label={`Terms beginning with ${letter}`}>
              <h2 className="border-b-2 border-ink pb-2 font-mono text-sm font-bold text-accent">
                {letter}
              </h2>
              <dl className="mt-4 space-y-6">
                {group.map((entry) => {
                  const chapter = entry.source
                    ? getChapter(entry.source)
                    : undefined;
                  const href = entry.source
                    ? chapterRoute(entry.source) +
                      (entry.anchor ? `#${entry.anchor}` : "")
                    : "";
                  return (
                    <div key={entry.term}>
                      <dt className="font-sans text-lg font-bold tracking-tight text-ink">
                        {entry.term}
                      </dt>
                      <dd className="mt-1 font-serif text-[1.02rem] leading-relaxed text-ink-soft">
                        {entry.definition}
                      </dd>
                      {chapter && (
                        <dd className="mt-1.5">
                          <Link
                            href={href}
                            className="font-mono text-[0.62rem] font-semibold uppercase tracking-[0.14em] text-accent hover:underline"
                          >
                            → CH_{formatChapterNumber(chapter.order)} ·{" "}
                            {chapter.title}
                          </Link>
                        </dd>
                      )}
                      {!chapter && entry.sourceLabel && (
                        <dd className="mt-1.5">
                          {entry.sourceHref ? (
                            <a
                              href={entry.sourceHref}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="font-mono text-[0.62rem] font-semibold uppercase tracking-[0.14em] text-ink-faint hover:text-accent hover:underline"
                            >
                              → {entry.sourceLabel}
                            </a>
                          ) : (
                            <span className="font-mono text-[0.62rem] font-semibold uppercase tracking-[0.14em] text-ink-faint">
                              → {entry.sourceLabel}
                            </span>
                          )}
                        </dd>
                      )}
                    </div>
                  );
                })}
              </dl>
            </section>
          ))}
        </div>

        <footer className="mt-16 border-t-2 border-ink pt-4 font-mono text-[0.62rem] uppercase tracking-[0.16em] text-ink-faint">
          ✴ Definitions are quoted canon. The chapters and canon sources govern.
        </footer>
      </article>
    </main>
  );
}
