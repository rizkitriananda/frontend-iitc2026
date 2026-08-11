"use client";

import { motion } from "framer-motion";
import { Image as ImageIcon } from "lucide-react";
import { useSponsors } from "@/features/sponsor/hooks/use-sponsors";
import SponsorPageSkeleton from "@/components/features/sponsor/SponsorPageSkeleton";
import { categorizeSponsors } from "@/components/features/sponsor/sponsor.utils";

// Sub-komponen modular
import PlatinumTier from "@/components/features/sponsor/PlatinumTier";
import StandardTier from "@/components/features/sponsor/StandardTier";
import SponsorCTA from "@/components/features/sponsor/SponsorCTA";

export default function SponsorPage() {
  const { data, isLoading, isError } = useSponsors();

  if (isLoading) return <SponsorPageSkeleton />;

  if (isError) {
    return (
      <main className="w-full min-h-screen bg-slate-50 flex items-center justify-center">
        <p className="text-red-500">
          Gagal memuat data sponsor. Silakan coba lagi nanti.
        </p>
      </main>
    );
  }

  const { platinum, gold, silver, bronze, inKind, hasNoSponsors } =
    categorizeSponsors(data?.data?.sponsors ?? []);

  return (
    <main className="w-full min-h-screen bg-slate-50 py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-20">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center space-y-4"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-[#1100C9] tracking-tight">
            Sponsor Kami
          </h1>
          <p className="text-slate-500 max-w-2xl mx-auto text-lg">
            IITC 2026 didukung oleh perusahaan-perusahaan terkemuka yang peduli
            terhadap pelestarian budaya melalui inovasi teknologi.
          </p>
        </motion.div>

        {/* Empty State */}
        {hasNoSponsors && (
          <div className="max-w-xl mx-auto text-center py-16 space-y-2">
            <ImageIcon className="w-10 h-10 mx-auto text-slate-300" />
            <p className="text-slate-500">
              Belum ada sponsor yang ditampilkan saat ini.
            </p>
          </div>
        )}

        {/* Render Tiap Kategori (Otomatis akan disembunyikan jika datanya kosong) */}
        <PlatinumTier sponsors={platinum} />

        <StandardTier
          label="GOLD"
          sponsors={gold}
          gridClass="grid-cols-2 sm:grid-cols-3 gap-4"
          aspect="aspect-video"
        />

        <StandardTier
          label="SILVER"
          sponsors={silver}
          gridClass="grid-cols-2 sm:grid-cols-4 gap-3"
          aspect="aspect-square sm:aspect-video"
        />

        <StandardTier
          label="BRONZE"
          sponsors={bronze}
          gridClass="grid-cols-3 sm:grid-cols-5 gap-3"
          aspect="aspect-square"
        />

        <StandardTier
          label="IN KIND"
          sponsors={inKind}
          gridClass="grid-cols-3 sm:grid-cols-5 gap-3"
          aspect="aspect-square"
        />

        {/* Call to Action Section */}
        <SponsorCTA />
      </div>
    </main>
  );
}
