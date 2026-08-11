"use client";

import Link from "next/link";
import { CheckCircle2, X } from "lucide-react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface PaymentSuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function PaymentSuccessModal({
  isOpen,
  onClose,
}: PaymentSuccessModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-120 p-0 overflow-hidden bg-white rounded-2xl border-none shadow-2xl [&>button]:hidden flex flex-col">
        <DialogTitle className="hidden">
          Bukti Pembayaran Berhasil Diupload
        </DialogTitle>

        {/* Header Modal */}
        <div className="px-8 py-6 border-b border-slate-100 flex items-center justify-between bg-emerald-50/50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 shrink-0">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <h2 className="text-xl font-bold text-slate-900">
              Berhasil Mengunggah Bukti!
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-slate-200/50 transition-colors text-slate-400 hover:text-slate-600"
            aria-label="Tutup"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-8 bg-slate-50/50 text-center space-y-3">
          <p className="text-slate-600 text-sm md:text-base leading-relaxed">
            Bukti pembayaran Anda telah berhasil diunggah. Saat ini status
            pembayaran Anda sedang dalam tahap{" "}
            <strong className="text-slate-900">
              menunggu konfirmasi pembayaran oleh panitia
            </strong>{" "}
            (maksimal 2x24 jam kerja).
          </p>
        </div>

        {/* Footer */}
        <div className="px-8 py-5 bg-white border-t border-slate-100 flex flex-col sm:flex-row items-center justify-end gap-3">
          <Button
            variant="outline"
            onClick={onClose}
            className="w-full sm:w-auto border-slate-200 text-slate-700 hover:bg-slate-50 font-medium px-6 h-11 rounded-xl"
          >
            Tutup
          </Button>
          <Button
            asChild
            onClick={onClose}
            className="w-full sm:w-auto bg-[#2F2FE4] hover:bg-[#13076b] text-white font-medium px-6 h-11 rounded-xl"
          >
            <Link href="/dashboard">Kembali ke Beranda</Link>
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
