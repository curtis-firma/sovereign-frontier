/**
 * The library — the four volumes of the publication hub.
 *
 * Volume definitions, functions, and scope come from the Editorial Hub's
 * canon pages ("Web Publication Architecture" and the volume pages). Volume I
 * is complete; the others publish here as their drafts are consolidated into
 * approved canonical chapters.
 */

export interface Volume {
  number: number;
  id: string;
  title: string;
  /** The volume's function, per the Editorial Hub. */
  role: string;
  route: string;
  status: "complete" | "forthcoming";
  description: string;
  scope: string[];
}

export const volumes: Volume[] = [
  {
    number: 1,
    id: "frontier",
    title: "The Sovereign Frontier",
    role: "Concepts",
    route: "/frontier",
    status: "complete",
    description:
      "A field guide to nations, network states, sovereignty, and settlement — from foundational political language to a living Settlemint case study.",
    scope: [],
  },
  {
    number: 2,
    id: "handbook",
    title: "The Settlemint Handbook",
    role: "How",
    route: "/handbook",
    status: "forthcoming",
    description:
      "The operational field manual for designing, establishing, maturing, and operating Settlemints — one module per operating domain, with practical guidance, checklists, examples, and maturity criteria.",
    scope: [
      "Starting a Settlemint",
      "People and covenant",
      "Membership and belonging",
      "Governance and dispute resolution",
      "Land and place",
      "Housing and shared infrastructure",
      "Work, economy, and treasury",
      "Energy and compute",
      "Public goods and contribution",
      "Resilience and continuity",
      "External relationships",
      "Maturity stages and proof tests",
      "ATX implementation case study",
    ],
  },
  {
    number: 3,
    id: "architecture",
    title: "The Firma Architecture",
    role: "Technology",
    route: "/architecture",
    status: "forthcoming",
    description:
      "The emerging Firma technical and institutional architecture — structured like technical documentation, with every component labeled by maturity: concept, proposed, designed, prototyped, deployed, operational, or proven.",
    scope: [
      "Realm",
      "Firmamint",
      "THEOS",
      "Identity and reputation",
      "Governance infrastructure",
      "Compute",
      "Photon and energy systems",
      "Havens and physical infrastructure",
      "Economic coordination",
      "Agentic systems",
      "Settlemint modules",
    ],
  },
  {
    number: 4,
    id: "standard",
    title: "The Frontier Standard",
    role: "Governance and protocols",
    route: "/standard",
    status: "forthcoming",
    description:
      "The shared standards that allow distinct Settlemints and network polities to cooperate without becoming identical or centrally controlled — a standards library with numbered specifications, test criteria, and implementation status.",
    scope: [
      "Membership and identity standards",
      "Governance minimums",
      "Treasury and accountability",
      "Proof-of-function requirements",
      "Sovereignty and autonomy vectors",
      "Reputation portability",
      "Inter-Settlemint agreements",
      "Dispute and appeals protocols",
      "Infrastructure interoperability",
      "Maturity classifications",
      "External recognition and relationships",
    ],
  },
];

export function getVolume(id: string): Volume | undefined {
  return volumes.find((v) => v.id === id);
}

export function volumeNumber(n: number): string {
  return String(n).padStart(2, "0");
}
