"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  LayoutTemplate,
  PenTool,
  Bot,
  Trophy,
  Loader2,
  AlertCircle,
} from "lucide-react";
import { CompetitionCategoryModalProps, Competition } from "@/types/index";
import { useCompetitions } from "@/features/competition/hooks/use-competitions";

// API belum mengembalikan field icon, jadi kita map manual berdasarkan slug
// yang kemungkinan dipakai backend untuk 3 kategori lomba utama. Kalau
// slug-nya gak cocok satupun (mis. data dummy/seed acak seperti "trever"
// yang terlihat di contoh response Postman), fallback ke ikon Trophy biar
// tetap ada visual, bukan kosong.
const CATEGORY_ICON_MAP: Record<string, typeof LayoutTemplate> = {
  "web-design": LayoutTemplate,
  "ui-ux": PenTool,
  "ui-ux-design": PenTool,
  "gen-ai": Bot,
  "gen-ai-video": Bot,
};

function getCategoryIcon(slug: string) {
  return CATEGORY_ICON_MAP[slug] ?? Trophy;
}

function formatPrice(price: number | null | undefined): string {
  if (price === null || price === undefined || price === 0) {
    return "Gratis";
  }
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(price);
}

export default function CompetitionCategoryModal({
  isOpen,
  onClose,
}: CompetitionCategoryModalProps) {
  const router = useRouter();
  const [selectedCompetition, setSelectedCompetition] =
    useState<Competition | null>(null);

  const { data: competitions, isLoading, isError, refetch } = useCompetitions();

  const handleDialogChange = (open: boolean) => {
    if (!open) {
      onClose();
      // Delay reset supaya gak ada flicker konten berubah saat animasi
      // dialog menutup masih berjalan.
      setTimeout(() => setSelectedCompetition(null), 300);
    }
  };

  const handleLanjutkan = () => {
    if (!selectedCompetition) return;

    // "Save"-nya di sini bukan lewat API — belum ada endpoint khusus buat
    // nyimpen "kompetisi yang dipilih" tanpa bikin tim. Jadi kita simpan
    // slug-nya lewat query param, terus arahkan ke halaman Manajemen Tim.
    // Di sana, card "Buat Tim Baru" yang baca query param ini dan
    // benar-benar manggil POST /api/teams/:slug begitu user isi nama tim.
    onClose();
    router.push(`/dashboard/team?competitionSlug=${selectedCompetition.slug}`);
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleDialogChange}>
      <DialogContent className="sm:max-w-[900px] p-0 overflow-hidden bg-white rounded-2xl border-none shadow-2xl">
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

        {/* Body: Daftar Card Kategori */}
        <div className="p-8 bg-slate-50/50 min-h-[280px]">
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

          {!isLoading &&
            !isError &&
            competitions &&
            competitions.length === 0 && (
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
                {competitions.map((item) => {
                  const isSelected = selectedCompetition?.slug === item.slug;
                  const Icon = getCategoryIcon(item.slug);
                  const badge =
                    item.maxMembers <= 1
                      ? "Individu"
                      : `Tim (maks ${item.maxMembers} org)`;

                  return (
                    <div
                      key={item.slug}
                      onClick={() => setSelectedCompetition(item)}
                      className={`flex flex-col bg-white border-2 rounded-2xl overflow-hidden cursor-pointer transition-all duration-200 ${
                        isSelected
                          ? "border-[#1a0b8c] shadow-md ring-4 ring-indigo-50"
                          : "border-slate-100 hover:border-slate-300 shadow-sm"
                      }`}
                    >
                      {/* Ilustrasi Card atas — pakai cover dari API kalau ada,
                        fallback ke ikon generik kalau gambar gagal load. */}
                      <div className="h-32 bg-slate-100 flex items-center justify-center relative overflow-hidden group">
                        {item.cover ? (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img
                            src={item.cover}
                            alt={item.name}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              e.currentTarget.style.display = "none";
                            }}
                          />
                        ) : (
                          <>
                            <div className="absolute inset-0 opacity-20 bg-[linear-gradient(45deg,transparent_25%,rgba(0,0,0,0.05)_25%,rgba(0,0,0,0.05)_50%,transparent_50%,transparent_75%,rgba(0,0,0,0.05)_75%,rgba(0,0,0,0.05)_100%)] bg-[length:20px_20px]"></div>
                            <Icon
                              className={`w-12 h-12 relative z-10 transition-transform duration-300 ${isSelected ? "text-[#1a0b8c] scale-110" : "text-[#2e2be3] group-hover:scale-110"}`}
                            />
                          </>
                        )}
                      </div>

                      {/* Konten Text */}
                      <div className="p-5 flex flex-col flex-1">
                        <div className="flex items-start justify-between gap-2 mb-3">
                          <h3 className="text-lg font-bold text-slate-900 leading-tight">
                            {item.name}
                          </h3>
                          <span className="bg-slate-100 text-slate-600 text-[10px] px-2 py-1 rounded-full font-medium whitespace-nowrap">
                            {badge}
                          </span>
                        </div>

                        {/* CATATAN: field description & price BELUM ada di
                          response GET /api/competitions (list) per
                          dokumentasi terbaru — cuma ada di endpoint detail
                          (GET /api/competitions/:slug). Blok ini otomatis
                          kepakai begitu backend menambahkannya ke list
                          endpoint. */}
                        {item.description && (
                          <p className="text-sm text-slate-500 leading-relaxed mb-3 flex-1">
                            {item.description}
                          </p>
                        )}

                        <p className="text-sm font-semibold text-[#1a0b8c] mb-4">
                          {formatPrice(item.price)}
                        </p>

                        {/* Tombol Pilih dalam Card */}
                        <Button
                          variant={isSelected ? "default" : "outline"}
                          className={`w-full font-semibold h-10 mt-auto ${
                            isSelected
                              ? "bg-[#1a0b8c] hover:bg-[#13076b] text-white border-transparent"
                              : "border-[#1a0b8c] text-[#1a0b8c] hover:bg-indigo-50"
                          }`}
                        >
                          {isSelected ? "Terpilih" : "Pilih Lomba"}
                        </Button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
        </div>

        {/* Footer */}
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
            className={`font-medium px-8 h-11 shadow-sm transition-colors ${
              selectedCompetition
                ? "bg-[#1a0b8c] hover:bg-[#13076b] text-white"
                : "bg-slate-200 text-slate-400 cursor-not-allowed"
            }`}
          >
            Lanjutkan
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
