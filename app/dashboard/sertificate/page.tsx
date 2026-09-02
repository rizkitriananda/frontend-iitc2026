"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Award } from "lucide-react";
import CertificateCard from "@/components/features/dashboard/certificate/CertificateCard";
import SeminarCertificateCard from "@/components/features/dashboard/certificate/SeminarCertificateCard";
import CertificateLockedModal from "@/components/features/dashboard/certificate/CertificateLockedModal";
import { useMyCertificate } from "@/features/certificate/hooks/use-my-certificate";
import { Skeleton } from "@/components/ui/skeleton";

export default function CertificatePage() {
  // Menghindari cascading render dengan mengevaluasi waktu target langsung pada inisialisasi state
  const [isLockedModalOpen, setIsLockedModalOpen] = useState(() => {
    const targetTime = new Date("2026-09-12T13:00:00+07:00").getTime();
    const currentTime = new Date().getTime();
    return currentTime < targetTime;
  });

  const [activeTab, setActiveTab] = useState<"lomba" | "seminar">("lomba");
  const { data: certResponse, isLoading } = useMyCertificate();

  const certData = certResponse?.data;
  const status = certData?.winnerStatus
    ? String(certData.winnerStatus).trim()
    : "";

  const isWinner =
    status === "1" ||
    status === "2" ||
    status === "3" ||
    status === "4" ||
    status.toLowerCase().includes("juara") ||
    status.toLowerCase().includes("favorit");

  return (
    <>
      {/* Panggil Modal Terkunci */}
      <CertificateLockedModal
        isOpen={isLockedModalOpen}
        onClose={() => setIsLockedModalOpen(false)}
      />

      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-5xl mx-auto space-y-8 pb-12"
      >
        {/* Header Bagian Atas */}
        <div className="flex flex-col items-center text-center space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-[#1a0b8c] shadow-sm">
            <Award className="w-6 h-6" />
          </div>

          <div className="space-y-1">
            <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">
              Selamat & Terima Kasih!
            </h1>
            <p className="text-slate-500 text-sm sm:text-base max-w-xl mx-auto leading-relaxed">
              Selamat atas pencapaian Anda! Terima kasih telah berpartisipasi
              dan berkontribusi dalam memajukan inovasi teknologi berbasis
              warisan budaya di IITC 2026.
            </p>
          </div>
        </div>

        {/* TAB SWITCHER (Hanya muncul jika user adalah Pemenang/Juara) */}
        {!isLoading && isWinner && (
          <div className="flex justify-center">
            <div className="bg-slate-100/90 p-1.5 rounded-full flex items-center shadow-sm border border-slate-200/80">
              <button
                onClick={() => setActiveTab("lomba")}
                className={`px-8 py-2.5 rounded-full text-xs font-bold tracking-wider transition-all ${
                  activeTab === "lomba"
                    ? "bg-[#2F2FE4] text-white shadow-sm"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                LOMBA
              </button>
              <button
                onClick={() => setActiveTab("seminar")}
                className={`px-8 py-2.5 rounded-full text-xs font-bold tracking-wider transition-all ${
                  activeTab === "seminar"
                    ? "bg-[#2F2FE4] text-white shadow-sm"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                SEMINAR
              </button>
            </div>
          </div>
        )}

        {/* KONTEN KARTU BERDASARKAN STATUS DAN TAB AKTIF */}
        {isLoading ? (
          <div className="w-full flex items-center justify-center py-12">
            <Skeleton className="w-full max-w-4xl h-112.5 rounded-3xl" />
          </div>
        ) : isWinner && activeTab === "seminar" ? (
          <SeminarCertificateCard />
        ) : (
          <CertificateCard />
        )}
      </motion.div>
    </>
  );
}
