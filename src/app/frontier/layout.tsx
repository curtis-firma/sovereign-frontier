import { getNavManifest } from "@/lib/publication";
import { LeftNav } from "@/components/LeftNav";
import { MobileHeader } from "@/components/MobileHeader";
import { SearchDialog, SearchTrigger } from "@/components/SearchDialog";

/**
 * The unified publication shell. Every /frontier route renders inside this
 * layout: persistent left navigation on desktop, compact header with drawer
 * navigation and reading progress on mobile.
 */
export default function FrontierLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const parts = getNavManifest();

  return (
    <div className="min-h-screen">
      <MobileHeader parts={parts} />

      <div className="mx-auto flex max-w-[90rem]">
        {/* Left publication navigation (desktop) */}
        <aside className="hidden w-72 shrink-0 border-r border-ink/20 bg-paper-deep/40 lg:block">
          <div className="sticky top-0 max-h-screen overflow-y-auto px-6 py-8">
            <SearchTrigger />
            <LeftNav parts={parts} />
          </div>
        </aside>

        <div className="min-w-0 flex-1">{children}</div>
      </div>

      <SearchDialog />
    </div>
  );
}
