"use client";

import { useState } from "react";
import { Calendar, MapPin, ExternalLink, Loader2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useSeminars } from "@/features/seminar/hooks/use-seminars";
import SeminarNotOpenModal from "./SeminarNotOpenModal";

// Helper untuk format tanggal
function formatDateOnly(dateString?: string): string {
  if (!dateString) return "16 Agustus 2026";
  try {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return dateString;
    return new Intl.DateTimeFormat("id-ID", {
      day: "numeric",
      month: "long",
      year: "numeric",
    }).format(date);
  } catch {
    return dateString;
  }
}

export default function SeminarInfoCard() {
  const { data, isLoading } = useSeminars();
  const [isModalOpen, setIsModalOpen] = useState(false);

  if (isLoading) {
    return (
      <Card className="border-slate-200 shadow-sm rounded-2xl overflow-hidden bg-white p-16 flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-[#2F2FE4]" />
      </Card>
    );
  }

  const seminars = data?.data?.seminars ?? [];
  const seminar = seminars.find((s) => s.isActive) || seminars[0];

  const title =
    seminar?.title || "Kreatif dan Kritis di Era AI (Artificial Intelligence)";
  const speaker = seminar?.speaker || "Cendekia Luthfieta Nazalia, S.T.";
  const location =
    seminar?.location || "Aula FBIS, Universitas Amikom Purwokerto";

  const rawDateTime = seminar?.dateTime;
  const formattedDateTime = formatDateOnly(rawDateTime);

  const rawStartDate = seminar?.startDate;
  const formattedStartDate = formatDateOnly(rawStartDate);

  const gformUrl =
    seminar?.registrationLink || "https://iitc.intermediaamikom.org/";
  const posterSource = seminar?.posterUrl || "";

  const isRegistrationOpen = (() => {
    if (!rawStartDate) return false;
    const today = new Date();
    const startDate = new Date(rawStartDate);
    today.setHours(0, 0, 0, 0);
    startDate.setHours(0, 0, 0, 0);

    return today >= startDate;
  })();

  const handleButtonClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (!isRegistrationOpen) {
      setIsModalOpen(true);
    }
  };

  return (
    <>
      <SeminarNotOpenModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        startDate={formattedStartDate}
      />

      <Card className="border-slate-200 shadow-sm rounded-2xl overflow-hidden bg-white">
        <CardContent className="p-0 grid grid-cols-1 lg:grid-cols-5">
          {/* Kolom Kiri: Foto Pembicara dari Poster */}
          <div className="bg-linear-to-br from-amber-500 to-orange-600 lg:col-span-2 mx-4 rounded-xl p-6 flex flex-col items-center justify-center relative min-h-80 overflow-hidden border-b lg:border-b-0 lg:border-r border-slate-200">
            <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#fff_1px,transparent_1px)] bg-size-[16px_16px]"></div>

            <div className="relative z-10 w-full h-full flex flex-col items-center justify-center">
              <div className="w-48 h-48 sm:w-56 sm:h-56 rounded-2xl overflow-hidden shadow-lg border-4 border-white/80 bg-white mb-4 relative">
                <Image
                  src={posterSource}
                  alt={speaker}
                  fill
                  className="object-cover object-top scale-125 pt-4"
                />
              </div>
              <div className="bg-white/95 backdrop-blur-sm text-slate-900 text-xs sm:text-sm font-bold px-4 py-2 rounded-xl shadow-md text-center max-w-[85%]">
                {speaker}
                <span className="block text-[11px] font-normal text-slate-500 mt-0.5">
                  IT Edu Content Creator
                </span>
              </div>
            </div>
          </div>

          {/* Kolom Kanan: Detail Seminar */}
          <div className="p-8 flex flex-col justify-center space-y-5 lg:col-span-3">
            <div className="flex flex-wrap items-center gap-2">
              <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#2F2FE4] bg-indigo-50 px-3 py-1 rounded-md">
                <Calendar className="w-3.5 h-3.5" />
                SEMINAR IITC 2026
              </div>
              <span className="bg-orange-100 text-orange-700 text-xs font-extrabold px-3 py-1 rounded-md">
                GRATIS (UMUM)
              </span>
            </div>

            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 leading-tight">
              {title.includes("Era AI") ? (
                <>
                  {title.split("Era AI")[0]}{" "}
                  <span className="text-[#2F2FE4]">
                    AI (Artificial Intelligence)
                  </span>
                </>
              ) : (
                title
              )}
            </h2>

            <div className="space-y-3 pt-1">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-orange-50 text-orange-500 flex items-center justify-center shrink-0 mt-0.5">
                  <Calendar className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                    Waktu & Tanggal
                  </p>
                  <p className="text-sm font-semibold text-slate-800">
                    {formattedDateTime}
                  </p>
                  <p className="text-xs text-slate-500">08:00 WIB - Selesai</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center shrink-0 mt-0.5">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                    Lokasi
                  </p>
                  <p className="text-sm font-semibold text-slate-800">
                    {location}
                  </p>
                </div>
              </div>
            </div>

            {/* Tombol Pendaftaran: Link hanya dirender jika pendaftaran sudah dibuka */}
            <div className="pt-2">
              {isRegistrationOpen ? (
                <a
                  href={gformUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block w-full sm:w-auto"
                >
                  <Button className="w-full sm:w-auto bg-[#2F2FE4] hover:bg-[#13076b] text-white font-medium px-6 h-11 rounded-xl flex items-center justify-center gap-2 shadow-sm cursor-pointer transition-colors">
                    Daftar Seminar Sekarang <ExternalLink className="w-4 h-4" />
                  </Button>
                </a>
              ) : (
                <Button
                  type="button"
                  onClick={handleButtonClick}
                  className="w-full sm:w-auto bg-[#2F2FE4] hover:bg-[#13076b] text-white font-medium px-6 h-11 rounded-xl flex items-center justify-center gap-2 shadow-sm cursor-pointer transition-colors"
                >
                  Daftar Seminar Sekarang <ExternalLink className="w-4 h-4" />
                </Button>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </>
  );
}
