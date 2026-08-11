// app/(dashboard)/dashboard/page.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import RegistrationStepper from "@/components/features/dashboard/RegistrationStepper";
import PromoBanner from "@/components/features/dashboard/PromoBanner";
import DeadlineCard from "@/components/features/dashboard/DeadlineCard";
import EmptyStateCard from "@/components/features/dashboard/EmptyStateCard";
import WelcomeModal from "@/components/features/dashboard/WelcomeModal";
import CompetitionCategoryModal from "@/components/features/dashboard/CompetitionCategoryModal";
import DashboardSkeleton from "@/components/features/dashboard/DashboardSkeleton";

import { useProfile } from "@/features/profile/hooks/use-profile";
import { useMyTeam } from "@/features/team/hooks/use-my-team";
import { usePaymentStatus } from "@/features/payment/hooks/use-payment-status";
import type { ExtendedProfileUser } from "@/types/profile-type";

interface ProfileResponseData {
  user?: ExtendedProfileUser;
}

export default function DashboardPage() {
  const router = useRouter();
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);

  const { data: profileResponse, isLoading: isProfileLoading } = useProfile();
  const { data: teamResponse, isLoading: isTeamLoading } = useMyTeam(true);
  const { data: paymentResponse, isLoading: isPaymentLoading } =
    usePaymentStatus();

  const responseData = profileResponse?.data as ProfileResponseData | undefined;
  const user = responseData?.user;
  const participant = user?.participant;

  const userName = user?.name || "Peserta IITC 2026";

  // Syarat dasar data diri agar bisa lanjut ke step Bentuk Tim (Twibbon TIDAK Wajib di sini)
  const isProfileComplete = Boolean(
    user?.name &&
    user?.phone &&
    participant?.institution &&
    participant?.gender,
  );

  // Cek apakah twibbon sudah terunggah sepenuhnya
  const hasTwibbon = Boolean(participant?.twibbon);

  const teamData = teamResponse?.data?.team;
  const isTeamComplete = Boolean(teamData);

  const paymentStatus = paymentResponse?.data?.payment?.status;
  const isPaymentComplete =
    paymentStatus === "valid" ||
    paymentStatus === "success" ||
    paymentStatus === "VALID";

  const isSubmissionComplete = Boolean(
    teamData?.submissionLink && teamData.submissionLink.trim() !== "",
  );

  const handlePromoButtonClick = () => {
    if (isTeamComplete) {
      router.push("/dashboard/team");
    } else {
      setIsCategoryModalOpen(true);
    }
  };

  if (isProfileLoading || isTeamLoading || isPaymentLoading) {
    return <DashboardSkeleton />;
  }

  return (
    <>
      {/* WelcomeModal menggunakan parameter apakah data diri sudah lengkap */}
      <WelcomeModal userName={userName} isProfileComplete={isProfileComplete} />
      <CompetitionCategoryModal
        isOpen={isCategoryModalOpen}
        onClose={() => setIsCategoryModalOpen(false)}
      />

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="w-full space-y-10 relative z-10 pb-12"
      >
        <div>
          <h1 className="text-3xl font-bold text-slate-900 mb-1">
            Halo, {userName}!
          </h1>
          <p className="text-slate-500">Selamat datang di portal IITC 2026.</p>
        </div>

        {/* Kirim status kelengkapan profil dasar + status twibbon ke RegistrationStepper */}
        <RegistrationStepper
          isProfileComplete={isProfileComplete}
          hasTwibbon={hasTwibbon}
          isTeamComplete={isTeamComplete}
          isPaymentComplete={isPaymentComplete}
          isSubmissionComplete={isSubmissionComplete}
        />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 flex">
            <PromoBanner onIkutiLombaClick={handlePromoButtonClick} />
          </div>

          <div className="flex flex-col gap-6">
            <DeadlineCard
              label="Tenggat Waktu"
              title="Batas Akhir Pengumpulan Karya"
              startDate="2026-08-09"
              targetDate="2026-08-27"
            />
            <EmptyStateCard team={teamData} />
          </div>
        </div>
      </motion.div>
    </>
  );
}
