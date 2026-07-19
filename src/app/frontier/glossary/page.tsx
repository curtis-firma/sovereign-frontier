import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { chapterRoute, getChapters } from "@/lib/publication";

export const metadata: Metadata = {
  title: "Glossary",
  description: "The working vocabulary of The Sovereign Frontier.",
};

export default function GlossaryPage() {
  const firstChapter = getChapters()[0];

  return (
    <main className="px-5 py-10 sm:px-8 lg:px-14 lg:py-14">
      <article className="mx-auto max-w-2xl">
        <header className="mb-10">
          <p className="flex flex-wrap items-baseline justify-between gap-2 border-b-2 border-ink pb-3 font-mono text-[0.62rem] font-semibold uppercase tracking-[0.2em] text-ink">
            <span>✴ Appendix</span>
            <span>GLOSSARY</span>
          </p>
          <h1 className="mt-6 font-sans text-3xl font-bold leading-[1.05] tracking-tight text-ink sm:text-5xl">
            Glossary
          </h1>
          <p className="mt-4 border-b border-rule pb-8 text-lg leading-relaxed text-ink-soft">
            The guide&apos;s working vocabulary, gathered in one place.
          </p>
        </header>

        <figure className="mb-10">
          <div className="shadow-print border border-ink">
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

        <div className="shadow-print border border-ink bg-white/60 px-6 py-10 text-center">
          <p className="inline-block border border-clay px-2 py-1 font-mono text-[0.62rem] font-semibold uppercase tracking-[0.2em] text-clay">
            Status: forthcoming
          </p>
          <p className="mt-4 font-sans text-xl font-bold tracking-tight text-ink">
            The written glossary arrives after all chapters are approved.
          </p>
          <p className="mx-auto mt-2 max-w-md text-base leading-relaxed text-ink-soft">
            Until then, key terms are defined where they first appear —
            beginning with{" "}
            <Link
              href={chapterRoute(firstChapter.slug)}
              className="text-accent underline underline-offset-4"
            >
              Chapter 01
            </Link>
            .
          </p>
        </div>
      </article>
    </main>
  );
}
