"use client";
import { motion } from "framer-motion";

export default function MediaPartners() {
  const partners = [
    "TECH MEDIA",
    "INNOVATE.ID",
    "CULTURE HUB",
    "DEV NATION",
    "STARTUP INDO",
    "TECH MEDIA",
  ];

  // Digandakan supaya loop marquee terlihat menyambung tanpa jeda
  const marqueeItems = [...partners, ...partners];

  return (
    <section className="w-full py-12">
      <div className="mb-8">
        <h2 className="text-4xl font-bold mb-2">Media Partner</h2>
        <p className="text-slate-500">
          Berkolaborasi menyebarkan semangat inovasi budaya.
        </p>
      </div>

      <div className="relative w-full border border-slate-200 rounded-2xl bg-slate-50/50 p-6 overflow-hidden">
        {/* Fade di kedua sisi supaya transisi marquee terlihat halus */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-16 bg-linear-to-r from-slate-50 to-transparent z-10" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-linear-to-l from-slate-50 to-transparent z-10" />

        <motion.div
          className="flex gap-4 w-max"
          animate={{ x: ["0%", "-50%"] }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          {marqueeItems.map((partner, index) => (
            <div
              key={index}
              className="flex items-center justify-center px-8 h-14 shrink-0 bg-white border border-slate-200 rounded-xl shadow-sm"
            >
              <span className="font-bold text-slate-700 text-sm tracking-wide whitespace-nowrap">
                {partner}
              </span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
