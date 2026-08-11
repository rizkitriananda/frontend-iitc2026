import Image from "next/image";
import { Image as ImageIcon } from "lucide-react";
import type { Sponsor } from "@/types/index";

interface SponsorTileProps {
  sponsor: Sponsor;
  aspect?: string;
}

export default function SponsorTile({
  sponsor,
  aspect = "aspect-video",
}: SponsorTileProps) {
  return (
    <div
      className={`group relative flex items-center justify-center rounded-xl border border-slate-200 bg-white p-4 transition-all hover:-translate-y-0.5 hover:shadow-md hover:border-[#2F2FE4]/30 ${aspect}`}
    >
      {sponsor.image ? (
        <Image
          src={sponsor.image}
          alt={sponsor.name}
          fill
          className="object-contain p-4 grayscale opacity-70 transition-all duration-300 group-hover:grayscale-0 group-hover:opacity-100"
          sizes="(max-width: 768px) 33vw, 200px"
        />
      ) : (
        <div className="flex flex-col items-center text-slate-300">
          <ImageIcon className="w-6 h-6 mb-1 group-hover:text-[#2F2FE4]/50 transition-colors" />
          <span className="text-xs font-medium truncate max-w-full">
            {sponsor.name}
          </span>
        </div>
      )}
    </div>
  );
}
