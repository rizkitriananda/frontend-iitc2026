"use client";

import { UserPlus } from "lucide-react";
import { Button } from "@/components/ui/button";

interface CreateTeamCardProps {
  onClick: () => void;
  disabled?: boolean;
}

export default function CreateTeamCard({
  onClick,
  disabled = false,
}: CreateTeamCardProps) {
  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-8 flex flex-col shadow-sm h-full">
      <div className="w-12 h-12 rounded-xl bg-indigo-50 flex items-center justify-center mb-6">
        <UserPlus className="w-6 h-6 text-[#2F2FE4]" />
      </div>
      <h3 className="text-xl font-bold text-slate-900 mb-2">Buat Tim Baru</h3>
      <p className="text-sm text-slate-500 leading-relaxed mb-6 flex-1">
        Jadilah ketua tim. Anda akan membuat ruang kerja khusus untuk
        mendaftarkan anggota, memilih kategori kompetisi, dan mengelola
        pengumpulan karya.
      </p>

      {/* disabled kalau user belum pilih lomba dari halaman Dashboard —
          endpoint create team butuh competitionSlug, jadi mencegah user
          nyasar ke sini tanpa itu lebih baik daripada biarin klik lalu
          gagal pas submit. */}
      <Button
        onClick={onClick}
        disabled={disabled}
        title={
          disabled
            ? "Pilih lomba terlebih dahulu dari halaman Dashboard"
            : undefined
        }
        className="bg-[#2F2FE4] hover:bg-[#13076b] text-white font-medium h-11 rounded-lg w-fit px-6 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Buat Tim →
      </Button>
    </div>
  );
}
