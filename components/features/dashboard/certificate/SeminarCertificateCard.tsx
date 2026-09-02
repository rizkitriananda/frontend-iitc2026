"use client";

import {
  Download,
  Info,
  Loader2,
  FileText,
  Image as ImageIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useMyCertificate } from "@/features/certificate/hooks/use-my-certificate";
import { useState } from "react";
import { toast } from "sonner";

interface FilePickerOptions {
  suggestedName?: string;
  types?: Array<{
    description?: string;
    accept: Record<string, string[]>;
  }>;
}

interface WindowWithFileSystem extends Window {
  showSaveFilePicker?: (options?: FilePickerOptions) => Promise<{
    createWritable: () => Promise<{
      write: (blob: Blob) => Promise<void>;
      close: () => Promise<void>;
    }>;
  }>;
}

export default function SeminarCertificateCard() {
  const { data: certResponse, isLoading, isError } = useMyCertificate();
  const [isDownloading, setIsDownloading] = useState(false);

  if (isLoading) {
    return (
      <Card className="border-slate-200/80 shadow-sm rounded-3xl overflow-hidden bg-white relative">
        <div className="absolute top-0 left-0 right-0 h-2 bg-slate-200 animate-pulse"></div>
        <CardContent className="p-8 sm:p-12 flex flex-col items-center">
          <div className="w-full max-w-4xl rounded-2xl bg-slate-50 border border-slate-200/80 p-8 sm:p-12 flex flex-col items-center justify-center mb-8 min-h-75 sm:min-h-100 space-y-6">
            <Skeleton className="w-12 h-12 rounded-full" />
            <Skeleton className="w-48 h-4 rounded-md" />
            <Skeleton className="w-32 h-3 rounded-md" />
            <Skeleton className="w-64 h-8 rounded-md my-2" />
            <Skeleton className="w-full max-w-md h-12 rounded-md" />
          </div>
          <div className="w-full max-w-4xl flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
            <Skeleton className="w-56 h-5 rounded-md" />
            <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
              <Skeleton className="w-full sm:w-44 h-11 rounded-xl" />
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (isError || !certResponse?.data) {
    return (
      <Card className="border-slate-200/80 shadow-sm rounded-3xl overflow-hidden bg-white p-8 text-center text-slate-500">
        Data sertifikat seminar tidak ditemukan atau terjadi kesalahan.
      </Card>
    );
  }

  const certData = certResponse.data;

  const handleDownloadSeminar = async () => {
    if (!certData.certificateUrl) return;

    const suggestedName = `Sertifikat_Seminar_${certData.name.replace(/\s+/g, "_")}.pdf`;

    try {
      setIsDownloading(true);
      toast.info("Menyiapkan file sertifikat seminar...");

      // Coba fetch blob terlebih dahulu untuk mendukung dialog "Save As" (File System Access API)
      const response = await fetch(certData.certificateUrl);
      if (!response.ok) throw new Error("Network response was not ok");

      const blob = await response.blob();
      const win = window as unknown as WindowWithFileSystem;

      if (win.showSaveFilePicker) {
        try {
          const handle = await win.showSaveFilePicker({
            suggestedName: suggestedName,
            types: [
              {
                description: "PDF Document",
                accept: { "application/pdf": [".pdf"] },
              },
            ],
          });

          const writable = await handle.createWritable();
          await writable.write(blob);
          await writable.close();

          toast.success("Sertifikat seminar berhasil diunduh!");
          return;
        } catch (pickerError: unknown) {
          if (
            typeof pickerError === "object" &&
            pickerError !== null &&
            "name" in pickerError &&
            (pickerError as { name: string }).name === "AbortError"
          ) {
            setIsDownloading(false);
            return;
          }
        }
      }

      // Fallback Blob download jika showSaveFilePicker tidak didukung
      const blobUrl = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = blobUrl;
      link.download = suggestedName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(blobUrl);

      toast.success("Sertifikat seminar berhasil diunduh!");
    } catch (error) {
      // Jika terkena CORS error saat fetch, gunakan metode unduh langsung via link tag tanpa fetch blob
      console.warn(
        "Fetch diblokir CORS, menggunakan metode direct download:",
        error,
      );

      const link = document.createElement("a");
      link.href = certData.certificateUrl;
      link.download = suggestedName;
      link.target = "_blank";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      toast.success("Sertifikat seminar berhasil diunduh!");
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <Card className="border-slate-200/80 shadow-sm rounded-3xl overflow-hidden bg-white relative">
      <div className="absolute top-0 left-0 right-0 h-2 bg-linear-to-r from-blue-600 via-indigo-500 to-amber-400"></div>

      <CardContent className="p-8 sm:p-12 flex flex-col items-center">
        {/* BINGKAI PREVIEW PDF SERTIFIKAT SEMINAR */}
        <div className="w-full max-w-4xl rounded-2xl bg-slate-50 border border-slate-200/80 shadow-inner flex flex-col items-center justify-center relative overflow-hidden mb-8 min-h-100 sm:min-h-125 p-4">
          {certData.certificateUrl ? (
            <div className="w-full h-125 rounded-xl overflow-hidden border border-slate-200 bg-white shadow-sm">
              <iframe
                src={`${certData.certificateUrl}#view=FitH`}
                title={`Sertifikat Seminar ${certData.seminarName}`}
                className="w-full h-full border-0"
              />
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center text-slate-400 space-y-3 py-12">
              <ImageIcon className="w-10 h-10 opacity-50" />
              <p className="text-sm font-medium">
                Sertifikat seminar belum tersedia.
              </p>
            </div>
          )}
        </div>

        {/* INFO FORMAT & TOMBOL DOWNLOAD */}
        <div className="w-full max-w-4xl flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
          <div className="flex items-center gap-2 text-slate-500 text-xs sm:text-sm">
            <Info className="w-4 h-4 text-slate-400 shrink-0" />
            <span>Format tersedia: PDF (Siap Cetak / High Quality)</span>
          </div>

          <div>
            {certData.certificateUrl ? (
              <Button
                onClick={handleDownloadSeminar}
                disabled={isDownloading}
                className="w-full sm:w-auto bg-[#2F2FE4] hover:bg-[#13076b] text-white font-medium px-6 h-11 rounded-xl shadow-sm transition-all"
              >
                {isDownloading ? (
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                ) : (
                  <Download className="w-4 h-4 mr-2" />
                )}
                Unduh Sertifikat Seminar
              </Button>
            ) : (
              <Button
                disabled
                className="w-full sm:w-auto bg-slate-200 text-slate-400 font-medium px-6 h-11 rounded-xl shadow-none cursor-not-allowed"
              >
                <FileText className="w-4 h-4 mr-2" /> Belum Tersedia
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
