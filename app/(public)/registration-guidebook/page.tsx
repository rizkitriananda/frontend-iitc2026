"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, BookOpen, ExternalLink, Loader2 } from "lucide-react";

// Menggunakan env variable untuk fleksibilitas tautan panduan
const SCRIBE_EMBED_URL =
  process.env.NEXT_PUBLIC_REGISTRATION_GUIDEBOOK_URL ??
  "https://scribehow.com/embed/Register_and_Register_for_a_Competition_on_IITC_Intermedia__IOg8Jtr8SdmHU6XRFkl4vg?skipIntro=true";

const SCRIBE_SHARED_URL = SCRIBE_EMBED_URL.replace("/embed/", "/shared/");
const EMBED_HEIGHT_CLASSES = "h-125 sm:h-140 lg:h-155";

interface GuidebookEmbedFrameProps {
  src: string;
}

// Komponen iframe Scribe dengan indikator loading
function GuidebookEmbedFrame({ src }: GuidebookEmbedFrameProps) {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <div className="relative rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden">
      {!isLoaded && (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-slate-50 z-10">
          <Loader2 className="w-8 h-8 text-[#2F2FE4] animate-spin" />
          <p className="text-sm text-slate-400">Memuat panduan...</p>
        </div>
      )}

      <div className={`w-full ${EMBED_HEIGHT_CLASSES}`}>
        <iframe
          src={src}
          onLoad={() => setIsLoaded(true)}
          title="Panduan Pendaftaran dan Registrasi Kompetisi IITC"
          allow="fullscreen"
          className="w-full h-full border-0"
        />
      </div>
    </div>
  );
}

export default function RegistrationGuidebookPage() {
  return (
    <div className="min-h-screen bg-[#F8FAFC] py-10 sm:py-16 px-4 sm:px-8">
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="max-w-4xl mx-auto space-y-6"
      >
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-sm font-medium text-slate-500 hover:text-slate-700 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Kembali ke Beranda
        </Link>

        <div className="space-y-3">
          <div className="inline-flex items-center gap-2 bg-indigo-50 text-[#2F2FE4] text-xs font-bold uppercase tracking-wide px-3 py-1.5 rounded-full">
            <BookOpen className="w-3.5 h-3.5" />
            Panduan Pendaftaran
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-slate-900">
            Cara Daftar & Ikut Kompetisi di IITC
          </h1>
          <p className="text-slate-500 text-sm sm:text-base max-w-2xl">
            Ikuti panduan langkah demi langkah di bawah untuk mendaftar akun dan
            mengikuti kompetisi di IITC 2026. Kamu juga bisa membukanya langsung
            di tab baru kalau tampilan di bawah tidak muncul dengan sempurna.
          </p>
        </div>

        <GuidebookEmbedFrame src={SCRIBE_EMBED_URL} />

        {/* Tautan alternatif jika iframe diblokir */}
        <div className="flex items-center justify-center pt-2">
          <a
            href={SCRIBE_SHARED_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-[#2F2FE4] hover:text-[#1a0b8c] hover:underline transition-colors"
          >
            Buka panduan di tab baru <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </motion.div>
    </div>
  );
}
