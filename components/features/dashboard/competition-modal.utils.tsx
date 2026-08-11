import { memo } from "react";
import { LayoutTemplate, PenTool, Bot, Trophy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { Competition } from "@/types/index";

export const SELECTED_COMPETITION_STORAGE_KEY = "selectedCompetitionSlug";
export const RESET_SELECTION_DELAY_MS = 300;

export function renderCategoryIcon(slug: string, className: string) {
  switch (slug) {
    case "web-design":
      return <LayoutTemplate className={className} />;
    case "ui-ux":
    case "ui-ux-design":
      return <PenTool className={className} />;
    case "gen-ai":
    case "gen-ai-video":
      return <Bot className={className} />;
    default:
      return <Trophy className={className} />;
  }
}

export function formatPrice(price: number | null | undefined): string {
  if (!price) return "Gratis";
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(price);
}

interface CompetitionCardProps {
  item: Competition;
  isSelected: boolean;
  onSelect: (item: Competition) => void;
}

export const CompetitionCard = memo(function CompetitionCard({
  item,
  isSelected,
  onSelect,
}: CompetitionCardProps) {
  const badge =
    item.maxMembers <= 1 ? "Individu" : `Tim (maks ${item.maxMembers} org)`;

  const iconElement = renderCategoryIcon(
    item.slug,
    cn(
      "w-12 h-12 relative z-10 transition-transform duration-300",
      isSelected
        ? "text-[#1a0b8c] scale-110"
        : "text-[#2e2be3] group-hover:scale-110",
    ),
  );

  return (
    <div
      onClick={() => onSelect(item)}
      className={cn(
        "flex flex-col bg-white border-2 rounded-2xl overflow-hidden cursor-pointer transition-all duration-200",
        isSelected
          ? "border-[#1a0b8c] shadow-md ring-4 ring-indigo-50"
          : "border-slate-100 hover:border-slate-300 shadow-sm",
      )}
    >
      <div className="h-32 bg-slate-100 flex items-center justify-center relative overflow-hidden group">
        {item.cover ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={item.cover}
            alt={item.name}
            className="w-full h-full object-cover"
            onError={(e) => {
              e.currentTarget.style.display = "none";
            }}
          />
        ) : (
          <>
            <div className="absolute inset-0 opacity-20 bg-[linear-gradient(45deg,transparent_25%,rgba(0,0,0,0.05)_25%,rgba(0,0,0,0.05)_50%,transparent_50%,transparent_75%,rgba(0,0,0,0.05)_75%,rgba(0,0,0,0.05)_100%)] bg-length-[20px_20px]" />
            {iconElement}
          </>
        )}
      </div>

      <div className="p-5 flex flex-col flex-1">
        <div className="flex items-start justify-between gap-2 mb-3">
          <h3 className="text-lg font-bold text-slate-900 leading-tight">
            {item.name}
          </h3>
          <span className="bg-slate-100 text-slate-600 text-[10px] px-2 py-1 rounded-full font-medium whitespace-nowrap">
            {badge}
          </span>
        </div>

        {item.description && (
          <p className="text-sm text-slate-500 leading-relaxed mb-3 flex-1">
            {item.description}
          </p>
        )}

        <p className="text-sm font-semibold text-[#1a0b8c] mb-4">
          {formatPrice(item.competitionPrice)}
        </p>

        <Button
          variant={isSelected ? "default" : "outline"}
          className={cn(
            "w-full font-semibold h-10 mt-auto",
            isSelected
              ? "bg-[#1a0b8c] hover:bg-[#13076b] text-white border-transparent"
              : "border-[#1a0b8c] text-[#1a0b8c] hover:bg-indigo-50",
          )}
        >
          {isSelected ? "Terpilih" : "Pilih Lomba"}
        </Button>
      </div>
    </div>
  );
});
