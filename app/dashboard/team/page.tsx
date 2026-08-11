"use client";

import { Suspense, useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import Image from "next/image";
import { toast } from "sonner";

import maskotIITC from "@/public/Maskot2.svg";

// Komponen Fitur Team
import CreateTeamCard from "@/components/features/dashboard/team/CreateTeamCard";
import JoinTeamCard from "@/components/features/dashboard/team/JoinTeamCard";
import CreateTeamModal from "@/components/features/dashboard/team/CreateTeamModal";
import ActiveTeamDashboard from "@/components/features/dashboard/team/ActiveTeamDashboard";
import StepGuardModal from "@/components/features/dashboard/StepGuardModal";
import TeamPageSkeleton from "@/components/features/dashboard/team/TeamPageSkeleton";

// Hooks
import { useMyCompetitions } from "@/features/team/hooks/use-my-competitions";
import { useMyTeam } from "@/features/team/hooks/use-my-team";
import {
  useJoinTeam,
  getJoinTeamErrorMessage,
} from "@/features/team/hooks/use-join-team";
import {
  useDeleteTeam,
  useLeaveTeam,
  useRemoveMember,
  getManageTeamErrorMessage,
} from "@/features/team/hooks/use-manage-team";
import { useProfile } from "@/features/profile/hooks/use-profile";
import type { ExtendedProfileUser } from "@/types";
import { SELECTED_COMPETITION_STORAGE_KEY } from "@/features/auth/hooks/use-logout";

// Utils
import {
  checkHasTeam,
  determineUserRole,
} from "@/components/features/dashboard/team/team.utils";

function TeamPageContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const urlSlug = searchParams.get("competitionSlug");

  const [activeSlug, setActiveSlug] = useState<string | null>(urlSlug);
  const [isCreateTeamOpen, setIsCreateTeamOpen] = useState(false);

  // --- Sinkronisasi Slug Kompetisi & LocalStorage ---
  useEffect(() => {
    const timer = setTimeout(() => {
      if (urlSlug) {
        localStorage.setItem(SELECTED_COMPETITION_STORAGE_KEY, urlSlug);
        setActiveSlug(urlSlug);
        router.replace("/dashboard/team", { scroll: false });
      } else {
        const storedSlug = localStorage.getItem(
          SELECTED_COMPETITION_STORAGE_KEY,
        );
        if (storedSlug) setActiveSlug(storedSlug);
      }
    }, 0);
    return () => clearTimeout(timer);
  }, [urlSlug, router]);

  // --- Fetching Data ---
  const { data: profileResponse, isLoading: isProfileLoading } = useProfile();
  const { data: myTeamsSummary, isLoading: isSummaryLoading } =
    useMyCompetitions();

  const hasTeam = checkHasTeam(myTeamsSummary);
  const { data: teamDetailResponse, isLoading: isDetailLoading } =
    useMyTeam(hasTeam);

  // --- Mutations ---
  const deleteMutation = useDeleteTeam();
  const leaveMutation = useLeaveTeam();
  const removeMutation = useRemoveMember();
  const joinMutation = useJoinTeam();

  // --- Validasi Profil & Tim ---
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
  const members = team?.members;
  const competitionName = team?.competition?.name;
  const role = determineUserRole(team?.leader?.email, userEmail);

  // --- Handlers ---
  const handleTeamCreated = () => {
    router.replace("/dashboard/team");
  };

  const handleTeamJoined = (code: string) => {
    joinMutation.mutate(
      { code },
      {
        onSuccess: () => toast.success("Berhasil bergabung ke dalam tim!"),
        onError: (error) => toast.error(getJoinTeamErrorMessage(error)),
      },
    );
  };

  const handleLeaveTeam = () => {
    leaveMutation.mutate(undefined, {
      onSuccess: () => toast.success("Berhasil keluar dari tim."),
      onError: (error) => toast.error(getManageTeamErrorMessage(error)),
    });
  };

  const handleDeleteTeam = () => {
    deleteMutation.mutate(undefined, {
      onSuccess: () => {
        toast.success("Tim berhasil dihapus.");
        localStorage.removeItem(SELECTED_COMPETITION_STORAGE_KEY);
        setActiveSlug(null);
      },
      onError: (error) => toast.error(getManageTeamErrorMessage(error)),
    });
  };

  const handleRemoveMember = (memberId: string | number) => {
    removeMutation.mutate(memberId, {
      onSuccess: () => toast.success("Anggota berhasil dikeluarkan."),
      onError: (error) => toast.error(getManageTeamErrorMessage(error)),
    });
  };

  if (isSummaryLoading || isDetailLoading || isProfileLoading) {
    return (
      <div className="w-full min-h-[calc(100vh-5rem)] flex flex-col items-center pt-8">
        <TeamPageSkeleton />
      </div>
    );
  }

  return (
    <div className="relative w-full min-h-[calc(100vh-5rem)] flex flex-col items-center">
      <StepGuardModal
        isProfileComplete={isProfileComplete}
        isTeamComplete={hasTeam}
        requiredStep="team"
      />

      {isProfileComplete && (
        <>
          {!hasTeam && (
            <CreateTeamModal
              isOpen={isCreateTeamOpen}
              onClose={() => setIsCreateTeamOpen(false)}
              onCreateTeam={handleTeamCreated}
              competitionSlug={activeSlug}
            />
          )}

          {hasTeam && team ? (
            <ActiveTeamDashboard
              teamName={team.name}
              role={role}
              teamCode={team.code}
              competitionName={competitionName}
              guideBookUrl={team?.competition?.guide_book}
              leader={team.leader}
              members={members}
              currentUserEmail={userEmail}
              onLeaveTeam={handleLeaveTeam}
              onDeleteTeam={handleDeleteTeam}
              onRemoveMember={handleRemoveMember}
              isPendingAction={
                deleteMutation.isPending ||
                leaveMutation.isPending ||
                removeMutation.isPending
              }
            />
          ) : (
            <>
              {/* Watermark Maskot */}
              <div className="absolute top-[40%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-200 h-200 opacity-[0.03] pointer-events-none z-0 flex items-center justify-center">
                <div className="w-full h-full rounded-full flex items-center justify-center">
                  <Image
                    src={maskotIITC}
                    alt="Maskot IITC"
                    fill
                    className="object-contain p-2"
                  />
                </div>
              </div>

              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="w-full space-y-10 relative z-10 pb-12"
              >
                <div>
                  <h1 className="text-3xl font-bold text-slate-900 mb-2">
                    Manajemen Tim
                  </h1>
                  <p className="text-slate-500 text-sm md:text-base">
                    Mulai kolaborasi dengan tim Anda. Buat tim baru sebagai
                    ketua atau gabung menggunakan kode undangan.
                  </p>
                </div>

                {!activeSlug && (
                  <div className="rounded-xl border border-amber-200 bg-amber-50 px-5 py-4 text-sm text-amber-800">
                    Anda belum memilih lomba. Silakan pilih lomba terlebih
                    dahulu dari halaman Dashboard sebelum membuat tim baru.
                  </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
                  <CreateTeamCard
                    onClick={() => setIsCreateTeamOpen(true)}
                    disabled={!activeSlug}
                  />
                  <JoinTeamCard
                    onJoin={handleTeamJoined}
                    isPending={joinMutation.isPending}
                  />
                </div>
              </motion.div>
            </>
          )}
        </>
      )}
    </div>
  );
}

export default function TeamPage() {
  return (
    <Suspense fallback={<TeamPageSkeleton />}>
      <TeamPageContent />
    </Suspense>
  );
}
