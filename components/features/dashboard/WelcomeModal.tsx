// components/features/dashboard/WelcomeModal.tsx
"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import maskotIITC from "@/public/Maskot2.svg";

interface WelcomeModalProps {
  userName?: string;
  isProfileComplete: boolean;
}

export default function WelcomeModal({
  userName = "Peserta",
  isProfileComplete,
}: WelcomeModalProps) {
  const [isWelcomeOpen, setIsWelcomeOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (!isProfileComplete) {
      const timer = setTimeout(() => setIsWelcomeOpen(true), 300);
      return () => clearTimeout(timer);
    }
  }, [isProfileComplete]);

  const handleOpenProfile = () => {
    setIsWelcomeOpen(false);
    router.push("/dashboard/profile");
  };

  return (
    <Dialog open={isWelcomeOpen} onOpenChange={setIsWelcomeOpen}>
      <DialogContent className="sm:max-w-106.25 p-8 rounded-3xl border-none shadow-2xl bg-white">
        <DialogTitle className="hidden">Welcome Modal</DialogTitle>
        <div className="flex flex-col items-center text-center space-y-6">
          <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center overflow-hidden relative">
            <Image
              src={maskotIITC}
              alt="Maskot IITC"
              fill
              className="object-contain p-2"
            />
          </div>
          <div className="space-y-2">
            <h2 className="text-2xl font-bold text-slate-900">
              Halo, {userName}!
            </h2>
            <p className="text-slate-500 text-sm leading-relaxed max-w-70 mx-auto">
              Silakan lengkapi profil Anda terlebih dahulu untuk mulai
              berkompetisi.
            </p>
          </div>
          <div className="flex flex-col w-full gap-3 pt-4">
            <Button
              onClick={handleOpenProfile}
              className="w-full bg-[#1000C7] hover:bg-[#13076b] text-white rounded-xl h-12 flex items-center justify-center gap-2 transition-all"
            >
              Lengkapi Profil <ArrowRight className="w-4 h-4" />
            </Button>
            <button
              onClick={() => setIsWelcomeOpen(false)}
              className="text-[#1a0b8c] hover:text-[#13076b] text-sm font-medium py-2 transition-colors"
            >
              Nanti Saja
            </button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
