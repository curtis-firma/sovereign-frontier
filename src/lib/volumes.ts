/**
 * The library — the volumes of the field guide.
 *
 * Volume I is complete. Volumes II and III are reserved: the published
 * chapters explicitly assign open questions to them, and their scope below
 * quotes those assignments. Their canon will be written in the editorial
 * workspace and imported through the same controlled pipeline as Volume I.
 */

export interface VolumeScopeItem {
  item: string;
  /** Chapter slug that assigns this question to the volume. */
  source: string;
}

export interface Volume {
  number: number;
  id: string;
  title: string;
  route: string;
  status: "complete" | "forthcoming";
  description: string;
  scope: VolumeScopeItem[];
}

export const volumes: Volume[] = [
  {
    number: 1,
    id: "frontier",
    title: "The Sovereign Frontier",
    route: "/frontier",
    status: "complete",
    description:
      "A field guide to nations, network states, sovereignty, and settlement — from foundational political language to a living Settlemint case study.",
    scope: [],
  },
  {
    number: 2,
    id: "standard",
    title: "The Frontier Standard",
    route: "/standard",
    status: "forthcoming",
    description:
      "The testable standard beneath the field guide — where provisional thresholds become maturity models that can be measured, and categories are earned rather than declared.",
    scope: [
      {
        item: "A testable maturity standard for the minimum viable Settlemint — what “integrated enough” means",
        source: "settlemints",
      },
      {
        item: "The working transition thresholds from audience to sovereign state, tested against real projects",
        source: "progression",
      },
      {
        item: "The final legal and political meaning of a District, and the division of authority between District and Nation",
        source: "architecture-of-place",
      },
      {
        item: "Membership, representation, entry, and exit",
        source: "architecture-of-place",
      },
      {
        item: "The final definition — and name — of Constellation",
        source: "architecture-of-place",
      },
      {
        item: "Which functions should remain local or become shared, and how shared infrastructure avoids political capture",
        source: "architecture-of-place",
      },
      {
        item: "Evidence-ledger fields and domain-specific metrics for Settlemints",
        source: "proof",
      },
    ],
  },
  {
    number: 3,
    id: "architecture",
    title: "The Firma Architecture",
    route: "/architecture",
    status: "forthcoming",
    description:
      "The technical implementation volume — the systems beneath the civil architecture, kept deliberately out of the conceptual guide until their definitions are earned.",
    scope: [
      {
        item: "The exact Firmamint protocol, chain, governance, economic model, and deployment status",
        source: "firma",
      },
      {
        item: "The technical role of Firmamint across the civil layers",
        source: "architecture-of-place",
      },
      {
        item: "Proprietary technical implementation of the Realm, Settlemint, District, and Constellation relationship",
        source: "architecture-of-place",
      },
      {
        item: "Application implementations — Realm products, Haven, Photon, Governmint, Figmint, Testamint — classified as proposed, prototype, pilot, or deployed",
        source: "firma",
      },
    ],
  },
];

export function getVolume(id: string): Volume | undefined {
  return volumes.find((v) => v.id === id);
}

export function volumeNumber(n: number): string {
  return String(n).padStart(2, "0");
}
