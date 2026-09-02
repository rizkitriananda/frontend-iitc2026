"use client";

import { useRouter } from "next/navigation";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { CalendarClock, CalendarX } from "lucide-react";

interface SubmissionPeriodModalProps {
  isOpen: boolean;
  status: "before" | "after" | "active" | "checking";
}

export default function SubmissionPeriodModal({
  isOpen,
  status,
}: SubmissionPeriodModalProps) {
  const router = useRouter();

  if (status === "active" || status === "checking") return null;

  const isBefore = status === "before";
  const title = isBefore
    ? "Pengumpulan Belum Dibuka"
    : "Pengumpulan Telah Ditutup";
  const message = isBefore
    ? "Jadwal unggah karya baru akan dimulai pada tanggal 19 Agustus 2026. Silakan persiapkan karya terbaik tim Anda dan kembali lagi nanti."
    : "Batas waktu unggah karya telah berakhir pada 30 Agustus 2026. Anda sudah tidak dapat mengunggah atau mengubah tautan karya.";

  return (
    <Dialog open={isOpen}>
      <DialogContent
        className="sm:max-w-105 p-0 overflow-hidden bg-white rounded-2xl border-none shadow-2xl [&>button]:hidden flex flex-col outline-none"
        onInteractOutside={(e) => e.preventDefault()}
        onEscapeKeyDown={(e) => e.preventDefault()}
      >
        <DialogTitle className="hidden">{title}</DialogTitle>

        {/* Header */}
        <div className="px-8 py-6 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${
                isBefore ? "bg-blue-50 text-blue-500" : "bg-red-50 text-red-500"
              }`}
            >
              {isBefore ? (
                <CalendarClock className="w-5 h-5" />
              ) : (
                <CalendarX className="w-5 h-5" />
              )}
            </div>
            <h2 className="text-xl font-bold text-slate-900">{title}</h2>
          </div>
        </div>

        {/* Body */}
        <div className="p-8 bg-slate-50/50 text-center space-y-3">
          <p className="text-sm text-slate-600 leading-relaxed">{message}</p>
        </div>

        {/* Footer */}
        <div className="px-8 py-5 bg-white border-t border-slate-100 flex flex-col gap-3">
          <Button
            onClick={() => router.push("/dashboard")}
            className="w-full bg-[#2F2FE4] hover:bg-[#13076b] text-white font-medium h-11 rounded-xl shadow-sm transition-colors"
          >
            Kembali ke Beranda
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
