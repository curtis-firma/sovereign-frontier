import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-screen items-center justify-center px-5">
      <div className="max-w-md text-center">
        <p className="inline-block border border-clay px-2 py-1 font-mono text-[0.62rem] font-semibold uppercase tracking-[0.2em] text-clay">
          404 · Uncharted
        </p>
        <h1 className="mt-4 font-sans text-3xl font-bold tracking-tight text-ink">
          This page is off the map.
        </h1>
        <p className="mt-3 text-base leading-relaxed text-ink-soft">
          The territory you are looking for has not been settled.
        </p>
        <Link
          href="/frontier"
          className="shadow-print-sm mt-6 inline-block border border-ink bg-ink px-6 py-3 font-mono text-[0.7rem] font-semibold uppercase tracking-[0.16em] text-paper transition-colors duration-150 hover:bg-accent"
        >
          ← Return to the guide
        </Link>
      </div>
    </main>
  );
}
