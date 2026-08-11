"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";

import maskotIITC from "@/public/Maskot2.svg";
import { Button } from "@/components/ui/button";

import ProfileTabs from "@/components/features/dashboard/profile/ProfileTabs";
import ProfileAvatarCard from "@/components/features/dashboard/profile/ProfileAvatarCard";
import ProfileInfoForm from "@/components/features/dashboard/profile/ProfileInfoForm";
import TwibbonUploadCard from "@/components/features/dashboard/profile/TwibbonUploadCard";
import MembershipStatusCard from "@/components/features/dashboard/profile/MembershipStatusCard";
import ProfileSkeleton from "@/components/features/dashboard/profile/ProfileSkeleton";

import { useProfile } from "@/features/profile/hooks/use-profile";
import {
  useUpdateProfile,
  getProfileErrorMessage,
} from "@/features/profile/hooks/use-update-profile";
import { useMyTeam } from "@/features/team/hooks/use-my-team";
import {
  deriveProfileState,
  type ResponseDataStructure,
  type ProfileUserWithParticipant,
  type ExtendedProfileDetail,
} from "@/components/features/dashboard/profile/profile.utils";
import type { ProfileFormValues } from "@/components/features/dashboard/profile/ProfileInfoForm";

// Komponen form editor profil
function ProfileEditor({
  userData,
  detailData,
  teamData,
}: {
  userData?: ProfileUserWithParticipant;
  detailData?: ExtendedProfileDetail;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  teamData?: any;
}) {
  const router = useRouter();
  const queryClient = useQueryClient();
  const updateProfileMutation = useUpdateProfile();

  const initialDerivedState = deriveProfileState(userData, detailData);

  const [formValues, setFormValues] = useState<ProfileFormValues>(
    initialDerivedState.formValues,
  );
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(
    initialDerivedState.avatarUrl,
  );
  const [twibbonFile, setTwibbonFile] = useState<File | null>(null);
  const [twibbonPreviewUrl, setTwibbonPreviewUrl] = useState<string | null>(
    initialDerivedState.twibbonUrl,
  );

  const handleChangeAvatar = (file: File) => {
    setAvatarFile(file);
    setAvatarPreview(URL.createObjectURL(file));
  };

  const handleRemoveAvatar = () => {
    setAvatarFile(null);
    setAvatarPreview(null);
  };

  const handleCancel = () => {
    setFormValues(initialDerivedState.formValues);
    setAvatarFile(null);
    setTwibbonFile(null);
    setAvatarPreview(initialDerivedState.avatarUrl);
    setTwibbonPreviewUrl(initialDerivedState.twibbonUrl);
    toast.info("Perubahan dibatalkan.");
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("fullName", formValues.fullName);
    formData.append("grade", formValues.grade || "pelajar");
    formData.append("institution", formValues.institution);
    formData.append("phone", formValues.phone);
    formData.append("gender", formValues.gender);
    if (formValues.nisnOrNim)
      formData.append("student_id_number", formValues.nisnOrNim);
    if (avatarFile) formData.append("avatar", avatarFile);
    if (twibbonFile) formData.append("twibbon", twibbonFile);

    updateProfileMutation.mutate(formData, {
      onSuccess: () => {
        toast.success("Profil berhasil diperbarui!");
        queryClient.invalidateQueries({ queryKey: ["user-profile"] });
        router.push("/dashboard");
      },
      onError: (error) => toast.error(getProfileErrorMessage(error)),
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="w-full space-y-6 relative z-10 pb-12"
    >
      <div>
        <h1 className="text-3xl font-bold text-slate-900 mb-2">
          Pengaturan Akun
        </h1>
        <p className="text-slate-500 text-sm md:text-base">
          Kelola informasi personal Anda untuk pengalaman kompetisi yang lebih
          baik di IITC 2026.
        </p>
      </div>

      <ProfileTabs activeTab="profil" />

      <form onSubmit={handleSave} className="space-y-6">
        <div className="bg-white border border-slate-200 rounded-2xl shadow-sm p-8 space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-[220px_1fr] gap-8">
            <ProfileAvatarCard
              avatarUrl={avatarPreview}
              maskotFallback={maskotIITC.src}
              onChangeAvatar={handleChangeAvatar}
              onRemoveAvatar={handleRemoveAvatar}
            />
            <ProfileInfoForm values={formValues} onChange={setFormValues} />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-2 items-stretch">
            <TwibbonUploadCard
              file={twibbonFile}
              onSelectFile={setTwibbonFile}
              existingUrl={twibbonPreviewUrl}
            />
            <MembershipStatusCard
              isVerified={!!teamData}
              competitionName={teamData?.competition?.name || "Belum Terdaftar"}
              competitionSlug={teamData?.competition?.slug}
            />
          </div>
        </div>

        <div className="flex items-center justify-end gap-3">
          <Button
            type="button"
            variant="outline"
            onClick={handleCancel}
            disabled={updateProfileMutation.isPending}
            className="border-slate-200 text-slate-700 hover:bg-slate-50 font-medium h-11 px-6 rounded-lg transition-colors"
          >
            Batal
          </Button>
          <Button
            type="submit"
            disabled={updateProfileMutation.isPending}
            className="bg-[#2F2FE4] hover:bg-[#13076b] text-white font-medium h-11 px-6 rounded-lg disabled:opacity-70 transition-colors"
          >
            {updateProfileMutation.isPending
              ? "Menyimpan..."
              : "Simpan Perubahan"}
          </Button>
        </div>
      </form>
    </motion.div>
  );
}

// Komponen utama pemuat data profil
export default function ProfilePage() {
  const { data: profileResponse, isLoading: isProfileLoading } = useProfile();
  const { data: teamResponse } = useMyTeam(true);

  if (isProfileLoading) return <ProfileSkeleton />;

  const responseData = profileResponse?.data as
    | ResponseDataStructure
    | undefined;
  const userData = responseData?.user;
  const detailData = userData?.participant;
  const teamData = teamResponse?.data?.team;

  return (
    <ProfileEditor
      key={userData?.id || "new-profile"}
      userData={userData}
      detailData={detailData}
      teamData={teamData}
    />
  );
}
