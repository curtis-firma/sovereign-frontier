import type { Metadata } from "next";
import { VolumePage } from "@/components/VolumePage";
import { getVolume } from "@/lib/volumes";

const volume = getVolume("handbook")!;

export const metadata: Metadata = {
  title: `${volume.title} — The Library`,
  description: volume.description,
};

export default function HandbookVolumePage() {
  return <VolumePage volume={volume} />;
}
