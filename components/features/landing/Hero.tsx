"use client";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import maskotIITC from "@/public/Maskot2.svg";

export default function Hero() {
  return (
    <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16 lg:pt-32 flex flex-col-reverse lg:flex-row items-center gap-12">
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        className="flex-1 space-y-6"
      >
        <div className="inline-flex items-center gap-2 rounded-full border border-primary bg-[#F0F2FC] px-4 py-1.5 text-xs font-medium text-indigo-700">
          <span className="w-1.5 h-1.5 rounded-full bg-indigo-600" />
          Pendaftaran Telah Dibuka
        </div>

        <h1 className="text-5xl md:text-6xl leading-[1.1] tracking-tight">
          <span className="block font-normal text-slate-900">Inovasi</span>
          <span className="block font-extrabold text-slate-900">
            Masa Depan,
          </span>
          <span className="block font-extrabold text-primary">
            <span className="relative inline-block">
              Warisan
              <svg
                className="absolute left-0 -bottom-1.5 w-full h-3"
                viewBox="0 0 100 12"
                preserveAspectRatio="none"
              >
                <path
                  d="M0,7 Q25,2 50,7 T100,6"
                  stroke="#f97316"
                  strokeWidth="4"
                  fill="none"
                  strokeLinecap="round"
                />
              </svg>
            </span>{" "}
            Budaya
          </span>
        </h1>

        <p className="text-slate-500 text-base md:text-lg max-w-xl leading-relaxed">
          Ajang kompetisi teknologi bergengsi yang memadukan inovasi digital
          modern dengan nilai-nilai luhur kebudayaan Indonesia. Tunjukkan
          karyamu dan jadilah pelopor teknologi berbudaya.
        </p>

        <div className="flex flex-wrap gap-4 pt-2">
          <Link href={"/register"} className="cursor-pointer">
            <Button className="bg-primary hover:bg-indigo-800 rounded-tl-2xl rounded-br-2xl rounded-tr-md rounded-bl-md px-7 py-5 text-sm font-medium">
              Daftar Sekarang
            </Button>
          </Link>
          <Button
            variant="outline"
            className="rounded-tl-2xl rounded-br-2xl rounded-tr-md rounded-bl-md px-7 py-5 text-sm font-medium border-slate-300 text-slate-800 bg-white"
          >
            Lihat Selengkapnya
          </Button>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="flex-1 w-full flex justify-center"
      >
        <div className="relative w-[320px] h-80 sm:w-95 sm:h-95 flex items-center justify-center">
          {/* Blob warna lembut di belakang, memberi kedalaman */}
          <div className="absolute w-65 h-65 sm:w-75 sm:h-75 rounded-full bg-indigo-100 blur-2xl opacity-60" />
          <div className="absolute -bottom-6 -right-2 w-40 h-40 rounded-full bg-orange-100 blur-2xl opacity-60" />

          {/* Bingkai diamond dashed sebagai aksen sudut */}
          <div className="absolute w-56 h-56 sm:w-64 sm:h-64 rotate-45 border-2 border-dashed border-indigo-200" />

          {/* Pola titik-titik kecil di sudut */}
          <div
            className="absolute -top-2 -left-2 w-20 h-20 opacity-70"
            style={{
              backgroundImage:
                "radial-gradient(circle, #a5b4fc 1.5px, transparent 1.5px)",
              backgroundSize: "10px 10px",
            }}
          />
          <div
            className="absolute -bottom-2 -right-2 w-20 h-20 opacity-70"
            style={{
              backgroundImage:
                "radial-gradient(circle, #fdba74 1.5px, transparent 1.5px)",
              backgroundSize: "10px 10px",
            }}
          />

          <div className="relative w-[320px] h-80 sm:w-95 sm:h-95 rounded-full border-2 border-dashed border-slate-300 bg-white/40 backdrop-blur-sm flex items-center justify-center">
            <Image
              src={maskotIITC}
              alt="Maskot IITC"
              fill
              className="object-contain p-6"
            />
          </div>
        </div>
      </motion.div>
    </section>
  );
}
