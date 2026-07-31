"use client";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Globe,
  PenTool,
  Clapperboard,
  Presentation,
  MapPin,
  Calendar,
  Clock,
  Download,
  ArrowDownLeft,
} from "lucide-react";
import { motion } from "framer-motion";

export default function Competitions() {
  return (
    <section id="kompetisi" className="w-full scroll-mt-24 space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h2 className="text-4xl font-bold">Kategori Kompetisi</h2>
          <p className="text-slate-500 mt-2">
            Pilih kategori yang sesuai dengan passion dan keahlian tim Anda.
          </p>
        </div>
        <div className="hidden sm:flex w-16 h-16 rounded-full border-2 border-dashed border-indigo-300 items-center justify-center shrink-0">
          <ArrowDownLeft className="w-6 h-6 text-indigo-500" />
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Card Web Design */}
        <Card className="bg-white border-slate-200 overflow-hidden relative group rounded-3xl">
          <CardContent className="p-8">
            <div className="flex justify-between items-start mb-10">
              <h3 className="text-2xl font-bold leading-tight">
                Web
                <br />
                Design
              </h3>
              <div className="flex flex-col items-end gap-2">
                <Badge className="bg-slate-900 text-white rounded-full px-3 py-1">
                  Rp 100.000
                </Badge>
                <Badge
                  variant="outline"
                  className="border-blue-200 text-blue-700 rounded-full px-3 py-1 flex items-center gap-1 font-normal"
                >
                  <Clock className="w-3 h-3" /> 22 Agt &apos;26
                </Badge>
              </div>
            </div>
            <p className="text-sm text-slate-500 max-w-60 mb-6 relative z-10">
              Rancang antarmuka web yang responsif, modern, dan berfokus pada
              pengalaman pengguna yang inklusif.
            </p>
            <div className="flex gap-2 mb-6 relative z-10">
              <Badge variant="secondary">HTML</Badge>
              <Badge variant="secondary">CSS</Badge>
              <Badge variant="secondary">Tailwind</Badge>
            </div>
            <Button
              variant="outline"
              className="rounded-full relative z-10 gap-2"
            >
              Unduh Guidebook <Download className="w-4 h-4" />
            </Button>
            <Globe className="absolute -bottom-6 -right-6 w-40 h-40 text-slate-100 opacity-70 group-hover:scale-110 transition-transform" />
          </CardContent>
        </Card>

        {/* Card UI/UX Design */}
        <Card className="bg-blue-700 text-white border-none overflow-hidden relative group rounded-3xl">
          <CardContent className="p-8">
            <div className="flex justify-between items-start mb-10">
              <h3 className="text-2xl font-bold leading-tight">
                UI/UX
                <br />
                Design
              </h3>
              <div className="flex flex-col items-end gap-2">
                <Badge className="bg-white text-blue-700 rounded-full px-3 py-1">
                  Rp 100.000
                </Badge>
                <Badge
                  variant="outline"
                  className="border-white/40 text-white rounded-full px-3 py-1 flex items-center gap-1 font-normal"
                >
                  <Clock className="w-3 h-3" /> 22 Agt &apos;26
                </Badge>
              </div>
            </div>
            <p className="text-sm text-blue-100 max-w-60 mb-6 relative z-10">
              Ciptakan solusi desain yang intuitif dan estetik untuk memecahkan
              masalah pengguna.
            </p>
            <div className="flex gap-2 mb-6 relative z-10">
              <Badge className="bg-blue-600 hover:bg-blue-500 text-white">
                Figma
              </Badge>
              <Badge className="bg-blue-600 hover:bg-blue-500 text-white">
                Prototyping
              </Badge>
            </div>
            <Button className="bg-white text-blue-700 hover:bg-slate-100 rounded-full relative z-10 gap-2">
              Guidebook <Download className="w-4 h-4" />
            </Button>
            <PenTool className="absolute -bottom-6 -right-6 w-40 h-40 text-blue-600 opacity-40 group-hover:scale-110 transition-transform" />
          </CardContent>
        </Card>
      </div>

      {/* Card Gen AI */}
      <Card className="bg-orange-50/60 border-orange-100 overflow-hidden relative group rounded-3xl">
        <CardContent className="p-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="max-w-md relative z-10">
              <h3 className="text-2xl font-bold leading-tight mb-3">
                Gen AI
                <br />
                (AI Video Generation)
              </h3>
              <p className="text-sm text-slate-600 mb-6">
                Ciptakan karya video inovatif menggunakan teknologi AI generatif
                (Text-to-Video, Image-to-Video) yang memadukan unsur budaya
                Indonesia.
              </p>
              <div className="flex gap-2">
                <Badge variant="secondary">Midjourney</Badge>
                <Badge variant="secondary">Runway</Badge>
                <Badge variant="secondary">Sora</Badge>
              </div>
            </div>

            <div className="hidden md:block w-px self-stretch bg-orange-200/70" />

            <div className="flex flex-col items-start md:items-end gap-3 relative z-10 shrink-0">
              <Badge className="bg-slate-900 text-white rounded-full px-3 py-1">
                Rp 75.000
              </Badge>
              <Badge
                variant="outline"
                className="border-slate-300 text-slate-700 rounded-full px-3 py-1 flex items-center gap-1 font-normal"
              >
                <Clock className="w-3 h-3 text-amber-600" /> Deadline: 22 Agt
                2026
              </Badge>
              <Button variant="outline" className="rounded-full gap-2 bg-white">
                Unduh Guidebook <Download className="w-4 h-4" />
              </Button>
            </div>
          </div>
          <Clapperboard className="absolute -bottom-8 -right-4 w-44 h-44 text-orange-200/60 opacity-70 group-hover:scale-110 transition-transform" />
        </CardContent>
      </Card>

      {/* Banner Seminar */}
      <motion.div
        whileHover={{ scale: 1.01 }}
        className="w-full bg-white border border-slate-200 rounded-3xl overflow-hidden flex flex-col md:flex-row"
      >
        <div className="w-full md:w-64 bg-indigo-50 flex flex-col items-center justify-center gap-4 py-10 px-6 shrink-0">
          <Presentation className="w-14 h-14 text-blue-700" strokeWidth={1.5} />
          <Badge className="bg-blue-900 text-white rounded-full px-4 py-1.5">
            Speaker Placeholder
          </Badge>
        </div>

        <div className="p-6 md:p-8 flex-1 flex flex-col justify-center gap-4">
          <span className="flex items-center gap-1.5 text-sm font-medium text-blue-700">
            <Calendar className="w-4 h-4" /> Seminar Nasional 2026
          </span>
          <h3 className="text-xl md:text-2xl font-bold">
            Masa Depan Teknologi di Era{" "}
            <span className="text-blue-700">Budaya Digital</span>
          </h3>

          <div className="flex flex-wrap items-center gap-8">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center shrink-0">
                <Calendar className="w-4 h-4" />
              </div>
              <div>
                <p className="text-xs text-slate-400">Tanggal</p>
                <p className="text-sm font-semibold text-slate-800">
                  12 September 2026
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center shrink-0">
                <MapPin className="w-4 h-4" />
              </div>
              <div>
                <p className="text-xs text-slate-400">Lokasi</p>
                <p className="text-sm font-semibold text-slate-800">
                  Universitas Amikom Purwokerto
                </p>
              </div>
            </div>
          </div>

          {/* <Link href={"/register"} className="cursor-pointer"> */}
          <Button className="bg-[#2F2FE4] w-fit hover:bg-indigo-800 rounded-tl-2xl rounded-br-2xl rounded-tr-md rounded-bl-md px-6 py-[1.15rem] text-sm font-medium">
            Daftar Seminar
          </Button>
          {/* </Link> */}
        </div>
      </motion.div>
    </section>
  );
}
