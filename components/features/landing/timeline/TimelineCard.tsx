// components/features/landing/timeline/TimelineCard.tsx
import { memo } from "react";
import { motion, type Variants } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { BADGE_STYLES, TimelineItem } from "./timeline.constants";
import { getTimelineStatus } from "./timeline.utils";
import { TimelineMarker } from "./TimelineMarker";

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: (delay: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, delay, ease: "easeOut" },
  }),
  exit: {
    opacity: 0,
    y: -10,
    transition: { duration: 0.25, ease: "easeInOut" },
  },
};

interface TimelineCardProps {
  item: TimelineItem;
  index: number;
  isNew: boolean;
}

export const TimelineCard = memo(function TimelineCard({
  item,
  index,
  isNew,
}: TimelineCardProps) {
  const status = getTimelineStatus(item.date);
  const isPassed = status === "passed";
  const isActive = status === "active";
  const isLeft = item.align === "left";
  const isFilled = item.markerShape === "filled";

  const containerCls = `relative flex flex-col md:flex-row items-start md:items-center ${isLeft ? "md:flex-row-reverse" : ""}`;
  const wrapperCls = `w-full md:w-1/2 pl-16 md:pl-0 flex ${isLeft ? "md:pr-12 justify-start md:justify-end" : "md:pl-12 justify-start"}`;

  const cardShapeCls = isLeft
    ? "md:rounded-tl-md md:rounded-tr-3xl md:rounded-br-md md:rounded-bl-3xl"
    : "";
  const cardStateCls = isFilled
    ? "bg-[#2F2FE4] border-none shadow-lg"
    : isActive
      ? "border-[#2F2FE4] bg-[#f8faff] shadow-md ring-1 ring-[#2F2FE4]/20"
      : isPassed
        ? "border-blue-200 bg-blue-50/20"
        : "border-slate-200";

  const contentAlignCls = isLeft
    ? "items-start text-left md:items-end md:text-right"
    : "items-start text-left";

  const titleCls = `font-bold text-lg transition-colors ${isFilled ? "text-white" : isActive ? "text-[#2F2FE4]" : "text-slate-900"}`;
  const subtitleCls = `text-[0.85rem] font-medium mt-0.5 mb-2 ${isFilled ? "text-blue-100" : isActive ? "text-[#2F2FE4]" : "text-blue-600"}`;
  const descCls = `text-[0.85rem] leading-snug mb-4 ${isFilled ? "text-white/90" : "text-slate-600"}`;

  const badgeShapeCls = isLeft
    ? "md:rounded-tl-2xl md:rounded-tr-none md:rounded-br-2xl md:rounded-bl-none"
    : "";
  const badgeStateCls = isActive
    ? "border border-[#2F2FE4] bg-[#2F2FE4] text-white shadow-sm"
    : isPassed
      ? "border border-blue-200 bg-blue-50 text-blue-600"
      : BADGE_STYLES[item.badgeVariant];

  return (
    <motion.div
      layout
      custom={isNew ? index * 0.06 : 0}
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className={containerCls}
    >
      <div className="hidden md:block md:w-1/2"></div>
      <TimelineMarker item={item} status={status} />

      <div className={wrapperCls}>
        <Card
          className={`w-full max-w-85 shadow-sm hover:shadow-md transition-all duration-300 rounded-tl-3xl rounded-tr-md rounded-br-3xl rounded-bl-md ${cardShapeCls} ${cardStateCls}`}
        >
          <CardContent
            className={`p-5 md:p-6 flex flex-col ${contentAlignCls}`}
          >
            <h3 className={titleCls}>{item.title}</h3>
            <p className={subtitleCls}>{item.subtitle}</p>
            <p className={descCls}>{item.description}</p>
            <span
              className={`inline-flex items-center justify-center gap-1.5 text-[0.7rem] font-semibold px-4 py-2 rounded-tl-none rounded-tr-2xl rounded-br-none rounded-bl-2xl transition-all duration-300 ${badgeShapeCls} ${badgeStateCls}`}
            >
              {item.date}
            </span>
          </CardContent>
        </Card>
      </div>
    </motion.div>
  );
});
