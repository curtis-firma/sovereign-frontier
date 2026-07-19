"use client";

import { useEffect, useState } from "react";
import type { TocEntry } from "@/lib/toc";

/**
 * "On this page" navigation, generated from chapter headings.
 * Desktop: a persistent right rail with scroll-spy highlighting.
 * Mobile: a collapsible block above the chapter body.
 */
export function TocNav({ entries }: { entries: TocEntry[] }) {
  const [activeId, setActiveId] = useState<string | null>(null);

  useEffect(() => {
    if (entries.length === 0) return;
    const headings = entries
      .map((e) => document.getElementById(e.id))
      .filter((el): el is HTMLElement => Boolean(el));

    const observer = new IntersectionObserver(
      () => {
        // Choose the last heading above the reading line.
        const line = window.innerHeight * 0.25;
        let current: string | null = null;
        for (const el of headings) {
          if (el.getBoundingClientRect().top <= line) current = el.id;
        }
        setActiveId(current ?? headings[0]?.id ?? null);
      },
      { rootMargin: "-20% 0px -60% 0px", threshold: [0, 1] }
    );

    headings.forEach((el) => observer.observe(el));

    const onScroll = () => {
      const line = window.innerHeight * 0.25;
      let current: string | null = null;
      for (const el of headings) {
        if (el.getBoundingClientRect().top <= line) current = el.id;
      }
      setActiveId(current);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", onScroll);
    };
  }, [entries]);

  if (entries.length === 0) return null;

  return (
    <nav aria-label="On this page" className="font-sans text-[0.8rem]">
      <p className="font-mono text-[0.62rem] font-semibold uppercase tracking-[0.18em] text-ink-faint">
        ✴ On this page
      </p>
      <ul className="mt-3 space-y-0.5 border-l border-ink/25">
        {entries.map((entry) => {
          const isActive = activeId === entry.id;
          return (
            <li key={entry.id}>
              <a
                href={`#${entry.id}`}
                className={`-ml-px block border-l-2 py-1 pr-2 leading-snug transition-colors ${
                  entry.level === 3 ? "pl-6" : "pl-3"
                } ${
                  isActive
                    ? "border-accent text-accent"
                    : "border-transparent text-ink-soft hover:border-ink/40 hover:text-ink"
                }`}
              >
                {entry.text}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

export function MobileToc({ entries }: { entries: TocEntry[] }) {
  const [open, setOpen] = useState(false);

  if (entries.length === 0) return null;

  return (
    <div className="mb-8 border border-ink bg-white/60 font-sans lg:hidden">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="flex w-full items-center justify-between px-4 py-3 font-mono text-[0.65rem] font-semibold uppercase tracking-[0.18em] text-ink"
      >
        On this page
        <span
          aria-hidden
          className={`text-[0.6rem] transition-transform ${open ? "rotate-90" : ""}`}
        >
          ▸
        </span>
      </button>
      {open && (
        <ul className="space-y-0.5 border-t border-ink/25 px-4 py-3 text-[0.85rem]">
          {entries.map((entry) => (
            <li key={entry.id}>
              <a
                href={`#${entry.id}`}
                onClick={() => setOpen(false)}
                className={`block py-1 leading-snug text-ink-soft ${
                  entry.level === 3 ? "pl-4" : ""
                }`}
              >
                {entry.text}
              </a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
