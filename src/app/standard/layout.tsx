import { getNavManifest } from "@/lib/publication";
import { LeftNav, type NavBrand, type NavFooterGroup } from "@/components/LeftNav";
import { MobileHeader } from "@/components/MobileHeader";
import { SearchDialog, SearchTrigger } from "@/components/SearchDialog";

const BRAND: NavBrand = {
  kicker: "✴ Standards · Vol. 04",
  title: "The Frontier Standard",
  href: "/standard",
};

const FOOTER: NavFooterGroup[] = [
  {
    heading: "The library",
    links: [
      { href: "/frontier", label: "The Sovereign Frontier", glyph: "01" },
      { href: "/handbook", label: "The Settlemint Handbook", glyph: "02" },
      { href: "/architecture", label: "The Firma Architecture", glyph: "03" },
      { href: "/frontier/glossary", label: "Glossary", glyph: "✴" },
    ],
  },
];

export default function StandardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const parts = getNavManifest("standard");

  return (
    <div className="min-h-screen">
      <MobileHeader
        parts={parts}
        brand={BRAND}
        footerGroups={FOOTER}
        title="The Frontier Standard"
      />

      <div className="mx-auto flex max-w-[90rem]">
        <aside className="hidden w-72 shrink-0 border-r border-ink/20 bg-paper-deep/40 lg:block">
          <div className="sticky top-0 max-h-screen overflow-y-auto px-6 py-8">
            <SearchTrigger />
            <LeftNav parts={parts} brand={BRAND} footerGroups={FOOTER} />
          </div>
        </aside>

        <div className="min-w-0 flex-1">{children}</div>
      </div>

      <SearchDialog />
    </div>
  );
}
