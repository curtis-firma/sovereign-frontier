import type { Metadata } from "next";
import { VolumePage } from "@/components/VolumePage";
import { getChapters } from "@/lib/publication";
import { getVolume } from "@/lib/volumes";

const volume = getVolume("architecture")!;

export const metadata: Metadata = {
  title: `${volume.title} — The Library`,
  description: volume.description,
};

const COVERED_SCOPE = ["Realm", "Firmamint"];

export default function ArchitectureLanding() {
  return (
    <VolumePage
      volume={volume}
      chapters={getChapters("architecture")}
      coveredScope={COVERED_SCOPE}
    />
  );
}
