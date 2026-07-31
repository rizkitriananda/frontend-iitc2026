"use client";
import { memo, useCallback, useMemo, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { AnimatePresence, motion, type Variants } from "framer-motion";
import {
  ClipboardCheck,
  ShieldCheck,
  Presentation,
  FileText,
  Gavel,
  Megaphone,
  Trophy,
  ChevronDown,
  LucideIcon,
} from "lucide-react";

type MarkerShape = "diamond" | "circle" | "filled";
type BadgeVariant = "blue" | "orange" | "white";

interface TimelineItem {
  id: string;
  title: string;
  subtitle: string;
  date: string;
  icon: LucideIcon;
  markerShape: MarkerShape;
  badgeVariant: BadgeVariant;
  align: "left" | "right";
}

const TIMELINE_DATA: TimelineItem[] = [
  {
    id: "01",
    title: "Pendaftaran",
    subtitle: "Gelombang 1",
    date: "03 Agt - 15 Agt 2026",
    icon: ClipboardCheck,
    markerShape: "diamond",
    badgeVariant: "blue",
    align: "left",
  },
  {
    id: "02",
    title: "Pendaftaran",
    subtitle: "Gelombang 2",
    date: "16 Agt - 22 Agt 2026",
    icon: ClipboardCheck,
    markerShape: "circle",
    badgeVariant: "orange",
    align: "right",
  },
  {
    id: "03",
    title: "Technical Meeting",
    subtitle: "Technical Meeting Peserta",
    date: "19 Agustus 2026",
    icon: ShieldCheck,
    markerShape: "diamond",
    badgeVariant: "blue",
    align: "left",
  },
  {
    id: "04",
    title: "Pendaftaran Seminar",
    subtitle: "Seminar Nasional",
    date: "25 Agustus 2026",
    icon: Presentation,
    markerShape: "circle",
    badgeVariant: "orange",
    align: "right",
  },
  {
    id: "05",
    title: "Pengumpulan Karya",
    subtitle: "Online Submission",
    date: "19 Agt - 27 Agt 2026",
    icon: FileText,
    markerShape: "diamond",
    badgeVariant: "blue",
    align: "left",
  },
  {
    id: "06",
    title: "Penjurian",
    subtitle: "Proses Penilaian",
    date: "28 Agt - 03 Sept 2026",
    icon: Gavel,
    markerShape: "circle",
    badgeVariant: "orange",
    align: "right",
  },
  {
    id: "07",
    title: "Pengumuman Finalis",
    subtitle: "Top 3 Finalis",
    date: "07 Sept 2026",
    icon: Megaphone,
    markerShape: "diamond",
    badgeVariant: "blue",
    align: "left",
  },
  {
    id: "08",
    title: "Technical Meeting",
    subtitle: "Finalis Terpilih",
    date: "08 Sept 2026",
    icon: ShieldCheck,
    markerShape: "circle",
    badgeVariant: "orange",
    align: "right",
  },
  {
    id: "09",
    title: "Seminar & Awarding",
    subtitle: "Penghargaan Offline & Penutupan",
    date: "12 Sept 2026",
    icon: Trophy,
    markerShape: "filled",
    badgeVariant: "white",
    align: "left",
  },
];

const INITIAL_VISIBLE_COUNT = 3;

const BADGE_STYLES: Record<BadgeVariant, string> = {
  blue: "border border-blue-200 bg-blue-50 text-blue-700",
  orange: "border border-orange-200 bg-orange-50 text-orange-600",
  white: "bg-white text-blue-700",
};

const MARKER_SHAPE_CLASS: Record<MarkerShape, string> = {
  diamond: "rounded-lg rotate-45",
  circle: "rounded-full",
  filled: "",
};

// React.memo mencegah Marker re-render kalau item-nya tidak berubah
const Marker = memo(function Marker({ item }: { item: TimelineItem }) {
  const Icon = item.icon;

  if (item.markerShape === "filled") {
    return (
      <div className="absolute left-6 md:left-1/2 -translate-x-1/2 flex items-center justify-center w-10 h-10 bg-blue-700 rounded-xl z-10 shadow-md">
        <Icon className="w-4 h-4 text-white" strokeWidth={2.25} />
      </div>
    );
  }

  const iconRotate = item.markerShape === "diamond" ? "-rotate-45" : "";

  return (
    <div
      className={`absolute left-6 md:left-1/2 -translate-x-1/2 flex items-center justify-center w-10 h-10 bg-white border-2 border-slate-200 z-10 shadow-sm ${MARKER_SHAPE_CLASS[item.markerShape]}`}
    >
      <Icon
        className={`w-4 h-4 text-slate-600 ${iconRotate}`}
        strokeWidth={2.25}
      />
    </div>
  );
});

// close terasa semulus open (tidak "antre" satu-satu menunggu delay lama).
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

// React.memo pada card mencegah item lama ikut re-render saat showAll berubah
const TimelineCard = memo(function TimelineCard({
  item,
  index,
  isNew,
}: {
  item: TimelineItem;
  index: number;
  isNew: boolean;
}) {
  return (
    <motion.div
      layout
      custom={isNew ? index * 0.06 : 0}
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className={`relative flex flex-col md:flex-row items-start md:items-center ${
        item.align === "left" ? "md:flex-row-reverse" : ""
      }`}
    >
      <div className="hidden md:block md:w-1/2"></div>

      <Marker item={item} />

      <div
        className={`w-full md:w-1/2 pl-16 md:pl-0 ${
          item.align === "left" ? "md:pr-12" : "md:pl-12"
        }`}
      >
        <Card
          className={`shadow-sm hover:shadow-md transition-shadow rounded-2xl ${
            item.markerShape === "filled"
              ? "bg-blue-700 border-none shadow-lg"
              : "border-slate-200"
          }`}
        >
          <CardContent className="p-6">
            <h3
              className={`font-bold text-lg ${
                item.markerShape === "filled" ? "text-white" : "text-slate-900"
              }`}
            >
              {item.title}
            </h3>
            <p
              className={`text-sm mt-0.5 mb-3 ${
                item.markerShape === "filled"
                  ? "text-blue-100"
                  : "text-slate-500"
              }`}
            >
              {item.subtitle}
            </p>
            <span
              className={`inline-block text-xs font-semibold px-3 py-1 rounded-md ${BADGE_STYLES[item.badgeVariant]}`}
            >
              {item.date}
            </span>
          </CardContent>
        </Card>
      </div>
    </motion.div>
  );
});

export default function Timeline() {
  const [showAll, setShowAll] = useState(false);

  // useMemo: array visibleData hanya dihitung ulang saat showAll berubah,
  // bukan di setiap render (mis. akibat re-render dari parent)
  const visibleData = useMemo(
    () =>
      showAll ? TIMELINE_DATA : TIMELINE_DATA.slice(0, INITIAL_VISIBLE_COUNT),
    [showAll],
  );

  const hasMore = TIMELINE_DATA.length > INITIAL_VISIBLE_COUNT;

  // useCallback: referensi fungsi stabil, mencegah re-render tombol yang tidak perlu
  const toggleShowAll = useCallback(() => setShowAll((prev) => !prev), []);

  return (
    <section id="timeline" className="w-full scroll-mt-24 py-12">
      <div className="flex items-center justify-between mb-16">
        <div>
          <h2 className="text-4xl font-bold mb-2">Timeline Kegiatan</h2>
          <p className="text-slate-500">
            Catat tanggal penting agar tidak terlewat.
          </p>
        </div>
        <div className="hidden md:flex items-center gap-1.5">
          <div className="w-2.5 h-2.5 rounded-sm bg-blue-700"></div>
          <div className="w-2.5 h-2.5 rounded-full bg-orange-400"></div>
          <div className="w-2.5 h-2.5 border border-slate-300 rotate-45"></div>
        </div>
      </div>

      <div className="relative w-full max-w-4xl mx-auto">
        <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-px bg-slate-200 -translate-x-1/2"></div>

        <motion.div layout className="space-y-12 md:space-y-10">
          <AnimatePresence initial={false} mode="popLayout">
            {visibleData.map((item, index) => (
              <TimelineCard
                key={item.id}
                item={item}
                index={index}
                isNew={index >= INITIAL_VISIBLE_COUNT}
              />
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {hasMore && (
        <div className="flex justify-center mt-12">
          <motion.button
            layout
            onClick={toggleShowAll}
            whileTap={{ scale: 0.97 }}
            className="inline-flex items-center gap-2 rounded-full border border-slate-300 bg-white px-6 py-2.5 text-sm font-semibold text-slate-700 shadow-sm hover:bg-slate-50 transition-colors"
          >
            {showAll ? "Sembunyikan Timeline" : "Lihat Semua Timeline"}
            <motion.span
              animate={{ rotate: showAll ? 180 : 0 }}
              transition={{ duration: 0.3 }}
            >
              <ChevronDown className="w-4 h-4" />
            </motion.span>
          </motion.button>
        </div>
      )}
    </section>
  );
}
