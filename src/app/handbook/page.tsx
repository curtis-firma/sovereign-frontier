import type { Metadata } from "next";
import { VolumePage } from "@/components/VolumePage";
import { getChapters } from "@/lib/publication";
import { getVolume } from "@/lib/volumes";

const volume = getVolume("handbook")!;

export const metadata: Metadata = {
  title: `${volume.title} — The Library`,
  description: volume.description,
};

const COVERED_SCOPE = [
  "Membership and belonging",
  "Governance and dispute resolution",
  "Maturity stages and proof tests",
];

export default function HandbookLanding() {
  return (
    <VolumePage
      volume={volume}
      chapters={getChapters("handbook")}
      coveredScope={COVERED_SCOPE}
    />
  );
}
