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
    <section className="w-full py-12 lg:py-20">
      <div className="text-center mb-12">
        <h3 className="text-xl sm:text-2xl font-semibold text-slate-900 inline-block relative pb-3">
          Menuju Penutupan Pendaftaran
          <span className="absolute left-1/2 -translate-x-1/2 bottom-0 w-12 h-0.75 rounded-full bg-blue-700"></span>
        </h3>
      </div>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-10 xl:gap-14 w-full">
        {[
          { label: "HARI", value: timeLeft.days },
          { label: "JAM", value: timeLeft.hours },
          { label: "MENIT", value: timeLeft.minutes },
          { label: "DETIK", value: timeLeft.seconds },
        ].map((item, idx) => {
          const isOdd = idx % 2 === 1;
          const borderRadiusClass = isOdd
            ? "rounded-tr-[2.5rem] rounded-bl-[2.5rem] rounded-tl-md rounded-br-md lg:rounded-tr-[3.5rem] lg:rounded-bl-[3.5rem] lg:rounded-tl-lg lg:rounded-br-lg"
            : "rounded-tl-[2.5rem] rounded-br-[2.5rem] rounded-tr-md rounded-bl-md lg:rounded-tl-[3.5rem] lg:rounded-br-[3.5rem] lg:rounded-tr-lg lg:rounded-bl-lg";

          return (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className={`flex flex-col items-center justify-center bg-white border border-slate-300 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] w-full h-28 sm:h-36 lg:h-44 xl:h-50 ${borderRadiusClass}`}
            >
              <span
                className="text-4xl sm:text-6xl lg:text-[5.5rem] xl:text-[6.5rem] font-bold text-[#8C4B21] leading-none mb-2 lg:mb-4"
                suppressHydrationWarning
              >
                {item.value.toString().padStart(2, "0")}
              </span>
              <span className="text-[11px] sm:text-xs lg:text-sm xl:text-base font-bold text-slate-500 tracking-[0.2em] lg:tracking-[0.25em] uppercase">
                {item.label}
              </span>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
