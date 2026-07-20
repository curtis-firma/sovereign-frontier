/**
 * The working vocabulary of The Sovereign Frontier.
 *
 * Every definition is quoted verbatim from the published chapters — the
 * glossary gathers canon; it does not restate it. `source` is the chapter
 * slug; `anchor` deep-links to the section where the term is defined.
 */

export interface GlossaryEntry {
  term: string;
  definition: string;
  source: string;
  anchor?: string;
}

export const glossary: GlossaryEntry[] = [
  {
    term: "Abundance",
    definition: "Abundance is durable access to increasing useful capacity.",
    source: "edges",
    anchor: "a-precise-definition-of-abundance",
  },
  {
    term: "ATX",
    definition:
      "ATX is a genesis Settlemint in formation in Austin, Texas — a real place where the framework must prove itself through lived human function.",
    source: "atx",
  },
  {
    term: "Audience",
    definition:
      "An audience pays attention. The relationship is mainly between the audience and a central voice, brand, or platform.",
    source: "progression",
    anchor: "audience",
  },
  {
    term: "Authority",
    definition:
      "Authority is the recognized right to make decisions, issue rules, or direct action.",
    source: "sovereignty",
    anchor: "authority",
  },
  {
    term: "Authority and Autonomy Profile",
    definition:
      "A ten-question profile — capacity, control, authority, jurisdiction, dependence, recognition, legitimacy, continuity, exit and appeal, ultimate authority — that shows the real shape of authority and dependence rather than one slogan.",
    source: "sovereignty",
    anchor: "the-authority-and-autonomy-profile",
  },
  {
    term: "Autonomy",
    definition:
      "Autonomy is the ability to govern or operate within a limited domain while remaining subject to a higher authority.",
    source: "sovereignty",
    anchor: "autonomy",
  },
  {
    term: "Capacity",
    definition: "Capacity is the practical ability to perform a function.",
    source: "sovereignty",
    anchor: "capacity",
  },
  {
    term: "Claim",
    definition:
      "A statement about what something is, intends to become, or believes itself to be. A claim may be sincere and important. It is not yet proof.",
    source: "proof",
    anchor: "claim",
  },
  {
    term: "Community",
    definition:
      "A community forms recurring relationships. Members interact with one another, not only with the founder.",
    source: "progression",
    anchor: "community",
  },
  {
    term: "Constellation",
    definition:
      "A Constellation is a voluntary higher-order network of distinct polities that remain politically themselves while coordinating selected capabilities, infrastructure, standards, and reciprocal commitments.",
    source: "architecture-of-place",
    anchor: "constellation-distinct-polities-shared-capacity",
  },
  {
    term: "Control",
    definition:
      "Control is the practical ability to direct, operate, or exclude others from a resource or system.",
    source: "sovereignty",
    anchor: "control",
  },
  {
    term: "Country",
    definition:
      "Country is the everyday word for the territorial and political whole.",
    source: "foundations",
    anchor: "country",
  },
  {
    term: "District",
    definition:
      "A District is a constituent city or city-like polity capable of governing meaningful domains of common life while belonging to a larger political nation.",
    source: "architecture-of-place",
    anchor: "district-the-constituent-city-polity",
  },
  {
    term: "Evidence",
    definition: "A concrete fact that supports a claim.",
    source: "proof",
    anchor: "evidence",
  },
  {
    term: "Firmamint",
    definition:
      "Firmamint is the proposed shared substrate through which distinct people, Realms, Settlemints, Districts, and political communities may coordinate, remember, exchange, compute, prove, and interoperate.",
    source: "firma",
    anchor: "firmamint",
  },
  {
    term: "The frontier",
    definition:
      "The frontier — people operating past where systems were designed to operate.",
    source: "edges",
    anchor: "the-frontier",
  },
  {
    term: "Government",
    definition:
      "Government is the machinery through which political decisions are made and carried out.",
    source: "foundations",
    anchor: "government",
  },
  {
    term: "Jurisdiction",
    definition:
      "Jurisdiction is lawful authority over a particular person, place, subject, or dispute.",
    source: "sovereignty",
    anchor: "jurisdiction",
  },
  {
    term: "Jurisdictional autonomy",
    definition:
      "Jurisdictional autonomy is lawful self-rule inside another sovereign order.",
    source: "sovereignty",
    anchor: "jurisdictional-autonomy",
  },
  {
    term: "Legitimacy",
    definition:
      "Legitimacy is the belief that an authority has the right to rule or decide.",
    source: "sovereignty",
    anchor: "legitimacy",
  },
  {
    term: "Nation",
    definition:
      "A nation is a people who understand themselves as a people.",
    source: "foundations",
    anchor: "nation",
  },
  {
    term: "Nation of Heaven",
    definition:
      "The Nation of Heaven is the explicitly covenantal network-state project. Its common life is intended to be shaped by Orthodox Christianity, covenantal belonging, worship, formation, and shared political purpose.",
    source: "firma",
    anchor: "nation-of-heaven",
  },
  {
    term: "Nation-state",
    definition:
      "A nation-state is a state in which a national people and a sovereign political structure substantially coincide.",
    source: "foundations",
    anchor: "nation-state",
  },
  {
    term: "Network polity",
    definition:
      "A network polity is a digitally coordinated political community with meaningful membership, governance, collective action, and shared institutions.",
    source: "network-state",
    anchor: "network-state-versus-network-polity",
  },
  {
    term: "Network state",
    definition:
      "A highly aligned online community with a capacity for collective action that crowdfunds territory around the world and eventually gains diplomatic recognition from pre-existing states.",
    source: "network-state",
    anchor: "the-original-formulation",
  },
  {
    term: "Network union",
    definition:
      "A network union is a distributed community with demonstrated collective action.",
    source: "progression",
    anchor: "network-union",
  },
  {
    term: "Operational autonomy",
    definition:
      "Operational autonomy is the practical ability to sustain or govern a function without total dependence on outside systems.",
    source: "sovereignty",
    anchor: "operational-autonomy",
  },
  {
    term: "People",
    definition:
      'A people understands itself as a "we." Members develop shared memory, identity, duty, covenant, culture, history, and future orientation.',
    source: "progression",
    anchor: "people",
  },
  {
    term: "Personal sovereignty",
    definition:
      "Personal sovereignty describes the degree to which a person can exercise meaningful agency and stewardship over their life, identity, property, tools, data, relationships, and participation.",
    source: "sovereignty",
    anchor: "personal-sovereignty",
  },
  {
    term: "Physical settlement network",
    definition:
      "A physical settlement network exists when the polity has durable embodied life across one or more real places.",
    source: "progression",
    anchor: "physical-settlement-network",
  },
  {
    term: "Polity",
    definition:
      "A polity is a people or community organized under some form of governance.",
    source: "foundations",
    anchor: "polity",
  },
  {
    term: "Proof",
    definition:
      "Repeated evidence strong enough to justify the claim being made.",
    source: "proof",
    anchor: "proof",
  },
  {
    term: "The proof ladder",
    definition:
      "Claim → Signal → Evidence → Repetition → Reliability → Institution. Civilization becomes credible when critical functions move from claim to institution.",
    source: "proof",
    anchor: "the-proof-ladder",
  },
  {
    term: "The reach",
    definition:
      "The reach — people living past where systems were designed to reach.",
    source: "edges",
    anchor: "the-reach",
  },
  {
    term: "Realm",
    definition:
      "A Realm is the living personal edge domain through which a person or household participates in the greater network.",
    source: "architecture-of-place",
    anchor: "realm-the-personal-edge",
  },
  {
    term: "Recognition",
    definition:
      "Recognition is when an outside actor acknowledges that an entity possesses a particular status.",
    source: "sovereignty",
    anchor: "recognition",
  },
  {
    term: "Settlemint",
    definition:
      "A Settlemint is a human settlement whose essential systems are integrated enough for people to live, build, govern, exchange, produce, coordinate, and belong with increasing operational autonomy.",
    source: "settlemints",
  },
  {
    term: "Signal",
    definition:
      "An observable indication that a capability, identity, or institution may be emerging.",
    source: "proof",
    anchor: "signal",
  },
  {
    term: "Sovereign infrastructure",
    definition:
      "Sovereign infrastructure increases the ability of people or communities to control, govern, replace, interoperate with, or survive the failure of systems critical to their lives.",
    source: "edges",
    anchor: "sovereign-infrastructure",
  },
  {
    term: "Sovereign state",
    definition:
      "A sovereign state possesses ultimate governing authority over a population and territory and functions independently in international relations.",
    source: "progression",
    anchor: "sovereign-state",
  },
  {
    term: "Sovereignty",
    definition:
      "Sovereignty is the highest governing authority within a political order.",
    source: "sovereignty",
  },
  {
    term: "Startup society",
    definition:
      "A startup society deliberately organizes around a binding principle and the intent to build a different social order.",
    source: "progression",
    anchor: "startup-society",
  },
  {
    term: "State",
    definition:
      "A state is an enduring political structure that exercises governing authority over a population and territory.",
    source: "foundations",
    anchor: "state",
  },
  {
    term: "Testamint",
    definition:
      "Testamint concerns faith, covenant, witness, formation, inheritance, and continuity across generations. Testamint is specific to covenantal formation; Settlemint is the broader settlement category.",
    source: "firma",
    anchor: "testamint",
  },
];

/** Entries sorted alphabetically, ignoring a leading "The ". */
export function getGlossary(): GlossaryEntry[] {
  return [...glossary].sort((a, b) =>
    a.term.replace(/^The /, "").localeCompare(b.term.replace(/^The /, ""))
  );
}
