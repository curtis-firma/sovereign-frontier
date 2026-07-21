"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { NavPart } from "@/lib/publication";

function chapterNumber(order: number): string {
  return String(order).padStart(2, "0");
}

function PendingTag() {
  return (
    <span className="ml-1.5 inline-block translate-y-[-1px] border border-ink-faint/60 px-1 py-px align-middle font-mono text-[0.55rem] uppercase tracking-[0.12em] text-ink-faint">
      soon
    </span>
  );
}

export interface NavBrand {
  kicker: string;
  title: string;
  href: string;
}

export interface NavFooterLink {
  href: string;
  label: string;
  glyph?: string;
  soon?: boolean;
}

export interface NavFooterGroup {
  heading?: string;
  links: NavFooterLink[];
}

const FRONTIER_BRAND: NavBrand = {
  kicker: "✴ Field guide · Vol. 01",
  title: "The Sovereign Frontier",
  href: "/frontier",
};

const FRONTIER_FOOTER: NavFooterGroup[] = [
  { links: [{ href: "/frontier/glossary", label: "Glossary", glyph: "✴" }] },
  {
    heading: "The library",
    links: [
      { href: "/handbook", label: "The Settlemint Handbook", glyph: "02" },
      {
        href: "/architecture",
        label: "The Firma Architecture",
        glyph: "03",
      },
      {
        href: "/standard",
        label: "The Frontier Standard",
        glyph: "04",
        soon: true,
      },
    ],
  },
];

export function LeftNav({
  parts,
  brand = FRONTIER_BRAND,
  footerGroups = FRONTIER_FOOTER,
  onNavigate,
}: {
  parts: NavPart[];
  brand?: NavBrand;
  footerGroups?: NavFooterGroup[];
  onNavigate?: () => void;
}) {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState<Record<number, boolean>>({});

  const togglePart = (n: number) =>
    setCollapsed((prev) => ({ ...prev, [n]: !prev[n] }));

  return (
    <nav aria-label="Chapters" className="font-sans text-sm">
      <Link
        href={brand.href}
        onClick={onNavigate}
        className="group block border-b-2 border-ink pb-4"
      >
        <span className="block font-mono text-[0.6rem] font-medium uppercase tracking-[0.24em] text-ink-faint">
          {brand.kicker}
        </span>
        <span className="mt-1.5 block font-sans text-lg font-bold leading-snug tracking-tight text-ink group-hover:text-accent">
          {brand.title}
        </span>
      </Link>

      <div className="mt-5 space-y-6">
        {parts.map((part) => {
          const isCollapsed = collapsed[part.number] ?? false;
          return (
            <div key={part.number}>
              <button
                type="button"
                onClick={() => togglePart(part.number)}
                aria-expanded={!isCollapsed}
                className="flex w-full items-baseline justify-between gap-2 text-left"
              >
                <span className="font-mono text-[0.62rem] font-semibold uppercase tracking-[0.16em] text-ink">
                  Part {part.numeral} — {part.title}
                </span>
                <span
                  aria-hidden
                  className={`font-mono text-[0.6rem] text-ink-faint transition-transform duration-150 ${
                    isCollapsed ? "" : "rotate-90"
                  }`}
                >
                  ▸
                </span>
              </button>

              {!isCollapsed && (
                <ul className="mt-2 space-y-px border-l border-ink/25">
                  {part.chapters.map((chapter) => {
                    const isActive = pathname === chapter.route;
                    return (
                      <li key={chapter.slug}>
                        <Link
                          href={chapter.route}
                          onClick={onNavigate}
                          aria-current={isActive ? "page" : undefined}
                          className={`-ml-px flex gap-2.5 border-l-2 py-1.5 pl-3 pr-2 leading-snug transition-colors duration-150 ${
                            isActive
                              ? "border-accent bg-white/70 font-medium text-accent"
                              : "border-transparent text-ink-soft hover:border-ink/40 hover:text-ink"
                          }`}
                        >
                          <span
                            className={`shrink-0 font-mono text-[0.65rem] leading-[1.8] ${
                              isActive ? "text-accent" : "text-ink-faint"
                            }`}
                          >
                            {chapterNumber(chapter.order)}
                          </span>
                          <span>
                            {chapter.title}
                            {chapter.status === "pending" && <PendingTag />}
                          </span>
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              )}
            </div>
          );
        })}
      </div>

      {footerGroups.map((group, gi) => (
        <div key={gi} className="mt-6 border-t border-ink/25 pt-4">
          {group.heading && (
            <p className="mb-1 font-mono text-[0.6rem] font-semibold uppercase tracking-[0.18em] text-ink-faint">
              {group.heading}
            </p>
          )}
          {group.links.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={onNavigate}
                aria-current={isActive ? "page" : undefined}
                className={`flex gap-2.5 py-1 leading-snug transition-colors duration-150 ${
                  isActive
                    ? "font-medium text-accent"
                    : "text-ink-soft hover:text-ink"
                }`}
              >
                <span
                  className={`shrink-0 font-mono text-[0.65rem] leading-[1.8] ${
                    link.glyph === "✴" ? "text-clay" : "text-ink-faint"
                  }`}
                >
                  {link.glyph ?? "·"}
                </span>
                <span>
                  {link.label}
                  {link.soon && <PendingTag />}
                </span>
              </Link>
            );
          })}
        </div>
      ))}
    </nav>
  );
}
