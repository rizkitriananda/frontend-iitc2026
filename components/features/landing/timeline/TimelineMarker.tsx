// components/features/landing/timeline/TimelineMarker.tsx
import { memo } from "react";
import { Check } from "lucide-react";
import { TimelineItem } from "./timeline.constants";

interface MarkerProps {
  item: TimelineItem;
  status: "passed" | "active" | "upcoming";
}

export const TimelineMarker = memo(function TimelineMarker({
  item,
  status,
}: MarkerProps) {
  const isPassed = status === "passed";
  const isActive = status === "active";
  const Icon = isPassed ? Check : item.icon;
  const strokeWidth = isPassed || isActive ? 3 : 2.25;

  if (item.markerShape === "filled") {
    const bgClass = isPassed
      ? "bg-[#2F2FE4]"
      : isActive
        ? "bg-[#2F2FE4] border-2 border-white shadow-lg ring-2 ring-[#2F2FE4]/50"
        : "bg-blue-700";

    return (
      <div
        className={`absolute left-6 md:left-1/2 -translate-x-1/2 flex items-center justify-center w-10 h-10 rounded-xl z-10 shadow-md transition-colors duration-300 ${bgClass}`}
      >
        <Icon className="w-4 h-4 text-white" strokeWidth={strokeWidth} />
      </div>
    );
  }

  const shapeClass =
    item.markerShape === "diamond" ? "rounded-lg rotate-45" : "rounded-full";
  const iconRotate = item.markerShape === "diamond" ? "-rotate-45" : "";

  let markerClass = "bg-white border-2 border-slate-200";
  let iconColor = "text-slate-400";

  if (isPassed) {
    markerClass = "bg-[#2F2FE4] border-none";
    iconColor = "text-white";
  } else if (isActive) {
    markerClass =
      "bg-white border-2 border-[#2F2FE4] shadow-[0_0_15px_rgba(47,47,228,0.15)] ring-4 ring-[#2F2FE4]/10";
    iconColor = "text-[#2F2FE4]";
  }

  return (
    <div
      className={`absolute left-6 md:left-1/2 -translate-x-1/2 flex items-center justify-center w-10 h-10 z-10 shadow-sm transition-all duration-300 ${shapeClass} ${markerClass}`}
    >
      <Icon
        className={`w-4 h-4 ${iconRotate} ${iconColor}`}
        strokeWidth={strokeWidth}
      />
    </div>
  );
});
