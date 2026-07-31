"use client";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import Image from "next/image";
import maskotIITC from "@/public/Maskot2.svg";

import CreateTeamCard from "@/components/features/dashboard/team/CreateTeamCard";
import JoinTeamCard from "@/components/features/dashboard/team/JoinTeamCard";
import CreateTeamModal from "@/components/features/dashboard/team/CreateTeamModal";
import ActiveTeamDashboard from "@/components/features/dashboard/team/ActiveTeamDashboard";
import { useMyTeam } from "@/features/team/hooks/use-my-team";
import { useJoinTeam, getJoinTeamErrorMessage } from "@/features/team/hooks/use-join-team";
import { useProfile } from "@/features/profile/hooks/use-profile";
import type { Team } from "@/types/index";

function getStoredRole(teamId: number): "leader" | "member" | null {
  if (typeof window === "undefined") return null;
  const stored = sessionStorage.getItem(`team-role:${teamId}`);
  return stored === "leader" || stored === "member" ? stored : null;
}

function storeRole(teamId: number, role: "leader" | "member") {
  if (typeof window === "undefined") return;
  sessionStorage.setItem(`team-role:${teamId}`, role);
}

function TeamPageContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const competitionSlug = searchParams.get("competitionSlug");

  const [isCreateTeamOpen, setIsCreateTeamOpen] = useState(false);
  const [joinError, setJoinError] = useState<string | null>(null);

  const { data: myTeamResponse, isLoading: isLoadingMyTeam, refetch: refetchMyTeam } = useMyTeam();
  const teamDetail = myTeamResponse?.data?.team ?? null;

  const joinTeamMutation = useJoinTeam();

  const { data: profileData } = useProfile();
  const userEmail = profileData?.data?.user?.email;

  // Determine role: if logged in user email matches team.leader.email, role is leader.
  // Otherwise fall back to storedRole or "member".
  const derivedRole: "leader" | "member" | null = (() => {
    if (!teamDetail) return null;
    if (userEmail && teamDetail.leader?.email === userEmail) {
      return "leader";
    }
    return getStoredRole(teamDetail.id) ?? "member";
  })();

  useEffect(() => {
    if (teamDetail && derivedRole) {
      storeRole(teamDetail.id, derivedRole);
    }
  }, [teamDetail, derivedRole]);

  const handleTeamCreated = (team: Team) => {
    storeRole(team.id, "leader");
    router.replace("/dashboard/team");
  };

  const handleTeamJoined = (code: string) => {
    setJoinError(null);
    joinTeamMutation.mutate(
      { code },
      {
        onSuccess: () => {
          setJoinError(null);
          refetchMyTeam();
        },
        onError: (err) => {
          setJoinError(getJoinTeamErrorMessage(err));
        },
      },
    );
  };

  const handleLeaveTeam = () => {
    if (teamDetail) {
      sessionStorage.removeItem(`team-role:${teamDetail.id}`);
    }
  };

  if (isLoadingMyTeam) {
    return (
      <div className="flex items-center justify-center min-h-[calc(100vh-5rem)] text-slate-400 text-sm">
        Memuat data tim...
      </div>
    );
  }

  return (
    <div className="relative w-full min-h-[calc(100vh-5rem)] flex flex-col items-center overflow-hidden">
      {!teamDetail && (
        <CreateTeamModal
          isOpen={isCreateTeamOpen}
          onClose={() => setIsCreateTeamOpen(false)}
          onCreateTeam={handleTeamCreated}
          competitionSlug={competitionSlug}
        />
      )}

      {teamDetail && derivedRole ? (
        <ActiveTeamDashboard
          team={teamDetail}
          role={derivedRole}
          userEmail={userEmail}
          onLeaveTeam={handleLeaveTeam}
        />
      ) : (
        <>
          <div className="absolute top-[40%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] opacity-[0.03] pointer-events-none z-0 flex items-center justify-center">
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
            className="w-full max-w-5xl mx-auto space-y-10 relative z-10"
          >
            <div>
              <h1 className="text-3xl font-bold text-slate-900 mb-2">
                Manajemen Tim
              </h1>
              <p className="text-slate-500 text-sm md:text-base">
                Mulai kolaborasi dengan tim Anda. Buat tim baru sebagai ketua
                atau gabung menggunakan kode undangan.
              </p>
            </div>

            {!competitionSlug && (
              <div className="rounded-xl border border-amber-200 bg-amber-50 px-5 py-4 text-sm text-amber-800">
                Anda belum memilih lomba. Silakan pilih lomba terlebih dahulu
                dari halaman Dashboard sebelum membuat tim baru. (Jika Anda mau
                gabung tim yang sudah ada lewat kode undangan, ini tidak perlu.)
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
              <CreateTeamCard
                onClick={() => setIsCreateTeamOpen(true)}
                disabled={!competitionSlug}
              />
              <JoinTeamCard
                onJoin={handleTeamJoined}
                isLoading={joinTeamMutation.isPending}
                errorMessage={joinError}
              />
            </div>
          </motion.div>
        </>
      )}
    </div>
  );
}

export default function TeamPage() {
  return (
    <Suspense fallback={null}>
      <TeamPageContent />
    </Suspense>
  );
}
