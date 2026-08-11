"use client";

import { useState } from "react";
import { motion } from "framer-motion";

// Compoenent UI
import LeaderAlert from "@/components/features/dashboard/payment/LeaderAlert";
import PaymentStatus from "@/components/features/dashboard/payment/PaymentStatus";
import PaymentMethod from "@/components/features/dashboard/payment/PaymentMethod";
import UploadProof from "@/components/features/dashboard/payment/UploadProof";
import PaymentInstructions from "@/components/features/dashboard/payment/PaymentInstructions";
import WhatsAppGroupCard from "@/components/features/dashboard/payment/WhatsAppGroupCard";
import StepGuardModal from "@/components/features/dashboard/StepGuardModal";
import PaymentPageSkeleton from "@/components/features/dashboard/payment/PaymentPageSkeleton";
import TwibbonRequirementModal from "@/components/features/dashboard/payment/TwibbonRequirementModal";
import AdminFeeNoticeModal from "@/components/features/dashboard/payment/AdminFeeNoticeModal";

// Konstanta & Helper
import {
  PAYMENT_METHODS,
  VERIFIED_STATUSES,
  getWhatsAppGroupUrl,
} from "@/components/features/dashboard/payment/payment.constants";

// Hooks
import { usePaymentStatus } from "@/features/payment/hooks/use-payment-status";
import { useMyTeam } from "@/features/team/hooks/use-my-team";
import { useProfile } from "@/features/profile/hooks/use-profile";

import type { ExtendedProfileUser } from "@/types";

export default function PaymentPage() {
  // Fetch Data
  const { data: profileResponse, isLoading: isProfileLoading } = useProfile();
  const { data: teamResponse, isLoading: isTeamLoading } = useMyTeam(true);
  const { data: statusResponse, isLoading: isStatusLoading } =
    usePaymentStatus();

  // State Modal (Dismiss)
  const [isTwibbonModalDismissed, setIsTwibbonModalDismissed] = useState(false);
  const [isFeeModalDismissed, setIsFeeModalDismissed] = useState(false);

  // --- Evaluasi Profil ---
  const user = profileResponse?.data?.user as ExtendedProfileUser | undefined;
  const participant = user?.participant;
  const hasTwibbon = Boolean(participant?.twibbon);
  const isProfileComplete = Boolean(
    user?.name &&
    user?.phone &&
    participant?.institution &&
    participant?.gender,
  );

  // --- Evaluasi Tim & Kompetisi ---
  const team = teamResponse?.data?.team;
  const isTeamComplete = Boolean(team);
  const competition = team?.competition;
  const competitionName = competition?.name || competition?.title || "";
  const competitionPrice = competition?.price;
  const whatsappGroupUrl = getWhatsAppGroupUrl(competitionName);

  // --- Evaluasi Pembayaran ---
  const { status: currentStatus, reason: rejectReason } =
    statusResponse?.data?.payment ?? {};
  const rawStatus = currentStatus?.toUpperCase() ?? "";
  const isPaymentVerified = VERIFIED_STATUSES.includes(rawStatus);
  const isPaymentPending = rawStatus === "PENDING";

  // --- Logika Kemunculan Modal ---
  const showTwibbonModal =
    isPaymentVerified && !hasTwibbon && !isTwibbonModalDismissed;
  const showFeeModal =
    isProfileComplete &&
    isTeamComplete &&
    !isPaymentVerified &&
    !isPaymentPending &&
    !isFeeModalDismissed;

  // --- Render Status Loading ---
  if (isStatusLoading || isTeamLoading || isProfileLoading) {
    return (
      <div className="w-full min-h-[calc(100vh-5rem)] flex flex-col items-center pt-8">
        <PaymentPageSkeleton />
      </div>
    );
  }

  // --- Render Utama ---
  return (
    <div className="relative w-full min-h-[calc(100vh-5rem)] flex flex-col items-center">
      {/* Pengaman Akses (Step Guard) */}
      <StepGuardModal
        isProfileComplete={isProfileComplete}
        isTeamComplete={isTeamComplete}
        requiredStep="payment"
      />

      <AdminFeeNoticeModal
        isOpen={showFeeModal}
        onClose={() => setIsFeeModalDismissed(true)}
        competitionName={competitionName}
        fee={competitionPrice}
      />

      <TwibbonRequirementModal
        isOpen={showTwibbonModal}
        onClose={() => setIsTwibbonModalDismissed(true)}
        whatsappUrl={whatsappGroupUrl}
      />

      {isProfileComplete && isTeamComplete && (
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="w-full space-y-10 relative z-10 pb-12"
        >
          <div>
            <h1 className="text-3xl font-bold text-slate-900 mb-2">
              Pembayaran Registrasi
            </h1>
            <p className="text-slate-500 text-sm md:text-base">
              Selesaikan pembayaran untuk memverifikasi pendaftaran tim Anda.
            </p>
          </div>

          <LeaderAlert />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              <PaymentStatus status={currentStatus} reason={rejectReason} />

              {isPaymentVerified && (
                <WhatsAppGroupCard groupUrl={whatsappGroupUrl} />
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
                {PAYMENT_METHODS.map((method) => {
                  const card = (
                    <PaymentMethod
                      title={method.title}
                      provider={method.provider}
                      accountNumber={method.accountNumber}
                      accountName={method.accountName}
                      icon={method.icon}
                    />
                  );

                  return method.fullWidth ? (
                    <div key={method.provider} className="md:col-span-2">
                      {card}
                    </div>
                  ) : (
                    <div key={method.provider}>{card}</div>
                  );
                })}
              </div>

              <UploadProof status={currentStatus} />
            </div>

            <div className="lg:col-span-1">
              <div className="sticky top-6">
                <PaymentInstructions fee={competitionPrice} />
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
}
