"use client";

import { Copy, Check } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { ElementType, useState } from "react";
import { toast } from "sonner";

interface PaymentMethodProps {
  title: string;
  provider: string;
  accountNumber: string;
  accountName?: string;
  icon: ElementType;
}

export default function PaymentMethod({
  title,
  provider,
  accountNumber,
  accountName,
  icon: Icon,
}: PaymentMethodProps) {
  // State untuk animasi ikon copy berubah jadi centang
  const [isCopied, setIsCopied] = useState(false);

  // Fungsi copy menggunakan async/await standar browser modern
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(accountNumber);
      setIsCopied(true);
      toast.success(`Nomor ${provider} berhasil disalin!`);

      // Kembalikan ikon copy setelah 2 detik
      setTimeout(() => setIsCopied(false), 1000);
    } catch (error) {
      toast.error("Gagal menyalin nomor. Silakan copy manual.");
    }
  };

  return (
    <Card className="border-slate-200 shadow-sm rounded-2xl h-full hover:shadow-md transition-shadow">
      <CardContent className="p-6 flex flex-col h-full">
        {/* Header Card */}
        <div className="flex items-center gap-3 mb-5">
          <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center shrink-0">
            <Icon className="w-5 h-5 text-blue-600" />
          </div>
          <h3 className="font-bold text-slate-900">{title}</h3>
        </div>

        {/* Konten Detail Pembayaran */}
        <div className="mt-auto bg-slate-50 border border-slate-100 rounded-xl p-4">
          <p className="text-xs text-slate-500 font-bold mb-2 uppercase tracking-wider">
            {provider}
          </p>

          {/* Box Nomor Rekening (Seluruh area kotak bisa di-klik untuk copy) */}
          <div
            onClick={handleCopy}
            title="Klik untuk menyalin"
            className="flex items-center justify-between bg-white border border-slate-200 rounded-lg p-3 mb-3 cursor-pointer group hover:border-[#2F2FE4] transition-colors"
          >
            <span className="font-mono text-base sm:text-lg font-bold text-slate-800 tracking-widest">
              {accountNumber}
            </span>

            <div
              className={`p-2 rounded-md transition-all duration-200 ${
                isCopied
                  ? "bg-green-100 text-green-600"
                  : "bg-slate-100 text-slate-500 group-hover:bg-[#2F2FE4] group-hover:text-white"
              }`}
            >
              {isCopied ? (
                <Check className="w-4 h-4" />
              ) : (
                <Copy className="w-4 h-4" />
              )}
            </div>
          </div>

          {/* Nama Pemilik Rekening */}
          {accountName && (
            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-400 font-medium">a.n.</span>
              <p className="text-sm text-slate-700 font-bold">{accountName}</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
