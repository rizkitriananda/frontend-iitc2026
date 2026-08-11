import { motion } from "framer-motion";
import { Mail } from "lucide-react";

export default function SponsorCTA() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.5 }}
      className="rounded-3xl bg-linear-to-r from-[#2F2FE4] to-[#1100C9] text-white px-8 py-10 md:py-12 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl shadow-[#2F2FE4]/20"
    >
      <div className="text-center md:text-left space-y-2">
        <h2 className="text-xl md:text-2xl font-bold">
          Tertarik Menjadi Sponsor Kami?
        </h2>
        <p className="text-blue-100 max-w-md">
          Dukung generasi muda berinovasi sambil melestarikan budaya Indonesia
          lewat teknologi. Mari berkolaborasi bersama IITC 2026.
        </p>
      </div>
      <a
        href="mailto:iitc.intermedia@gmail.com"
        className="inline-flex items-center gap-2 bg-white text-[#2F2FE4] font-bold px-7 py-3.5 rounded-full hover:bg-blue-50 transition-colors whitespace-nowrap shadow-sm"
      >
        <Mail className="w-5 h-5" /> Hubungi Kami
      </a>
    </motion.div>
  );
}
