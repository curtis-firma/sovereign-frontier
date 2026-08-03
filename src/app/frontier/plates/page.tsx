import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import {
  chapterLabel,
  getChapters,
  getVolumeIds,
  routeOf,
  type Chapter,
} from "@/lib/publication";
import { getVolume } from "@/lib/volumes";

export const metadata: Metadata = {
  title: "The Plates",
  description:
    "Every field-guide plate in the publication, gathered in one place — browsable by volume and chapter, with full-size files and the complete set as a download.",
};

interface ChromePlate {
  src: string;
  caption: string;
  home?: { label: string; href: string };
}

const CHROME: { heading: string; plates: ChromePlate[] }[] = [
  {
    heading: "The publication",
    plates: [
      { src: "/plates/building-living-nations-cover.webp", caption: "Building Living Nations — the cover", home: { label: "The field guide", href: "/frontier" } },
      { src: "/plates/part-foundations.webp", caption: "Part I poster — Austin was always a frontier", home: { label: "The field guide", href: "/frontier" } },
      { src: "/plates/part-settlement.webp", caption: "Part II poster — The settlement is the protocol", home: { label: "The field guide", href: "/frontier" } },
      { src: "/plates/part-architecture.webp", caption: "Part III poster — Land. Energy. Compute. Covenant.", home: { label: "The field guide", href: "/frontier" } },
      { src: "/plates/part-in-practice.webp", caption: "Part IV poster — A place to build what comes next", home: { label: "The field guide", href: "/frontier" } },
      { src: "/plates/symbol-library.webp", caption: "The Settlemint symbol library", home: { label: "Glossary", href: "/frontier/glossary" } },
      { src: "/plates/sovereign-frontier-plates-overview.webp", caption: "The core plates at a glance — overview sheet", home: { label: "Glossary", href: "/frontier/glossary" } },
    ],
  },
  {
    heading: "The volume seals",
    plates: [
      { src: "/plates/seal-handbook.webp", caption: "The Handbook seal — crossed hammer and key", home: { label: "Vol. 02", href: "/handbook" } },
      { src: "/plates/seal-architecture.webp", caption: "The Architecture seal — instruments over the substrate", home: { label: "Vol. 03", href: "/architecture" } },
      { src: "/plates/seal-standard.webp", caption: "The Standard seal — the surveyor's gauge", home: { label: "Vol. 04", href: "/standard" } },
    ],
  },
];

function PlateCard({
  src,
  caption,
  home,
}: {
  src: string;
  caption: string;
  home?: { label: string; href: string };
}) {
  return (
    <figure>
      <a href={src} target="_blank" rel="noreferrer" className="block">
        <div className="shadow-print-sm border border-ink transition-transform hover:-translate-y-0.5">
          <Image
            src={src}
            alt={caption}
            width={640}
            height={480}
            className="block w-full"
          />
        </div>
      </a>
      <figcaption className="mt-2 font-mono text-[0.58rem] font-medium uppercase tracking-[0.14em] leading-relaxed text-ink-faint">
        ✴ {caption}
        {home ? (
          <>
            {" · "}
            <Link
              href={home.href}
              className="underline decoration-rule underline-offset-2 hover:decoration-ink"
            >
              {home.label}
            </Link>
          </>
        ) : null}
      </figcaption>
    </figure>
  );
}

export default function PlatesPage() {
  const volumeIds = getVolumeIds();
  const sections: { title: string; chapters: Chapter[] }[] = volumeIds
    .map((id) => {
      const vol = getVolume(id);
      const chapters = getChapters(id).filter(
        (c) => c.status === "published" && c.plates.length > 0
      );
      return { title: vol ? vol.title : id, chapters };
    })
    .filter((s) => s.chapters.length > 0);

  const chapterPlateCount = sections.reduce(
    (n, s) => n + s.chapters.reduce((m, c) => m + c.plates.length, 0),
    0
  );
  const chromeCount = CHROME.reduce((n, g) => n + g.plates.length, 0);

  return (
    <main className="px-5 py-10 sm:px-8 lg:px-14 lg:py-14">
      <article className="mx-auto max-w-4xl">
        <header className="mb-10">
          <p className="flex flex-wrap items-baseline justify-between gap-2 border-b-2 border-ink pb-3 font-mono text-[0.62rem] font-semibold uppercase tracking-[0.2em] text-ink">
            <span>✴ Appendix</span>
            <span>{chapterPlateCount + chromeCount} plates</span>
          </p>
          <h1 className="mt-6 font-sans text-3xl font-bold leading-[1.05] tracking-tight text-ink sm:text-5xl">
            The Plates
          </h1>
          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-ink-soft">
            Every field-guide plate in the publication, gathered in one place.
            Click any plate to open the full-size file, or follow the reference
            to the chapter where it is printed.
          </p>
          <p className="mt-4 border-b border-rule pb-8">
            <a
              href="/sovereign-frontier-plates.zip"
              className="inline-block border border-ink px-4 py-2 font-mono text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-ink shadow-print-sm transition-transform hover:-translate-y-0.5"
            >
              ↓ Download the complete set (.zip)
            </a>
          </p>
        </header>

        <div className="space-y-14">
          {CHROME.map((group) => (
            <section key={group.heading} aria-label={group.heading}>
              <h2 className="border-b-2 border-ink pb-2 font-mono text-sm font-bold text-accent">
                {group.heading}
              </h2>
              <div className="mt-5 grid grid-cols-2 gap-x-5 gap-y-8 sm:grid-cols-3">
                {group.plates.map((p) => (
                  <PlateCard key={p.src} {...p} />
                ))}
              </div>
            </section>
          ))}

          {sections.map((sec) => (
            <section key={sec.title} aria-label={sec.title}>
              <h2 className="border-b-2 border-ink pb-2 font-mono text-sm font-bold text-accent">
                {sec.title}
              </h2>
              <div className="mt-5 space-y-10">
                {sec.chapters.map((c) => (
                  <div key={routeOf(c)}>
                    <h3 className="font-mono text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-ink">
                      {chapterLabel(c.volumeId, c.order)} ·{" "}
                      <Link
                        href={routeOf(c)}
                        className="underline decoration-rule underline-offset-2 hover:decoration-ink"
                      >
                        {c.shortTitle}
                      </Link>
                    </h3>
                    <div className="mt-3 grid grid-cols-2 gap-x-5 gap-y-8 sm:grid-cols-3">
                      {c.plates.map((p) => (
                        <PlateCard
                          key={p.src}
                          src={p.src}
                          caption={p.caption}
                        />
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          ))}
        </div>
      </article>
    </main>
  );
}
