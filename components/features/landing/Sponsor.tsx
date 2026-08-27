"use client";

import Link from "next/link";
import Image from "next/image";
import { ChevronRight } from "lucide-react";
import { motion } from "framer-motion";
import { useSponsors } from "@/features/sponsor/hooks/use-sponsors";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export default function Sponsors() {
  const { data, isLoading, isError } = useSponsors();

  if (isLoading) {
    return (
      <section className="w-full bg-slate-50/50 border-y border-slate-200 py-10 my-12 h-38.5 animate-pulse" />
    );
  }

  if (isError) {
    return null;
  }

  const sponsorsList = data?.data?.sponsors ?? [];

  if (sponsorsList.length === 0) {
    return null;
  }

  const MAX_ITEMS = 7;
  const displaySponsors = [...sponsorsList];

  // Duplikasi data secara siklikal jika jumlah sponsor kurang dari 7 slot
  while (displaySponsors.length < MAX_ITEMS) {
    const nextIndex = displaySponsors.length % sponsorsList.length;
    displaySponsors.push(sponsorsList[nextIndex]);
  }

  return (
    <section className="w-full bg-slate-50/50 border-y border-slate-200 py-10 my-12 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Bagian Atas */}
        <div className="flex items-center justify-between mb-8">
          <h3 className="text-xs font-bold tracking-[0.15em] text-slate-400 uppercase">
            Didukung Oleh
          </h3>
          <Link
            href="/sponsor"
            className="group flex items-center text-sm font-medium text-slate-600 hover:text-[#2F2FE4] transition-colors"
          >
            Lihat Selengkapnya
            <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Baris Daftar Sponsor */}
        <div className="w-full overflow-x-auto hide-scrollbar">
          <div className="flex items-center justify-center sm:justify-between gap-8 md:gap-12 flex-nowrap min-w-max sm:min-w-0">
            <TooltipProvider delayDuration={200}>
              {displaySponsors.map((sponsor, index) => (
                <Tooltip key={`${sponsor.id}-${index}`}>
                  <TooltipTrigger asChild>
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: index * 0.05 }}
                      className="flex items-center justify-center h-12 md:h-14 transition-all duration-300 shrink-0 cursor-help"
                    >
                      {sponsor.image ? (
                        <Image
                          src={sponsor.image}
                          alt={sponsor.name}
                          width={140}
                          height={50}
                          className="max-h-12 md:max-h-14 w-auto object-contain"
                        />
                      ) : (
                        <span className="text-lg md:text-xl font-bold text-slate-400 uppercase tracking-widest whitespace-nowrap">
                          {sponsor.name}
                        </span>
                      )}
                    </motion.div>
                  </TooltipTrigger>

                  {/* Tooltip text saat di-hover */}
                  <TooltipContent
                    side="bottom"
                    className="font-medium bg-slate-900 text-white"
                  >
                    <p>{sponsor.name}</p>
                  </TooltipContent>
                </Tooltip>
              ))}
            </TooltipProvider>
          </div>
        </div>
      </div>
    </section>
  );
}
