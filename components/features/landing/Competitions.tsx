"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Globe,
  PenTool,
  Clapperboard,
  Clock,
  ExternalLink,
  ArrowDownLeft,
} from "lucide-react";
import { motion } from "framer-motion";
import { useCompetitions } from "@/features/competition/hooks/use-competitions";
import SeminarInfoCard from "@/components/features/dashboard/seminar/SeminarInfoCard";

import type { CompetitionItem } from "@/types";
import {
  formatPrice,
  getGuidebookLink,
  getFormattedDeadline,
} from "./competitions.constants";

export default function Competitions() {
  const { data: competitions } = useCompetitions() as {
    data: CompetitionItem[] | undefined;
  };

  // Data kalkulasi harga & informasi lomba
  const webPrice = formatPrice(
    competitions?.find((c) => c.name.toLowerCase().includes("web"))
      ?.competitionPrice,
    "Rp 100.000",
  );
  const uiuxPrice = formatPrice(
    competitions?.find((c) => c.name.toLowerCase().includes("ui"))
      ?.competitionPrice,
    "Rp 100.000",
  );
  const genAiPrice = formatPrice(
    competitions?.find((c) => c.name.toLowerCase().includes("ai"))
      ?.competitionPrice,
    "Rp 75.000",
  );

  const webGuidebook = getGuidebookLink(competitions, "web");
  const uiuxGuidebook = getGuidebookLink(competitions, "ui");
  const genAiGuidebook = getGuidebookLink(competitions, "ai");

  const webDeadline = getFormattedDeadline(competitions, "web", "22 Agt '26");
  const uiuxDeadline = getFormattedDeadline(competitions, "ui", "22 Agt '26");
  const genAiDeadline = getFormattedDeadline(competitions, "ai", "22 Agt 2026");

  return (
    <section id="kompetisi" className="w-full scroll-mt-24 space-y-6">
      {/* Header Section */}
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

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
        {/* Card Web Design */}
        <Card className="bg-[#F8FAFC] border-slate-200 overflow-hidden relative group rounded-tr-[3rem] rounded-bl-[3rem] rounded-tl-[1rem] rounded-br-[1rem] shadow-sm lg:col-span-3 md:col-span-1">
          <CardContent className="p-8 h-full flex flex-col justify-between min-h-90">
            <div className="flex justify-between items-start mb-6">
              <h3 className="text-4xl font-extrabold text-slate-900 leading-tight">
                Web
                <br />
                Design
              </h3>
              <div className="flex flex-col items-end gap-3 z-10">
                <Badge className="bg-slate-900 hover:bg-slate-800 text-white rounded-full px-5 py-2.5 text-[0.9rem] font-medium border-none shadow-sm">
                  {webPrice}
                </Badge>
                <Badge
                  variant="outline"
                  className="bg-transparent border-blue-200 text-blue-600 rounded-full px-5 py-2.5 flex items-center gap-1.5 text-[0.9rem] font-medium"
                >
                  <Clock className="w-4 h-4" /> {webDeadline}
                </Badge>
              </div>
            </div>

            <p className="text-[0.95rem] text-slate-600 max-w-xl mb-6 relative z-10 leading-relaxed">
              Kembangkan website interaktif, edukatif, dan memukau secara visual
              sebagai media kampanye pelestarian bahasa daerah melalui inovasi
              digital.
            </p>

            <div className="mt-auto relative z-10 space-y-6">
              <div className="flex flex-wrap gap-2.5">
                {["HTML", "CSS", "Tailwind"].map((tech) => (
                  <Badge
                    key={tech}
                    variant="outline"
                    className="bg-white border-slate-200 text-slate-700 rounded-full font-medium px-4 py-2 text-[0.85rem]"
                  >
                    {tech}
                  </Badge>
                ))}
              </div>
              <a href={webGuidebook} target="_blank" rel="noopener noreferrer">
                <Button
                  variant="outline"
                  className="bg-transparent border-slate-800 text-slate-900 hover:bg-slate-100 rounded-xl px-6 py-6 font-semibold flex items-center gap-2 w-fit"
                >
                  Lihat Guidebook <ExternalLink className="w-4 h-4" />
                </Button>
              </a>
            </div>
            <Globe className="absolute -bottom-8 -right-8 w-60 h-60 text-slate-200/50 opacity-100 group-hover:scale-105 transition-transform duration-500" />
          </CardContent>
        </Card>

        {/* Card UI/UX Design */}
        <Card className="bg-[#1100C9] border-none text-white overflow-hidden relative group rounded-tl-[3rem] rounded-br-[3rem] rounded-tr-[1rem] rounded-bl-[1rem] shadow-sm lg:col-span-2 md:col-span-1">
          <CardContent className="p-8 h-full flex flex-col justify-between min-h-90">
            <div className="flex justify-between items-start mb-6">
              <h3 className="text-4xl font-extrabold leading-tight">
                UI/UX
                <br />
                Design
              </h3>
              <div className="flex flex-col items-end gap-3 z-10">
                <Badge className="bg-white hover:bg-slate-100 text-[#1100C9] rounded-full px-5 py-2.5 text-[0.9rem] font-medium border-none shadow-sm">
                  {uiuxPrice}
                </Badge>
                <Badge
                  variant="outline"
                  className="bg-transparent border-white/30 text-white rounded-full px-5 py-2.5 flex items-center gap-1.5 text-[0.9rem] font-medium"
                >
                  <Clock className="w-4 h-4" /> {uiuxDeadline}
                </Badge>
              </div>
            </div>

            <p className="text-[0.95rem] text-blue-100 max-w-sm mb-6 relative z-10 leading-relaxed">
              Ciptakan solusi desain yang intuitif dan estetik untuk memecahkan
              masalah pengguna.
            </p>

            <div className="mt-auto relative z-10 space-y-6">
              <div className="flex flex-wrap gap-2.5">
                {["Figma", "Prototyping"].map((tech) => (
                  <Badge
                    key={tech}
                    variant="outline"
                    className="bg-transparent border-white/40 text-white rounded-full font-medium px-5 py-2 text-[0.85rem]"
                  >
                    {tech}
                  </Badge>
                ))}
              </div>
              <a href={uiuxGuidebook} target="_blank" rel="noopener noreferrer">
                <Button className="bg-white text-[#1100C9] hover:bg-slate-100 rounded-xl px-6 py-6 font-semibold flex items-center gap-2 w-fit">
                  Lihat Guidebook <ExternalLink className="w-4 h-4" />
                </Button>
              </a>
            </div>
            <PenTool className="absolute -bottom-8 -right-8 w-60 h-60 text-[#1D0CE8] opacity-100 group-hover:scale-105 transition-transform duration-500" />
          </CardContent>
        </Card>
      </div>

      {/* Card Gen AI */}
      <Card className="bg-[#F5EFE7] border-none overflow-hidden relative group rounded-t-[3.5rem] rounded-b-2xl shadow-sm">
        <CardContent className="p-8 md:p-10">
          <div className="flex flex-col md:flex-row md:items-start justify-between gap-8">
            <div className="max-w-xl relative z-10 flex flex-col justify-between h-full">
              <div>
                <h3 className="text-3xl font-extrabold leading-tight mb-2 text-slate-900">
                  Gen AI
                  <br />
                  (AI Video Generation)
                </h3>
                <p className="text-[0.95rem] text-slate-600 mb-8 max-w-md leading-relaxed">
                  Ciptakan karya video inovatif menggunakan teknologi AI
                  generatif (Text-to-Video, Image-to-Video) yang memadukan unsur
                  budaya Indonesia.
                </p>
              </div>

              <div className="flex flex-wrap gap-2.5 mt-auto">
                {["Midjourney", "Runway", "Sora"].map((tech) => (
                  <Badge
                    key={tech}
                    variant="outline"
                    className="bg-white border-slate-200 text-slate-700 rounded-full font-medium px-4 py-2 text-[0.85rem]"
                  >
                    {tech}
                  </Badge>
                ))}
              </div>
            </div>

            <div className="hidden md:block w-px self-stretch bg-[#EADCCB] mx-4" />

            <div className="flex flex-col items-start md:items-end justify-between gap-12 relative z-10 shrink-0 min-w-55">
              <div className="flex flex-col items-end gap-3 w-full">
                <Badge className="bg-slate-900 hover:bg-slate-800 text-white rounded-full px-5 py-2.5 text-[0.9rem] font-medium ml-auto border-none shadow-sm">
                  {genAiPrice}
                </Badge>
                <Badge
                  variant="outline"
                  className="bg-transparent border-slate-400 text-slate-800 rounded-full px-5 py-2.5 flex items-center gap-1.5 text-[0.9rem] font-medium w-full justify-center md:justify-end"
                >
                  <Clock className="w-4 h-4 text-amber-600" /> Deadline:{" "}
                  {genAiDeadline}
                </Badge>
              </div>

              <a
                href={genAiGuidebook}
                target="_blank"
                rel="noopener noreferrer"
                className="ml-auto"
              >
                <Button
                  variant="outline"
                  className="bg-transparent border-slate-800 text-slate-900 hover:bg-slate-100 rounded-xl px-6 py-6 font-semibold flex items-center gap-2"
                >
                  Lihat Guidebook <ExternalLink className="w-4 h-4" />
                </Button>
              </a>
            </div>
          </div>
          <Clapperboard className="absolute -bottom-10 right-40 w-72 h-72 text-[#EADCCB]/50 opacity-100 group-hover:scale-105 transition-transform duration-500" />
        </CardContent>
      </Card>

      {/* Banner Seminar */}
      <motion.div whileHover={{ scale: 1.01 }}>
        <SeminarInfoCard />
      </motion.div>
    </section>
  );
}
