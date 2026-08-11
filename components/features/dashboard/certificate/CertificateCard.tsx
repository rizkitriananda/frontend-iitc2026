"use client";

import { Download, Info, Award } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function CertificateCard() {
  const handleDownload = () => {
    // Logika unduh sertifikat (misal: generate PDF atau download file)
    console.log("Mengunduh sertifikat...");
  };

  return (
    <Card className="border-slate-200/80 shadow-sm rounded-3xl overflow-hidden bg-white relative">
      {/* Garis Gradasi Mewah di Bagian Atas Card */}
      <div className="absolute top-0 left-0 right-0 h-2 bg-linear-to-r from-blue-600 via-indigo-500 to-amber-400"></div>

      <CardContent className="p-8 sm:p-12 flex flex-col items-center">
        {/* PREVIEW SERTIFIKAT (KOTAK PUTIH DI DALAM) */}
        <div className="w-full max-w-2xl border border-slate-200/80 rounded-2xl p-8 sm:p-12 bg-white shadow-sm flex flex-col items-center text-center relative overflow-hidden mb-8">
          {/* Watermark / Logo Kecil di atas */}
          <div className="w-10 h-10 rounded-full bg-slate-50 border border-slate-100 flex items-center justify-center mb-6 text-[#1a0b8c]">
            <Award className="w-5 h-5" />
          </div>

          {/* Judul Sertifikat */}
          <h3 className="text-xs sm:text-sm font-extrabold tracking-[0.25em] text-[#1a0b8c] uppercase mb-4">
            Sertifikat Penghargaan
          </h3>

          <p className="text-xs text-slate-400 mb-2">Diberikan kepada</p>

          {/* Nama Penerima */}
          <h4 className="text-xl sm:text-2xl font-bold text-slate-900 border-b border-slate-200 pb-2 mb-6 min-w-55">
            Alex Iskandar
          </h4>

          {/* Deskripsi Pencapaian */}
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-lg mb-12">
            Atas dedikasi dan kontribusinya sebagai Finalis dalam kompetisi
            Inovasi Teknologi Berbasis Budaya, IITC 2026.
          </p>

          {/* Tanda Tangan / Footer Sertifikat */}
          <div className="w-full flex items-center justify-between px-4 sm:px-12 pt-4">
            <div className="text-center">
              <div className="w-32 border-b border-slate-300 mb-2"></div>
              <p className="text-[11px] font-medium text-slate-500">
                Ketua Pelaksana
              </p>
            </div>
            <div className="text-center">
              <div className="w-32 border-b border-slate-300 mb-2"></div>
              <p className="text-[11px] font-medium text-slate-500">
                Rektor Universitas
              </p>
            </div>
          </div>
        </div>

        {/* FOOTER BAWAH: INFO FORMAT & TOMBOL DOWNLOAD */}
        <div className="w-full max-w-2xl flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
          <div className="flex items-center gap-2 text-slate-500 text-xs sm:text-sm">
            <Info className="w-4 h-4 text-slate-400 shrink-0" />
            <span>Format tersedia: PDF (High Quality)</span>
          </div>

          <Button
            onClick={handleDownload}
            className="w-full sm:w-auto bg-[#1a0b8c] hover:bg-[#13076b] text-white font-medium px-6 h-11 rounded-xl shadow-sm flex items-center justify-center gap-2 transition-all"
          >
            <Download className="w-4 h-4" /> Download Sertifikat
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
