import Image from "next/image";
import type { ChapterPlate } from "@/lib/publication";

/**
 * A captioned field-guide plate. `label` is the plate number shown in the
 * caption (e.g. "04.2"). Half-display plates render at reduced width so
 * illustrations can sit inside the text without taking the whole page.
 */
export function PlateFigure({
  plate,
  label,
  priority = false,
}: {
  plate: ChapterPlate;
  label: string;
  priority?: boolean;
}) {
  return (
    <figure
      className={`my-8 ${plate.display === "half" ? "mx-auto sm:max-w-md" : ""}`}
    >
      <div className="shadow-print-sm border border-ink">
        <Image
          src={plate.src}
          alt={plate.alt}
          width={plate.width}
          height={plate.height}
          priority={priority}
          className="block w-full"
        />
      </div>
      <figcaption className="mt-2.5 font-mono text-[0.6rem] font-medium uppercase tracking-[0.16em] text-ink-faint">
        ✴ Plate {label} · {plate.caption}
      </figcaption>
    </figure>
  );
}
