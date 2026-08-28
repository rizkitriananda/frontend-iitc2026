"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Info,
  Link as LinkIcon,
  Lock,
  Users,
  Loader2,
  AlertCircle,
  ShieldAlert,
} from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";

// Komponen Dashboard & Modals
import SuccessModal from "@/components/features/dashboard/submission/SuccessModal";
import StepGuardModal from "@/components/features/dashboard/StepGuardModal";
import SubmissionStatusBadge from "@/components/features/dashboard/submission/SubmissionStatusBadge";
import SubmissionSkeleton from "@/components/features/dashboard/submission/SubmissionSkeleton";
import TwibbonRequirementModal from "@/components/features/dashboard/payment/TwibbonRequirementModal";
import SubmissionPeriodModal from "@/components/features/dashboard/submission/SubmissionPeriodModal";
import {
  getRequirementGroup,
  RequirementList,
} from "@/components/features/dashboard/submission/submission-requirements";

// Hooks & Utils
import { useMyCompetitions } from "@/features/team/hooks/use-my-competitions";
import { useMyTeam } from "@/features/team/hooks/use-my-team";
import { useProfile } from "@/features/profile/hooks/use-profile";
import { usePaymentStatus } from "@/features/payment/hooks/use-payment-status";
import {
  useSubmitTeamWork,
  getSubmitTeamWorkErrorMessage,
} from "@/features/team/hooks/use-submit-team-work";
import {
  VALID_PAYMENT_STATUSES,
  computeSubmissionTimeStatus,
  getWhatsAppGroupUrl,
  type ExtendedProfileUser,
} from "@/components/features/dashboard/submission/submission.utils";

