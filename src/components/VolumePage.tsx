import Link from "next/link";
import { volumeNumber, type Volume } from "@/lib/volumes";

/**
 * Landing page for a reserved (forthcoming) volume of the library.
 * Function, description, and scope come from the Editorial Hub's canon pages.
 */
export function VolumePage({ volume }: { volume: Volume }) {
  return (
    <main className="min-h-screen px-5 py-12 sm:px-8 lg:py-16">
      <article className="mx-auto max-w-2xl">
        <header>
          <p className="flex flex-wrap items-baseline justify-between gap-2 border-b-2 border-ink pb-3 font-mono text-[0.62rem] font-semibold uppercase tracking-[0.2em] text-ink">
            <span>✴ The library · {volume.role}</span>
            <span>Vol. {volumeNumber(volume.number)}</span>
          </p>
          <h1 className="mt-8 font-sans text-4xl font-bold leading-[1.0] tracking-tight text-ink sm:text-6xl">
            {volume.title}
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-ink-soft">
            {volume.description}
          </p>
        </header>

        <div className="shadow-print mt-10 border border-ink bg-white/60 px-6 py-8 text-center">
          <p className="inline-block border border-clay px-2 py-1 font-mono text-[0.62rem] font-semibold uppercase tracking-[0.2em] text-clay">
            Status: forthcoming
          </p>
          <p className="mx-auto mt-3 max-w-md font-serif text-base leading-relaxed text-ink-soft">
            This volume&apos;s drafts are being consolidated into canonical
            chapters in the editorial workspace. It will publish here through
            the same approval discipline as Volume I.
          </p>
        </div>

        {volume.scope.length > 0 && (
          <section aria-label="Planned scope" className="mt-12">
            <h2 className="font-mono text-[0.62rem] font-semibold uppercase tracking-[0.2em] text-ink-faint">
              ✴ Planned scope
            </h2>
            <ul className="mt-4 grid gap-x-8 gap-y-0.5 border-y border-ink py-3 sm:grid-cols-2">
              {volume.scope.map((item) => (
                <li key={item} className="flex gap-2.5 py-1.5">
                  <span
                    aria-hidden
                    className="shrink-0 font-mono text-[0.65rem] leading-[1.8] text-clay"
                  >
                    ✴
                  </span>
                  <span className="font-serif text-base leading-relaxed text-ink">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </section>
        )}

        <footer className="mt-14 border-t-2 border-ink pt-5">
          <Link
            href="/frontier"
            className="shadow-print-sm inline-block border border-ink bg-ink px-6 py-3 font-mono text-[0.7rem] font-semibold uppercase tracking-[0.16em] text-paper transition-colors duration-150 hover:bg-accent"
          >
            ← Vol. 01 · The Sovereign Frontier
          </Link>
        </footer>
      </article>
    </main>
  );
}
