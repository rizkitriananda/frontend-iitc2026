"use client";

import { motion, Variants } from "framer-motion";
import Image from "next/image";
import { Image as ImageIcon, Mail } from "lucide-react";
import { useSponsors } from "@/features/sponsor/hooks/use-sponsors";
import SponsorPageSkeleton from "@/components/features/sponsor/SponsorPageSkeleton";

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.08 },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { type: "spring" as const, stiffness: 300, damping: 24 },
  },
};

function TierLabel({ label, count }: { label: string; count: number }) {
  return (
    <motion.div variants={itemVariants} className="flex items-center gap-4">
      <span className="text-xs font-semibold tracking-[0.2em] text-slate-400 uppercase whitespace-nowrap">
        {label} TIER
        <span className="ml-2 text-slate-300">({count})</span>
      </span>
      <div className="h-px flex-1 bg-slate-200" />
    </motion.div>
  );
}

function SponsorTile({
  sponsor,
  aspect = "aspect-video",
}: {
  sponsor: { id: string | number; name: string; image?: string | null };
  aspect?: string;
}) {
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

export default function SponsorPage() {
  const { data, isLoading, isError } = useSponsors();

  if (isLoading) {
    return <SponsorPageSkeleton />;
  }

  if (isError) {
    return (
      <main className="w-full min-h-screen bg-slate-50 flex items-center justify-center">
        <p className="text-red-500">
          Gagal memuat data sponsor. Silakan coba lagi nanti.
        </p>
      </main>
    );
  }

  const sponsors = data?.data?.sponsors ?? [];

  const platinumSponsors = sponsors.filter(
    (s) => s.tier.toLowerCase() === "platinum",
  );
  const goldSponsors = sponsors.filter((s) => s.tier.toLowerCase() === "gold");
  const silverSponsors = sponsors.filter(
    (s) => s.tier.toLowerCase() === "silver",
  );
  const bronzeSponsors = sponsors.filter(
    (s) => s.tier.toLowerCase() === "bronze",
  );
  const inKindSponsors = sponsors.filter(
    (s) =>
      s.tier.toLowerCase() === "in kind" ||
      s.tier.toLowerCase() === "inkind" ||
      s.tier.toLowerCase() === "in-kind",
  );

  const hasNoSponsors =
    platinumSponsors.length === 0 &&
    goldSponsors.length === 0 &&
    silverSponsors.length === 0 &&
    bronzeSponsors.length === 0 &&
    inKindSponsors.length === 0;

  return (
    <main className="w-full min-h-screen bg-slate-50 py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-20">
        {/* Header halaman */}
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

        {hasNoSponsors && (
          <div className="max-w-xl mx-auto text-center py-16 space-y-2">
            <ImageIcon className="w-10 h-10 mx-auto text-slate-300" />
            <p className="text-slate-500">
              Belum ada sponsor yang ditampilkan saat ini.
            </p>
          </div>
        )}

        {/* Sponsor Platinum -- Warna eksklusif disesuaikan dengan tone biru IITC */}
        {platinumSponsors.length > 0 && (
          <motion.section
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-100px" }}
            variants={containerVariants}
            className="space-y-10"
          >
            <motion.div
              variants={itemVariants}
              className="text-center space-y-1"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900">
                Sponsor Utama
              </h2>
            </motion.div>

            <div className="space-y-6">
              {platinumSponsors.map((sponsor) => (
                <motion.div
                  key={sponsor.id}
                  variants={itemVariants}
                  className="max-w-4xl mx-auto rounded-[2rem] bg-linear-to-br from-[#13076b] via-[#1100c9] to-[#0a0535] p-8 md:p-12 shadow-xl shadow-blue-900/20 relative overflow-hidden"
                >
                  {/* Aksen kilau halus di latar belakang */}
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
                        Mitra strategis utama kami dalam mewujudkan visi
                        integrasi teknologi modern dengan nilai-nilai luhur
                        kebudayaan Indonesia.
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
        )}

        {/* Gold Sponsor */}
        {goldSponsors.length > 0 && (
          <motion.section
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-100px" }}
            variants={containerVariants}
            className="space-y-6"
          >
            <TierLabel label="GOLD" count={goldSponsors.length} />
            <motion.div
              variants={itemVariants}
              className="grid grid-cols-2 sm:grid-cols-3 gap-4"
            >
              {goldSponsors.map((sponsor) => (
                <SponsorTile key={sponsor.id} sponsor={sponsor} />
              ))}
            </motion.div>
          </motion.section>
        )}

        {/* Silver Sponsor */}
        {silverSponsors.length > 0 && (
          <motion.section
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-100px" }}
            variants={containerVariants}
            className="space-y-6"
          >
            <TierLabel label="SILVER" count={silverSponsors.length} />
            <motion.div
              variants={itemVariants}
              className="grid grid-cols-2 sm:grid-cols-4 gap-3"
            >
              {silverSponsors.map((sponsor) => (
                <SponsorTile
                  key={sponsor.id}
                  sponsor={sponsor}
                  aspect="aspect-square sm:aspect-video"
                />
              ))}
            </motion.div>
          </motion.section>
        )}

        {/* Bronze Sponsor */}
        {bronzeSponsors.length > 0 && (
          <motion.section
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-100px" }}
            variants={containerVariants}
            className="space-y-6"
          >
            <TierLabel label="BRONZE" count={bronzeSponsors.length} />
            <motion.div
              variants={itemVariants}
              className="grid grid-cols-3 sm:grid-cols-5 gap-3"
            >
              {bronzeSponsors.map((sponsor) => (
                <SponsorTile
                  key={sponsor.id}
                  sponsor={sponsor}
                  aspect="aspect-square"
                />
              ))}
            </motion.div>
          </motion.section>
        )}

        {/* In Kind Sponsor */}
        {inKindSponsors.length > 0 && (
          <motion.section
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-100px" }}
            variants={containerVariants}
            className="space-y-6"
          >
            <TierLabel label="IN KIND" count={inKindSponsors.length} />
            <motion.div
              variants={itemVariants}
              className="grid grid-cols-3 sm:grid-cols-5 gap-3"
            >
              {inKindSponsors.map((sponsor) => (
                <SponsorTile
                  key={sponsor.id}
                  sponsor={sponsor}
                  aspect="aspect-square"
                />
              ))}
            </motion.div>
          </motion.section>
        )}

        {/* CTA Jadi Sponsor */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
          className="rounded-3xl bg-linear-to-r from-[#2F2FE4] to-[#1100C9] text-white px-8 py-10 md:py-12 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl shadow-[#2F2FE4]/20"
        >
          <div className="text-center md:text-left space-y-2">
            <h2 className="text-xl md:text-2xl font-bold">
              Tertarik Menjadi Sponsor Kami?
            </h2>
            <p className="text-blue-100 max-w-md">
              Dukung generasi muda berinovasi sambil melestarikan budaya
              Indonesia lewat teknologi. Mari berkolaborasi bersama IITC 2026.
            </p>
          </div>
          <a
            href="mailto:iitc.intermedia@gmail.com"
            className="inline-flex items-center gap-2 bg-white text-[#2F2FE4] font-bold px-7 py-3.5 rounded-full hover:bg-blue-50 transition-colors whitespace-nowrap shadow-sm"
          >
            <Mail className="w-5 h-5" /> Hubungi Kami
          </a>
        </motion.div>
      </div>
    </main>
  );
}
