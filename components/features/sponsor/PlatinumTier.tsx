import { motion } from "framer-motion";
import Image from "next/image";
import { Image as ImageIcon } from "lucide-react";
import { containerVariants, itemVariants } from "./sponsor.utils";
import type { Sponsor } from "@/types/index";

export default function PlatinumTier({ sponsors }: { sponsors: Sponsor[] }) {
  if (sponsors.length === 0) return null;

  return (
    <motion.section
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-100px" }}
      variants={containerVariants}
      className="space-y-10"
    >
      <motion.div variants={itemVariants} className="text-center space-y-1">
        <h2 className="text-3xl md:text-4xl font-bold text-slate-900">
          Sponsor Utama
        </h2>
      </motion.div>

      <div className="space-y-6">
        {sponsors.map((sponsor) => (
          <motion.div
            key={sponsor.id}
            variants={itemVariants}
            className="max-w-4xl mx-auto rounded-[2rem] bg-linear-to-br from-[#13076b] via-[#1100c9] to-[#0a0535] p-8 md:p-12 shadow-xl shadow-blue-900/20 relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />

            <div className="flex flex-col items-center text-center space-y-8 relative z-10">
              <div className="w-full max-w-md aspect-video bg-white/10 border border-white/20 rounded-xl flex flex-col items-center justify-center relative overflow-hidden backdrop-blur-md shadow-inner">
                {sponsor.image ? (
                  <Image
                    src={sponsor.image}
                    alt={sponsor.name}
                    fill
                    className="object-contain p-8 drop-shadow-md"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                ) : (
                  <>
                    <ImageIcon className="w-12 h-12 mb-2 text-white/50" />
                    <span className="text-sm font-medium text-white/60">
                      Logo {sponsor.name}
                    </span>
                  </>
                )}
              </div>

              <div className="space-y-4 max-w-3xl">
                <h3 className="text-2xl md:text-3xl font-bold text-white">
                  {sponsor.name}
                </h3>
                <p className="text-blue-100/90 leading-relaxed text-base md:text-lg">
                  Mitra strategis utama kami dalam mewujudkan visi integrasi
                  teknologi modern dengan nilai-nilai luhur kebudayaan
                  Indonesia.
                </p>
              </div>

              <span className="inline-block rounded-full bg-white text-[#1100C9] text-xs font-bold tracking-[0.15em] uppercase px-6 py-2.5 shadow-sm">
                Mitra Strategis
              </span>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
}
