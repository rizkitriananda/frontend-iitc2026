"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Loader2, AlertCircle } from "lucide-react";

import { CompetitionCategoryModalProps, Competition } from "@/types/index";
import { useCompetitions } from "@/features/competition/hooks/use-competitions";
import {
  SELECTED_COMPETITION_STORAGE_KEY,
  RESET_SELECTION_DELAY_MS,
  CompetitionCard,
} from "./competition-modal.utils";

export default function CompetitionCategoryModal({
  isOpen,
  onClose,
}: CompetitionCategoryModalProps) {
  const router = useRouter();
  const [selectedCompetition, setSelectedCompetition] =
    useState<Competition | null>(null);
  const resetTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const { data: competitions, isLoading, isError, refetch } = useCompetitions();

  // Bersihkan timeout saat komponen unmount
  useEffect(() => {
    return () => {
      if (resetTimeoutRef.current) clearTimeout(resetTimeoutRef.current);
    };
  }, []);

  const handleDialogChange = useCallback(
    (open: boolean) => {
      if (open) return;
      onClose();
      resetTimeoutRef.current = setTimeout(
        () => setSelectedCompetition(null),
        RESET_SELECTION_DELAY_MS,
      );
    },
    [onClose],
  );

  const handleLanjutkan = useCallback(() => {
    if (!selectedCompetition) return;

    try {
      localStorage.setItem(
        SELECTED_COMPETITION_STORAGE_KEY,
        selectedCompetition.slug,
      );
    } catch (err) {
      console.error("Gagal menyimpan slug lomba ke localStorage:", err);
    }

    onClose();
    router.push(`/dashboard/team?competitionSlug=${selectedCompetition.slug}`);
  }, [selectedCompetition, onClose, router]);

  return (
    <Dialog open={isOpen} onOpenChange={handleDialogChange}>
      <DialogContent className="sm:max-w-225 max-h-[90vh] flex flex-col p-0 overflow-hidden bg-white rounded-2xl border-none shadow-2xl">
        <DialogTitle className="hidden">Pilih Kategori Lomba</DialogTitle>

        {/* Header Modal */}
        <div className="px-8 py-6 border-b border-slate-100 pr-14">
          <h2 className="text-2xl font-bold text-slate-900 mb-1">
            Pilih Kategori Lomba
          </h2>
          <p className="text-sm text-slate-500">
            Tentukan bidang keahlian yang ingin Anda ikuti.
          </p>
        </div>

        {/* Content Body */}
        <div className="p-8 bg-slate-50/50 min-h-70 overflow-y-auto">
          {isLoading && (
            <div className="flex flex-col items-center justify-center h-full py-16 text-slate-400">
              <Loader2 className="w-8 h-8 animate-spin mb-3" />
              <p className="text-sm">Memuat daftar lomba...</p>
            </div>
          )}

          {isError && !isLoading && (
            <div className="flex flex-col items-center justify-center h-full py-16 text-center">
              <AlertCircle className="w-8 h-8 text-red-400 mb-3" />
              <p className="text-sm text-slate-600 mb-4">
                Gagal memuat daftar lomba. Coba lagi?
              </p>
              <Button
                variant="outline"
                onClick={() => refetch()}
                className="border-[#1a0b8c] text-[#1a0b8c] hover:bg-indigo-50"
              >
                Muat Ulang
              </Button>
            </div>
          )}

          {!isLoading && !isError && competitions?.length === 0 && (
            <div className="flex flex-col items-center justify-center h-full py-16 text-center">
              <p className="text-sm text-slate-500">
                Belum ada lomba yang tersedia saat ini.
              </p>
            </div>
          )}

          {!isLoading &&
            !isError &&
            competitions &&
            competitions.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {competitions.map((item) => (
                  <CompetitionCard
                    key={item.slug}
                    item={item}
                    isSelected={selectedCompetition?.slug === item.slug}
                    onSelect={setSelectedCompetition}
                  />
                ))}
              </div>
            )}
        </div>

        {/* Footer Actions */}
        <div className="px-8 py-5 flex items-center justify-end gap-3 bg-white border-t border-slate-100">
          <Button
            variant="ghost"
            onClick={onClose}
            className="text-[#1a0b8c] hover:text-[#13076b] hover:bg-indigo-50 font-bold px-6 h-11"
          >
            Batal
          </Button>
          <Button
            onClick={handleLanjutkan}
            disabled={!selectedCompetition}
            className={cn(
              "font-medium px-8 h-11 shadow-sm transition-colors",
              selectedCompetition
                ? "bg-[#1a0b8c] hover:bg-[#13076b] text-white"
                : "bg-slate-200 text-slate-400 cursor-not-allowed",
            )}
          >
            Lanjutkan
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
