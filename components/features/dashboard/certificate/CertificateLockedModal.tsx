"use client";

import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Clock } from "lucide-react";
import Link from "next/link";

interface CertificateLockedModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CertificateLockedModal({
  isOpen,
  onClose,
}: CertificateLockedModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent
        onInteractOutside={(e) => e.preventDefault()}
        className="sm:max-w-120 p-8 rounded-3xl border-none shadow-2xl bg-white flex flex-col items-center text-center"
      >
        <DialogTitle className="hidden">Lomba Belum Berakhir</DialogTitle>

        {/* Icon Jam Lingkaran */}
        <div className="w-20 h-20 bg-indigo-50/80 rounded-full flex items-center justify-center mb-6 text-[#1a0b8c]">
          <Clock className="w-8 h-8" />
        </div>

        {/* Header & Deskripsi */}
        <div className="space-y-3 mb-8 max-w-sm">
          <h2 className="text-2xl font-bold text-slate-900">
            Lomba Belum Berakhir
          </h2>
          <p className="text-sm text-slate-500 leading-relaxed">
            Sertifikat akan tersedia setelah seluruh rangkaian kompetisi dan
            penilaian selesai. Silkan cek kembali nanti.
          </p>
        </div>

        {/* Tombol Aksi */}
        <div className="flex flex-col w-full gap-3">
          <Button
            asChild
            className="w-full bg-[#1a0b8c] hover:bg-[#13076b] text-white font-medium h-12 rounded-xl shadow-sm transition-all"
          >
            <Link href="/dashboard">Kembali ke Dashboard</Link>
          </Button>

          <button
            onClick={onClose}
            className="text-slate-500 hover:text-slate-700 text-sm font-medium py-2 transition-colors"
          >
            Tutup
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
