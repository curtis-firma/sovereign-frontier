import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sources & Attribution",
  description:
    "What The Sovereign Frontier cites, what it builds on, and what is original to this publication.",
};

function SourceEntry({
  title,
  detail,
  children,
}: {
  title: string;
  detail: string;
  children: React.ReactNode;
}) {
  return (
    <div className="border-b border-rule pb-6">
      <h3 className="font-sans text-lg font-bold tracking-tight text-ink">
        {title}
      </h3>
      <p className="mt-0.5 font-mono text-[0.62rem] font-semibold uppercase tracking-[0.18em] text-ink-faint">
        {detail}
      </p>
      <div className="mt-3 space-y-3 font-serif text-[1.02rem] leading-relaxed text-ink-soft">
        {children}
      </div>
    </div>
  );
}

export default function SourcesPage() {
  return (
    <main className="px-5 py-10 sm:px-8 lg:px-14 lg:py-14">
      <article className="mx-auto max-w-2xl">
        <header className="mb-10">
          <p className="flex flex-wrap items-baseline justify-between gap-2 border-b-2 border-ink pb-3 font-mono text-[0.62rem] font-semibold uppercase tracking-[0.2em] text-ink">
            <span>✴ Appendix</span>
            <span>Attribution</span>
          </p>
          <h1 className="mt-6 font-sans text-3xl font-bold leading-[1.05] tracking-tight text-ink sm:text-5xl">
            Sources &amp; Attribution
          </h1>
          <p className="mt-4 border-b border-rule pb-8 text-lg leading-relaxed text-ink-soft">
            This guide is deliberate about what it borrows and what it claims.
            External frameworks are presented on their own terms and credited
            here. Everything else — the categories, instruments, and doctrine —
            is original to this publication and its canon.
          </p>
        </header>

        <section aria-label="External sources" className="space-y-6">
          <h2 className="border-b-2 border-ink pb-2 font-mono text-sm font-bold text-accent">
            External frameworks the guide presents
          </h2>

          <SourceEntry
            title="The network state framework"
            detail="Balaji Srinivasan · The Network State · 2022 · thenetworkstate.com"
          >
            <p>
              The one-sentence network state definition, the fuller canonical
              definition, and the four-stage progression — startup society →
              network union → network archipelago → network state — presented in{" "}
              <Link href="/frontier/network-state" className="underline decoration-rule underline-offset-4 hover:decoration-ink">
                Chapter 02
              </Link>{" "}
              and{" "}
              <Link href="/frontier/progression" className="underline decoration-rule underline-offset-4 hover:decoration-ink">
                Chapter 06
              </Link>{" "}
              are the original formulation from this work, including the
              concepts of moral innovation, national consciousness, the
              recognized founder, and the on-chain census. Where the guide
              extends or departs from that formulation — the broader threshold
              set, the network polity category, the two-axis maturity model —
              the departure is stated in the chapter text rather than blended
              in silently.
            </p>
          </SourceEntry>

          <SourceEntry
            title="The classical statehood criteria"
            detail="Montevideo Convention on the Rights and Duties of States · 1933 · Article 1"
          >
            <p>
              The four criteria that anchor serious statehood discussion — a
              permanent population, a defined territory, government, and the
              capacity to enter into relations with other states — derive from
              the Montevideo Convention, and inform the treatment of statehood
              in{" "}
              <Link href="/frontier/foundations" className="underline decoration-rule underline-offset-4 hover:decoration-ink">
                Chapter 01
              </Link>{" "}
              and sovereignty in{" "}
              <Link href="/frontier/sovereignty" className="underline decoration-rule underline-offset-4 hover:decoration-ink">
                Chapter 03
              </Link>
              . The guide treats these as influential rather than final: as
              Chapter 01 notes, recognition, effective control, independence,
              and legitimacy still matter in practice, and legal traditions
              weigh them differently.
            </p>
          </SourceEntry>

          <SourceEntry
            title="General political vocabulary"
            detail="Common ground of political theory and international law"
          >
            <p>
              The working definitions of nation, state, country, government,
              polity, autonomy, jurisdiction, and recognition in Chapter 01
              state common ground rather than one scholar&apos;s system, and the
              chapters flag where scholars genuinely disagree. A fuller
              scholarly source pass — direct citations for contested
              definitions — remains on the editorial backlog and will be added
              to this page as it lands.
            </p>
          </SourceEntry>
        </section>

        <section aria-label="Original to this publication" className="mt-12 space-y-6">
          <h2 className="border-b-2 border-ink pb-2 font-mono text-sm font-bold text-accent">
            Original to this publication
          </h2>
          <div className="space-y-3 font-serif text-[1.02rem] leading-relaxed text-ink-soft">
            <p>
              The following categories, instruments, and formulations are
              original to The Sovereign Frontier and the Firma canon it
              publishes. They are working doctrine — held provisionally, and
              amended only explicitly:
            </p>
            <ul className="list-disc space-y-1.5 pl-5">
              <li>
                <strong>Settlemint</strong> — the settlement-maturity category,
                and the distinction between political emergence and settlement
                maturity (Chapters 04–07).
              </li>
              <li>
                <strong>Realm, District, Constellation</strong> — as used in the
                architecture of place (Chapter 07).
              </li>
              <li>
                <strong>The proof discipline</strong> — claim / signal /
                evidence / repetition / reliability / institution, the proof
                matrix, and the evidence ledger (Chapter 05, Standard ST-02).
              </li>
              <li>
                <strong>The Authority and Autonomy Profile</strong> and the
                language ladder — capacity → control → autonomy → authority →
                jurisdiction → sovereignty (Chapter 03, Standard ST-01).
              </li>
              <li>
                <strong>The frontier and the reach</strong>, sovereign
                infrastructure, and the edge thesis (Chapter 08).
              </li>
              <li>
                <strong>Firmamint, the Settlemint Stack, and the named
                protocols</strong> — the proposed Firma architecture, always
                marked by maturity status (Volume III).
              </li>
            </ul>
            <p>
              All plates and illustrations are original works in the ATX
              Settlemint design treatment, created for this publication.
            </p>
          </div>
        </section>

        <section aria-label="Editorial policy" className="mt-12 space-y-6">
          <h2 className="border-b-2 border-ink pb-2 font-mono text-sm font-bold text-accent">
            The editorial rule
          </h2>
          <div className="space-y-3 font-serif text-[1.02rem] leading-relaxed text-ink-soft">
            <p>
              Chapter text is imported from the publication&apos;s editorial
              canon through a controlled pipeline — nothing publishes without
              review, and doctrine is never rewritten in transit. External
              frameworks are represented accurately on their own terms before
              the guide responds to them. Proposed systems are labeled
              proposed. Where evidence is thin, the text says so.
            </p>
            <p className="font-mono text-[0.72rem] uppercase tracking-[0.14em] text-ink-faint">
              Function is canonical. Implementation is provisional.
            </p>
          </div>
        </section>
      </article>
    </main>
  );
}
