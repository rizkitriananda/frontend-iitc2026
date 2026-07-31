"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { TimeLeft } from "@/types/index";

export default function Countdown() {
  const countdown = (): TimeLeft => {
    const targetDate = "2026-08-22";
    const difference = new Date(targetDate).getTime() - new Date().getTime();
    let timeLeft: TimeLeft = { days: 0, hours: 0, minutes: 0, seconds: 0 };

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }

    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState<TimeLeft>(countdown());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(countdown());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <section className="w-full py-12">
      <div className="text-center mb-10">
        <h3 className="text-xl sm:text-2xl font-semibold text-slate-800  inline-block relative pb-2">
          Menuju Penutupan Pendaftaran
          <span className="absolute left-1/2 -translate-x-1/2 bottom-0 w-10 h-0.75 rounded-full bg-indigo-600"></span>
        </h3>
      </div>
      <div className="flex justify-center gap-4 sm:gap-8">
        {[
          { label: "HARI", value: timeLeft.days },
          { label: "JAM", value: timeLeft.hours },
          { label: "MENIT", value: timeLeft.minutes },
          { label: "DETIK", value: timeLeft.seconds },
        ].map((item, idx) => (
          <motion.div
            key={item.label}
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.1 }}
            className="flex flex-col items-center justify-center bg-white border border-slate-200 shadow-sm w-24 h-28 sm:w-40 sm:h-44 rounded-tl-[2rem] rounded-br-[2rem] rounded-tr-md rounded-bl-md"
          >
            <span
              className="text-4xl sm:text-6xl font-bold text-amber-800"
              suppressHydrationWarning
            >
              {item.value.toString().padStart(2, "0")}
            </span>
            <span className="text-xs sm:text-sm font-medium text-slate-400 mt-3 tracking-widest">
              {item.label}
            </span>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
