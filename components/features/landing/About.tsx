"use client";

import { motion } from "framer-motion";
import { Origami } from "lucide-react";

export default function About() {
  return (
    <section id="tentang" className="w-full scroll-mt-24">
      <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex h-full flex-col justify-between lg:col-span-5 xl:col-span-4"
        >
          <div>
            <h2 className="mb-4 leading-none">
              <span className="mb-2 block text-4xl font-light text-slate-800 lg:text-[3rem]">
                Tentang
              </span>

              <span className="block text-6xl font-extrabold tracking-tight text-slate-900 lg:text-[7.5rem]">
                IITC
              </span>
            </h2>

            <div className="mt-2 h-1.5 w-full bg-blue-700" />
          </div>

          <div className="mt-8 w-full rounded-bl-[2.5rem] rounded-br-md rounded-tl-md rounded-tr-[2.5rem] border border-slate-600 bg-slate-50/50 p-7 shadow-sm">
            <p className="mb-4 text-xs font-bold uppercase tracking-[0.15em] text-blue-700">
              Visi Kami
            </p>

            <p className="text-[1.05rem] font-bold italic leading-relaxed text-slate-800">
              &quot;Memanfaatkan teknologi digital sebagai sarana pelestarian
              dan perayaan keberagaman bahasa di Indonesia.&quot;
            </p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="space-y-7 text-slate-600 lg:col-span-6 lg:col-start-7"
        >
          <p className="text-[1.05rem] leading-[1.8]">
            IITC 2026 merupakan wadah bagi generasi muda untuk mengekspresikan
            ide kreatif dan mentransformasikan visi mereka menjadi karya visual.
            Kami menantang peserta untuk menciptakan solusi teknologi yang
            inklusif dan edukatif.
          </p>

          <p className="text-[1.05rem] leading-[1.8]">
            Dengan semangat{" "}
            <span className="font-semibold text-slate-800">
              &quot;From Vision to Innovation&quot;
            </span>
            , IITC menginspirasi generasi muda untuk menciptakan inovasi digital
            yang tidak hanya menjawab tantangan masa depan, tetapi juga
            mengangkat dan melestarikan keberagaman bahasa Indonesia sebagai
            bagian dari identitas bangsa di era digital.
          </p>

          <div className="grid grid-cols-1 gap-6 pt-4 sm:grid-cols-2 lg:pt-6">
            <div className="w-full space-y-4 rounded-bl-[2.5rem] rounded-br-md rounded-tl-[2.5rem] rounded-tr-md border border-slate-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md lg:p-8">
              <Origami className="h-8 w-8 text-[#EA580C]" strokeWidth={2} />

              <h3 className="text-lg font-semibold tracking-tight text-slate-900">
                Pelestarian Bahasa
              </h3>

              <p className="text-[0.95rem] leading-relaxed text-slate-600">
                Mendigitalisasi dan mendokumentasikan kekayaan bahasa daerah
                sebagai warisan budaya.
              </p>
            </div>

            <div className="w-full space-y-4 rounded-bl-[2.5rem] rounded-br-[2.5rem] rounded-tl-md rounded-tr-[2.5rem] border border-slate-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md lg:p-8">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="32"
                height="32"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-blue-700"
                aria-hidden="true"
              >
                <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
                <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
              </svg>

              <h3 className="text-lg font-semibold tracking-tight text-slate-900">
                Edukasi Interaktif
              </h3>

              <p className="text-[0.95rem] leading-relaxed text-slate-600">
                Membangun platform pembelajaran bahasa yang interaktif dan
                memotivasi penggunanya.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