export default function UploadWorkPage() {
  // --- States ---
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [userEditedLink, setUserEditedLink] = useState<string | null>(null);
  const [isModalDismissed, setIsModalDismissed] = useState(false);
  const [timeStatus] = useState<"before" | "after" | "active">(
    computeSubmissionTimeStatus,
  );

  // --- Fetching Data ---
  const { data: profileResponse, isLoading: isProfileLoading } = useProfile();
  const { data: myTeamsSummary, isLoading: isSummaryLoading } =
    useMyCompetitions();

  const hasTeam = Array.isArray(myTeamsSummary) && myTeamsSummary.length > 0;
  const { data: teamDetailResponse, isLoading: isDetailLoading } =
    useMyTeam(hasTeam);
  const { data: paymentResponse, isLoading: isPaymentLoading } =
    usePaymentStatus();

  const submitMutation = useSubmitTeamWork();

  // --- Evaluasi Validasi Status ---
  const user = profileResponse?.data?.user as ExtendedProfileUser | undefined;
  const participant = user?.participant;
  const userEmail = user?.email;

  const isProfileComplete = Boolean(
    user?.name &&
    user?.phone &&
    participant?.institution &&
    participant?.gender,
  );

  const team = teamDetailResponse?.data?.team;
  const isTeamComplete = Boolean(team);

  const paymentStatus = paymentResponse?.data?.payment?.status?.toLowerCase();
  const isPaymentComplete = Boolean(
    paymentStatus && VALID_PAYMENT_STATUSES.includes(paymentStatus),
  );

  const isStepGuardActive =
    !isProfileComplete || !isTeamComplete || !isPaymentComplete;
  const hasTwibbon = Boolean(participant?.twibbon);

  const showTwibbonModal =
    timeStatus === "active" &&
    isPaymentComplete &&
    !hasTwibbon &&
    !isModalDismissed;

  const isLeader = Boolean(
    team?.leader?.email &&
    userEmail &&
    team.leader.email.toLowerCase().trim() === userEmail.toLowerCase().trim(),
  );

  const driveLink =
    userEditedLink !== null ? userEditedLink : team?.submissionLink || "";
  const isAlreadySubmitted = Boolean(team?.submissionLink?.trim());

  const isLoading =
    isSummaryLoading || isDetailLoading || isProfileLoading || isPaymentLoading;
  const canShowContent =
    isProfileComplete && isTeamComplete && isPaymentComplete && Boolean(team);

  // --- Handlers ---
  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!driveLink.trim() || !team || !isLeader || timeStatus !== "active")
      return;

    if (!hasTwibbon) {
      setIsModalDismissed(false);
      return;
    }

    submitMutation.mutate(
      { submission: driveLink },
      {
        onSuccess: () => setIsSuccessModalOpen(true),
        onError: (error) => toast.error(getSubmitTeamWorkErrorMessage(error)),
      },
    );
  };

  if (isLoading) return <SubmissionSkeleton />;

  const competition = team?.competition;
  const competitionName = competition?.name || competition?.title || "";
  const compSlug = competition?.slug?.toLowerCase() || "";
  const requirementGroup = getRequirementGroup(compSlug);
  const RequirementIcon = requirementGroup.icon;
  const whatsappGroupUrl = getWhatsAppGroupUrl(competitionName);

  return (
    <div className="relative w-full min-h-[calc(100vh-5rem)] flex flex-col items-center">
      {/* Modal Periode Pengumpulan */}
      <SubmissionPeriodModal
        isOpen={
          !isStepGuardActive &&
          (timeStatus === "before" || timeStatus === "after")
        }
        status={timeStatus}
      />

      {/* Pengaman Step Pendaftaran */}
      <StepGuardModal
        isProfileComplete={isProfileComplete}
        isTeamComplete={isTeamComplete}
        isPaymentComplete={isPaymentComplete}
        requiredStep="submission"
      />

      {/* Modal Peringatan Twibbon */}
      <TwibbonRequirementModal
        isOpen={showTwibbonModal}
        onClose={() => setIsModalDismissed(true)}
        whatsappUrl={whatsappGroupUrl}
      />

      {/* Modal Sukses Unggah */}
      <SuccessModal
        isOpen={isSuccessModalOpen}
        onClose={() => setIsSuccessModalOpen(false)}
      />

      {canShowContent && team && (
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="w-full space-y-10 relative z-10 pb-12"
        >
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-slate-900 mb-2">
                Unggah Karya
              </h1>
              <p className="text-slate-500 text-sm md:text-base">
                Cabang Lomba:{" "}
                <span className="font-semibold text-[#2F2FE4]">
                  {competition?.name || "Memuat..."}
                </span>
              </p>
            </div>
            <SubmissionStatusBadge isSubmitted={isAlreadySubmitted} />
          </div>

          {/* Info Ketua Tim */}
          <div className="w-full bg-[#f0f4ff] border border-[#d6e0ff] rounded-xl p-4 flex items-start gap-3 shadow-sm">
            <Info className="w-5 h-5 text-[#2F2FE4] mt-0.5 shrink-0" />
            <div>
              <h4 className="text-sm font-semibold text-[#2F2FE4] mb-1">
                Informasi Ketua Tim ({team.leader?.name || "Ketua"})
              </h4>
              <p className="text-sm text-slate-600">
                Hanya Ketua Tim yang dapat mengunggah atau memperbarui tautan
                karya. Pastikan link yang dimasukkan sudah final.
              </p>
            </div>
          </div>

          {/* Panduan & Persyaratan Kompetisi */}
          <Card className="border-slate-200 shadow-sm rounded-2xl overflow-hidden bg-white">
            <CardContent className="p-8 space-y-6">
              <div className="flex items-center gap-2 text-slate-900">
                <RequirementIcon
                  className={`w-5 h-5 ${requirementGroup.iconClassName}`}
                />
                <h4 className="font-bold text-base">
                  {requirementGroup.title}
                </h4>
              </div>
              <div className="bg-[#f8fafc] border border-slate-100 rounded-xl p-6 space-y-3">
                <p className="text-sm text-slate-600 font-medium">
                  Pastikan folder Google Drive Anda berisi file berikut:
                </p>
                <RequirementList items={requirementGroup.items} />
              </div>
            </CardContent>
          </Card>

          {/* Form Input Link Drive */}
          <Card className="border-slate-200 shadow-sm rounded-2xl overflow-hidden bg-white">
            <CardContent className="p-8">
              <form onSubmit={handleSave} className="space-y-6">
                {submitMutation.isError && (
                  <div className="flex items-start gap-2 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
                    <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
                    <p>{getSubmitTeamWorkErrorMessage(submitMutation.error)}</p>
                  </div>
                )}

                <div className="space-y-2">
                  <Label
                    htmlFor="driveLink"
                    className="text-sm font-bold text-slate-900"
                  >
                    Link Google Drive Karya
                  </Label>
                  <div className="relative">
                    <LinkIcon className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
                    <Input
                      id="driveLink"
                      value={driveLink}
                      onChange={(e) => setUserEditedLink(e.target.value)}
                      placeholder="https://drive.google.com/..."
                      disabled={!isLeader || submitMutation.isPending}
                      className="pl-11 h-12 bg-white border-slate-200 focus-visible:ring-[#2F2FE4] text-slate-900 disabled:opacity-60 disabled:bg-slate-50"
                    />
                  </div>
                </div>

                {!isLeader ? (
                  <div className="flex items-center gap-2 text-amber-600 bg-amber-50 border border-amber-200 p-3 rounded-xl text-sm">
                    <ShieldAlert className="w-5 h-5 shrink-0" />
                    <span>
                      Anda adalah anggota tim. Hanya ketua tim yang dapat
                      mengubah tautan karya.
                    </span>
                  </div>
                ) : (
                  <Button
                    type="submit"
                    disabled={!driveLink.trim() || submitMutation.isPending}
                    className={`font-medium px-8 h-12 rounded-xl shadow-sm transition-all ${
                      driveLink.trim() && !submitMutation.isPending
                        ? "bg-[#2F2FE4] hover:bg-[#2523b8] text-white cursor-pointer"
                        : "bg-slate-200 text-slate-400 cursor-not-allowed"
                    }`}
                  >
                    {submitMutation.isPending ? (
                      <>
                        <Loader2 className="w-5 h-5 mr-2 animate-spin" />{" "}
                        Menyimpan...
                      </>
                    ) : (
                      <>
                        {isAlreadySubmitted ? "Perbarui Link" : "Simpan Link"}{" "}
                        &rarr;
                      </>
                    )}
                  </Button>
                )}
              </form>
            </CardContent>
          </Card>

          {/* Instruksi Akses Drive */}
          <Card className="border-dashed border-2 border-slate-200 shadow-none rounded-2xl bg-[#fafafa]">
            <CardContent className="p-6 flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-orange-50 flex items-center justify-center text-orange-500 shrink-0 mt-0.5">
                <Lock className="w-5 h-5" />
              </div>
              <div className="space-y-3">
                <h3 className="font-bold text-slate-900">Akses Google Drive</h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Pastikan link Google Drive Anda disetel ke &quot;Public&quot;
                  atau &quot;Anyone with the link&quot; agar juri dapat
                  mengakses dan menilai karya Anda tanpa hambatan.
                </p>
                <div className="inline-flex items-center gap-2 bg-slate-200/60 px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-700">
                  <Users className="w-3.5 h-3.5 text-slate-500" />
                  <span>Anyone with the link</span>
                  <span className="text-emerald-600 font-bold ml-1">
                    &rarr; Viewer
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}
    </div>
  );
}
