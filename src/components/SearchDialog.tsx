"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import type { SearchRecord } from "@/lib/search";

export const OPEN_SEARCH_EVENT = "open-frontier-search";

function escapeRegExp(s: string): string {
  return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

interface Result {
  record: SearchRecord;
  score: number;
}

function searchRecords(records: SearchRecord[], query: string): Result[] {
  const terms = query
    .toLowerCase()
    .split(/\s+/)
    .filter((t) => t.length > 1);
  if (terms.length === 0) return [];

  const results: Result[] = [];
  for (const record of records) {
    const haystack = (record.section + " " + record.text).toLowerCase();
    let score = 0;
    let allMatch = true;
    for (const term of terms) {
      let count = 0;
      let i = haystack.indexOf(term);
      while (i !== -1) {
        count++;
        i = haystack.indexOf(term, i + term.length);
      }
      if (count === 0) {
        allMatch = false;
        break;
      }
      score += count;
      if (record.section.toLowerCase().includes(term)) score += 5;
      if (record.chapterTitle.toLowerCase().includes(term)) score += 3;
    }
    if (allMatch) results.push({ record, score });
  }
  return results.sort((a, b) => b.score - a.score).slice(0, 20);
}

function Snippet({ text, terms }: { text: string; terms: string[] }) {
  const lower = text.toLowerCase();
  let start = 0;
  for (const term of terms) {
    const i = lower.indexOf(term);
    if (i !== -1) {
      start = Math.max(0, i - 60);
      break;
    }
  }
  const slice =
    (start > 0 ? "…" : "") + text.slice(start, start + 180) +
    (start + 180 < text.length ? "…" : "");
  const pattern = new RegExp(`(${terms.map(escapeRegExp).join("|")})`, "gi");
  const parts = slice.split(pattern);
  return (
    <span>
      {parts.map((part, i) =>
        pattern.test(part) ? <mark key={i}>{part}</mark> : part
      )}
    </span>
  );
}

export function SearchDialog() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [index, setIndex] = useState<SearchRecord[] | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const close = useCallback(() => {
    setOpen(false);
    setQuery("");
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((v) => !v);
      } else if (e.key === "Escape") {
        close();
      }
    };
    const onOpen = () => setOpen(true);
    window.addEventListener("keydown", onKey);
    window.addEventListener(OPEN_SEARCH_EVENT, onOpen);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener(OPEN_SEARCH_EVENT, onOpen);
    };
  }, [close]);

  useEffect(() => {
    if (!open) return;
    inputRef.current?.focus();
    if (!index) {
      fetch("/frontier/search-index.json")
        .then((r) => r.json())
        .then(setIndex)
        .catch(() => setIndex([]));
    }
  }, [open, index]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const results = useMemo(
    () => (index && query ? searchRecords(index, query) : []),
    [index, query]
  );
  const terms = query
    .toLowerCase()
    .split(/\s+/)
    .filter((t) => t.length > 1);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center bg-ink/40 px-4 pt-[12vh]"
      onClick={close}
      role="dialog"
      aria-modal="true"
      aria-label="Search the publication"
    >
      <div
        className="shadow-print w-full max-w-xl border border-ink bg-paper"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center gap-3 border-b-2 border-ink px-4">
          <span aria-hidden className="font-mono text-sm text-clay">
            ✴
          </span>
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search the publication…"
            className="w-full bg-transparent py-3.5 font-sans text-base text-ink outline-none placeholder:text-ink-faint"
            aria-label="Search query"
          />
          <button
            type="button"
            onClick={close}
            className="shrink-0 border border-ink/40 px-1.5 py-0.5 font-mono text-[0.6rem] uppercase tracking-wider text-ink-faint hover:border-ink hover:text-ink"
          >
            esc
          </button>
        </div>

        <div className="max-h-[55vh] overflow-y-auto">
          {query && index && results.length === 0 && (
            <p className="px-4 py-6 text-center font-mono text-[0.7rem] uppercase tracking-[0.16em] text-ink-faint">
              No results — the territory is uncharted
            </p>
          )}
          {!query && (
            <p className="px-4 py-6 text-center font-mono text-[0.7rem] uppercase tracking-[0.16em] text-ink-faint">
              Search the whole library
            </p>
          )}
          <ul className="divide-y divide-rule">
            {results.map(({ record }) => (
              <li key={`${record.route}-${record.anchor}`}>
                <Link
                  href={`${record.route}${record.anchor ? `#${record.anchor}` : ""}`}
                  onClick={close}
                  className="block px-4 py-3 transition-colors hover:bg-white/70"
                >
                  <span className="block font-mono text-[0.6rem] font-semibold uppercase tracking-[0.16em] text-ink-faint">
                    {record.label} · {record.chapterTitle}
                  </span>
                  <span className="mt-0.5 block font-sans text-sm font-bold tracking-tight text-ink">
                    {record.section}
                  </span>
                  <span className="mt-0.5 block font-serif text-[0.85rem] leading-snug text-ink-soft">
                    <Snippet text={record.text} terms={terms} />
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export function SearchTrigger({ compact = false }: { compact?: boolean }) {
  const openSearch = () =>
    window.dispatchEvent(new Event(OPEN_SEARCH_EVENT));

  if (compact) {
    return (
      <button
        type="button"
        onClick={openSearch}
        aria-label="Search the publication"
        className="shrink-0 border border-ink bg-paper px-2.5 py-1.5 font-mono text-[0.65rem] font-semibold uppercase tracking-[0.14em] text-ink"
      >
        ⌕
      </button>
    );
  }
  return (
    <button
      type="button"
      onClick={openSearch}
      className="mb-5 flex w-full items-center justify-between border border-ink/40 bg-white/50 px-3 py-2 font-mono text-[0.65rem] font-semibold uppercase tracking-[0.14em] text-ink-soft transition-colors hover:border-ink hover:text-ink"
    >
      <span>⌕ Search</span>
      <span className="text-ink-faint">⌘K</span>
    </button>
  );
}
