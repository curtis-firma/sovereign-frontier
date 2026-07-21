import Link from "next/link";
import type { Chapter } from "@/lib/publication";
import { chapterLabel, routeOf } from "@/lib/publication";

export function ChapterPager({
  previous,
  next,
}: {
  previous: Chapter | null;
  next: Chapter | null;
}) {
  return (
    <nav
      aria-label="Chapter navigation"
      className="mt-16 grid gap-5 border-t-2 border-ink pt-6 font-sans sm:grid-cols-2"
    >
      {previous ? (
        <Link
          href={routeOf(previous)}
          className="group border border-ink bg-white/60 p-4 transition-all duration-150 hover:bg-white active:translate-x-px active:translate-y-px"
        >
          <span className="block font-mono text-[0.6rem] font-semibold uppercase tracking-[0.16em] text-ink-faint">
            ← Prev · {chapterLabel(previous.volumeId, previous.order)}
          </span>
          <span className="mt-1.5 block text-base font-bold leading-snug tracking-tight text-ink group-hover:text-accent">
            {previous.title}
          </span>
        </Link>
      ) : (
        <span aria-hidden className="hidden sm:block" />
      )}
      {next ? (
        <Link
          href={routeOf(next)}
          className="group shadow-print-sm border border-ink bg-ink p-4 text-right transition-all duration-150 hover:bg-accent active:translate-x-px active:translate-y-px active:shadow-none"
        >
          <span className="block font-mono text-[0.6rem] font-semibold uppercase tracking-[0.16em] text-paper/70">
            {chapterLabel(next.volumeId, next.order)} · Next →
          </span>
          <span className="mt-1.5 block text-base font-bold leading-snug tracking-tight text-paper">
            {next.title}
          </span>
        </Link>
      ) : (
        <span aria-hidden className="hidden sm:block" />
      )}
    </nav>
  );
}
