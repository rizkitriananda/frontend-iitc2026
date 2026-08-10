"use client";

import { useCallback, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { TIMELINE_DATA, INITIAL_VISIBLE_COUNT } from "./timeline.constants";
import { TimelineCard } from "./TimelineCard";

export default function Timeline() {
  const [showAll, setShowAll] = useState(false);

  const visibleData = useMemo(
    () =>
      showAll ? TIMELINE_DATA : TIMELINE_DATA.slice(0, INITIAL_VISIBLE_COUNT),
    [showAll],
  );

  const hasMore = TIMELINE_DATA.length > INITIAL_VISIBLE_COUNT;
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
