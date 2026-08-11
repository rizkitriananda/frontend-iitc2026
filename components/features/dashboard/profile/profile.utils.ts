import type { ProfileUser, ProfileDetail } from "@/types/index";
import type { ProfileFormValues } from "./ProfileInfoForm";

export interface ExtendedProfileDetail extends ProfileDetail {
  avatar?: string | null;
  twibbon?: string | null;
  grade?: string;
  institution?: string;
  student_id_number?: string;
  gender?: string;
}

export interface ProfileUserWithParticipant extends ProfileUser {
  participant?: ExtendedProfileDetail;
}

export interface ResponseDataStructure {
  user?: ProfileUserWithParticipant;
}

export const EMPTY_FORM_VALUES: ProfileFormValues = {
  fullName: "",
  grade: "pelajar",
  institution: "",
  email: "",
  phone: "",
  nisnOrNim: "",
  gender: "",
};

export interface DerivedProfileState {
  formValues: ProfileFormValues;
  avatarUrl: string | null;
  twibbonUrl: string | null;
}

// Fungsi murni (pure function) untuk mengekstrak data dari respons API
export function deriveProfileState(
  userData?: ProfileUserWithParticipant,
  detailData?: ExtendedProfileDetail,
): DerivedProfileState {
  return {
    formValues: {
      fullName: userData?.name || "",
      grade: detailData?.grade || "pelajar",
      institution: detailData?.institution || "",
      email: userData?.email || "",
      phone: userData?.phone || "",
      nisnOrNim: detailData?.student_id_number || "",
      gender: detailData?.gender || "",
    },
    avatarUrl: detailData?.avatar || userData?.avatar || null,
    twibbonUrl: detailData?.twibbon || null,
  };
}
