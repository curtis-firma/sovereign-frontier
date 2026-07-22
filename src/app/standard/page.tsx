import type { Metadata } from "next";
import { VolumePage } from "@/components/VolumePage";
import { getChapters } from "@/lib/publication";
import { getVolume } from "@/lib/volumes";

const volume = getVolume("standard")!;

export const metadata: Metadata = {
  title: `${volume.title} — The Library`,
  description: volume.description,
};

const COVERED_SCOPE = [
  "Sovereignty and autonomy vectors",
  "Proof-of-function requirements",
  "Maturity classifications",
];

export default function StandardLanding() {
  return (
    <VolumePage
      volume={volume}
      chapters={getChapters("standard")}
      coveredScope={COVERED_SCOPE}
    />
  );
}
