"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { NavPart } from "@/lib/publication";
import { LeftNav, type NavBrand, type NavFooterGroup } from "./LeftNav";
import { SearchTrigger } from "./SearchDialog";

/**
 * Compact persistent header for small screens: publication title, a reading
 * progress bar, and a drawer containing the complete chapter navigation.
 */
export function MobileHeader({
  parts,
  brand,
  footerGroups,
  title = "The Sovereign Frontier",
}: {
  parts: NavPart[];
  brand?: NavBrand;
  footerGroups?: NavFooterGroup[];
  title?: string;
}) {
  const [open, setOpen] = useState(false);
  const [progress, setProgress] = useState(0);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => {
      const doc = document.documentElement;
      const total = doc.scrollHeight - window.innerHeight;
      setProgress(total > 0 ? Math.min(1, window.scrollY / total) : 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header className="sticky top-0 z-40 border-b border-ink bg-paper lg:hidden">
      <div className="flex h-13 items-center gap-2 px-4">
        <Link href={brand?.href ?? "/frontier"} className="min-w-0 flex-1">
          <span className="block truncate font-sans text-base font-bold tracking-tight text-ink">
            {title}
          </span>
        </Link>
        <SearchTrigger compact />
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-label={open ? "Close chapter navigation" : "Open chapter navigation"}
          className={`shrink-0 border px-3 py-1.5 font-mono text-[0.65rem] font-semibold uppercase tracking-[0.14em] transition-colors duration-150 ${
            open
              ? "border-ink bg-ink text-paper"
              : "border-ink bg-paper text-ink"
          }`}
        >
          {open ? "Close" : "Chapters"}
        </button>
      </div>

      {/* Reading progress indicator */}
      <div className="h-1 w-full bg-paper-edge">
        <div
          className="h-full bg-accent transition-[width] duration-100 ease-out"
          style={{ width: `${progress * 100}%` }}
        />
      </div>

      {open && (
        <div className="fixed inset-x-0 top-[3.5rem] bottom-0 z-40 overflow-y-auto border-t border-ink bg-paper px-5 py-6">
          <LeftNav
            parts={parts}
            brand={brand}
            footerGroups={footerGroups}
            onNavigate={() => setOpen(false)}
          />
        </div>
      )}
    </header>
  );
}
