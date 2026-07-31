"use client";

import { motion } from "framer-motion";
import { Landmark, Wallet } from "lucide-react";

// Pastikan path import disesuaikan dengan struktur folder Anda
import LeaderAlert from "@/components/features/dashboard/payment/LeaderAlert";
import PaymentStatus from "@/components/features/dashboard/payment/PaymentStatus";
import PaymentMethod from "@/components/features/dashboard/payment/PaymentMethod";
import UploadProof from "@/components/features/dashboard/payment/UploadProof";
import PaymentInstructions from "@/components/features/dashboard/payment/PaymentInstructions";

export default function PaymentPage() {
  return (
    <div className="relative w-full min-h-[calc(100vh-5rem)] flex flex-col items-center">
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-6xl mx-auto space-y-8 relative z-10"
      >
        {/* Header Section */}
        <div>
          <h1 className="text-3xl font-bold text-slate-900 mb-2">
            Pembayaran Registrasi
          </h1>
          <p className="text-slate-500 text-sm md:text-base">
            Selesaikan pembayaran untuk memverifikasi pendaftaran tim Anda.
          </p>
        </div>

        {/* Alert Peringatan Full Width */}
        <LeaderAlert />

        {/* Layout Grid 2 Kolom (Kiri Utama, Kanan Sidebar) */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* KOLOM KIRI (Konten Utama) */}
          <div className="lg:col-span-2 space-y-6">
            <PaymentStatus />

            {/* Grid Kartu Metode Pembayaran */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
              <PaymentMethod
                title="Transfer Bank"
                provider="Bank Mandiri"
                accountNumber="683901020736507"
                accountName="Maylinda Eka Saputri"
                icon={Landmark}
              />
              <PaymentMethod
                title="E-Wallet"
                provider="GoPay"
                accountNumber="082137805336"
                accountName="Maylinda Eka Saputri"
                icon={Wallet}
              />
              <PaymentMethod
                title="Transfer Bank"
                provider="Seabank"
                accountNumber="901912316510"
                accountName="Tifa Fitriana"
                icon={Landmark}
              />
            </div>

            {/* Area Upload Bukti */}
            <UploadProof />
          </div>

          {/* KOLOM KANAN (Instruksi) */}
          <div className="lg:col-span-1">
            <div className="sticky top-6">
              <PaymentInstructions />
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
