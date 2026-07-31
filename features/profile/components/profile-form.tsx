"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion, AnimatePresence } from "framer-motion";
import {
  User,
  GraduationCap,
  Building2,
  IdCard,
  Phone,
  UploadCloud,
  CheckCircle2,
  AlertCircle,
  Loader2,
  X,
  Image as ImageIcon,
  Sparkles,
} from "lucide-react";
import Image from "next/image";

import {
  updateProfileSchema,
  type UpdateProfileSchemaInput,
} from "@/lib/schemas/profile.schema";
import { useUpdateProfile } from "@/features/profile/hooks/use-update-profile";
import { useProfile } from "@/features/profile/hooks/use-profile";
import type { ApiErrorResponse } from "@/types/profile-type";

function formatImageUrl(url: string | null | undefined): string {
  if (!url || typeof url !== "string") return "";
  const trimmed = url.trim();
  if (trimmed.length === 0) return "";
  if (
    trimmed.startsWith("blob:") ||
    trimmed.startsWith("data:") ||
    trimmed.startsWith("http://") ||
    trimmed.startsWith("https://")
  ) {
    return trimmed;
  }
  const cleanPath = trimmed.startsWith("/") ? trimmed.slice(1) : trimmed;
  return `https://intermediaiitc.com/public/${cleanPath}`;
}

export default function ProfileForm() {
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const [twibbonPreview, setTwibbonPreview] = useState<string | null>(null);

  const { data: profileResponse, isLoading: isFetchingProfile } = useProfile();
  const updateProfileMutation = useUpdateProfile();

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm<UpdateProfileSchemaInput>({
    resolver: zodResolver(updateProfileSchema),
    defaultValues: {
      fullName: "",
      grade: "",
      institution: "",
      student_id_number: "",
      gender: "male",
      phone: "",
    },
  });

  // Pre-fill form when profile data is fetched from GET /api/profile
  useEffect(() => {
    if (profileResponse?.data?.user) {
      const u = profileResponse.data.user;
      const p = u.participant;
      const uObj = u as unknown as Record<string, unknown>;

      const rawGender = (p?.gender || uObj?.gender || "").toString().toLowerCase();
      const normalizedGender =
        rawGender === "female" || rawGender === "perempuan" ? "female" : "male";

      const studentId = (
        p?.student_id_number ??
        uObj?.student_id_number ??
        ""
      ).toString();

      reset({
        fullName: u.name ?? (uObj?.fullName as string) ?? "",
        phone: u.phone ? String(u.phone) : "",
        grade: p?.grade ?? (uObj?.grade as string) ?? "",
        institution: p?.institution ?? (uObj?.institution as string) ?? "",
        student_id_number: studentId,
        gender: normalizedGender,
      });

      const initialAvatar =
        p?.avatar ||
        p?.photo_identity ||
        (uObj?.avatar as string) ||
        (uObj?.photo_identity as string);
      const initialTwibbon = p?.twibbon || (uObj?.twibbon as string);

      if (initialAvatar && typeof initialAvatar === "string") {
        setAvatarPreview(initialAvatar);
      }
      if (initialTwibbon && typeof initialTwibbon === "string") {
        setTwibbonPreview(initialTwibbon);
      }
    }
  }, [profileResponse, reset]);

  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: "avatar" | "twibbon",
  ) => {
    const file = e.target.files?.[0];
    if (file) {
      setValue(field, file, { shouldValidate: true });
      const objectUrl = URL.createObjectURL(file);
      if (field === "avatar") {
        if (avatarPreview && avatarPreview.startsWith("blob:")) {
          URL.revokeObjectURL(avatarPreview);
        }
        setAvatarPreview(objectUrl);
      } else {
        if (twibbonPreview && twibbonPreview.startsWith("blob:")) {
          URL.revokeObjectURL(twibbonPreview);
        }
        setTwibbonPreview(objectUrl);
      }
    }
  };

  const removeFile = (field: "avatar" | "twibbon") => {
    setValue(field, null, { shouldValidate: true });
    if (field === "avatar") {
      if (avatarPreview && avatarPreview.startsWith("blob:")) {
        URL.revokeObjectURL(avatarPreview);
      }
      setAvatarPreview(null);
    } else {
      if (twibbonPreview && twibbonPreview.startsWith("blob:")) {
        URL.revokeObjectURL(twibbonPreview);
      }
      setTwibbonPreview(null);
    }
  };

  const onSubmit = (data: UpdateProfileSchemaInput) => {
    setSuccessMessage(null);
    setErrorMessage(null);

    updateProfileMutation.mutate(
      {
        fullName: data.fullName,
        grade: data.grade,
        institution: data.institution,
        student_id_number: data.student_id_number,
        gender: data.gender,
        phone: data.phone,
        avatar: data.avatar ?? null,
        twibbon: data.twibbon ?? null,
      },
      {
        onSuccess: (res) => {
          setSuccessMessage(res.message || "Profil berhasil diperbarui!");
        },
        onError: (err: unknown) => {
          const apiErr = err as { response?: { data?: ApiErrorResponse } };
          setErrorMessage(
            apiErr?.response?.data?.message ||
              "Gagal memperbarui profil. Silakan periksa kembali data Anda.",
          );
        },
      },
    );
  };

  if (isFetchingProfile) {
    return (
      <div className="max-w-4xl mx-auto p-12 text-center bg-white border border-slate-200 rounded-2xl shadow-sm space-y-4">
        <Loader2 className="w-8 h-8 text-indigo-600 animate-spin mx-auto" />
        <p className="text-slate-500 text-sm font-medium">
          Memuat data profil Anda...
        </p>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="max-w-4xl mx-auto space-y-6"
    >
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-blue-700 via-indigo-600 to-indigo-800 rounded-2xl p-6 sm:p-8 text-white shadow-lg relative overflow-hidden">
        <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-white/10 rounded-full blur-2xl pointer-events-none" />
        <div className="flex items-center gap-3 text-blue-200 mb-2 font-medium text-sm">
          <Sparkles className="w-4 h-4" /> Pengaturan Akun
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
          Pembaruan Profil Peserta
        </h1>
        <p className="text-blue-100 text-sm sm:text-base mt-1 max-w-xl">
          Lengkapi dan perbarui data diri Anda untuk keperluan verifikasi berkas
          kompetisi IITC 2026.
        </p>
      </div>

      {/* Alert Notifikasi */}
      <AnimatePresence mode="wait">
        {successMessage && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="flex items-center gap-3 bg-emerald-50 border border-emerald-200 text-emerald-800 p-4 rounded-xl text-sm font-medium"
          >
            <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
            <span>{successMessage}</span>
          </motion.div>
        )}

        {errorMessage && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="flex items-center gap-3 bg-rose-50 border border-rose-200 text-rose-800 p-4 rounded-xl text-sm font-medium"
          >
            <AlertCircle className="w-5 h-5 text-rose-600 shrink-0" />
            <span>{errorMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Card 1: Data Diri */}
        <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-sm space-y-5">
          <div className="border-b border-slate-100 pb-3">
            <h2 className="text-lg font-bold text-slate-800 flex items-center gap-2">
              <User className="w-5 h-5 text-indigo-600" /> Informasi Diri
            </h2>
            <p className="text-slate-500 text-xs mt-0.5">
              Isi data identitas sesuai kartu identitas resmi
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {/* Full Name */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-700 flex items-center gap-1.5">
                <User className="w-3.5 h-3.5 text-slate-400" /> Nama Lengkap
              </label>
              <input
                type="text"
                placeholder="Masukkan nama lengkap"
                {...register("fullName")}
                className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-slate-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 outline-none transition"
              />
              {errors.fullName && (
                <p className="text-xs text-rose-500 mt-1">
                  {errors.fullName.message}
                </p>
              )}
            </div>

            {/* Phone */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-700 flex items-center gap-1.5">
                <Phone className="w-3.5 h-3.5 text-slate-400" /> Nomor Telepon / WhatsApp
              </label>
              <input
                type="text"
                placeholder="Contoh: 081234567890"
                {...register("phone")}
                className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-slate-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 outline-none transition"
              />
              {errors.phone && (
                <p className="text-xs text-rose-500 mt-1">
                  {errors.phone.message}
                </p>
              )}
            </div>

            {/* Gender */}
            <div className="space-y-1.5 sm:col-span-2">
              <label className="text-xs font-semibold text-slate-700">
                Jenis Kelamin
              </label>
              <div className="flex items-center gap-4 pt-1">
                <label className="flex items-center gap-2 text-sm text-slate-700 cursor-pointer">
                  <input
                    type="radio"
                    value="male"
                    {...register("gender")}
                    className="w-4 h-4 text-indigo-600 focus:ring-indigo-500 border-slate-300"
                  />
                  Laki-laki
                </label>
                <label className="flex items-center gap-2 text-sm text-slate-700 cursor-pointer">
                  <input
                    type="radio"
                    value="female"
                    {...register("gender")}
                    className="w-4 h-4 text-indigo-600 focus:ring-indigo-500 border-slate-300"
                  />
                  Perempuan
                </label>
              </div>
              {errors.gender && (
                <p className="text-xs text-rose-500 mt-1">
                  {errors.gender.message}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Card 2: Pendidikan / Instansi */}
        <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-sm space-y-5">
          <div className="border-b border-slate-100 pb-3">
            <h2 className="text-lg font-bold text-slate-800 flex items-center gap-2">
              <GraduationCap className="w-5 h-5 text-indigo-600" /> Data Akademik & Instansi
            </h2>
            <p className="text-slate-500 text-xs mt-0.5">
              Informasi mengenai sekolah, universitas, atau institusi Anda
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {/* Institution */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-700 flex items-center gap-1.5">
                <Building2 className="w-3.5 h-3.5 text-slate-400" /> Instansi / Sekolah / Universitas
              </label>
              <input
                type="text"
                placeholder="Contoh: Universitas Amikom Yogyakarta"
                {...register("institution")}
                className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-slate-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 outline-none transition"
              />
              {errors.institution && (
                <p className="text-xs text-rose-500 mt-1">
                  {errors.institution.message}
                </p>
              )}
            </div>

            {/* Grade */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-700 flex items-center gap-1.5">
                <GraduationCap className="w-3.5 h-3.5 text-slate-400" /> Jenjang / Kelas / Tingkat
              </label>
              <input
                type="text"
                placeholder="Contoh: S1 / Kelas 12 / Semester 4"
                {...register("grade")}
                className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-slate-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 outline-none transition"
              />
              {errors.grade && (
                <p className="text-xs text-rose-500 mt-1">
                  {errors.grade.message}
                </p>
              )}
            </div>

            {/* Student ID Number */}
            <div className="space-y-1.5 sm:col-span-2">
              <label className="text-xs font-semibold text-slate-700 flex items-center gap-1.5">
                <IdCard className="w-3.5 h-3.5 text-slate-400" /> Nomor Induk (NIM / NISN / No. Kartu Pelajar)
              </label>
              <input
                type="text"
                placeholder="Masukkan NIM atau NISN"
                {...register("student_id_number")}
                className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-slate-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 outline-none transition"
              />
              {errors.student_id_number && (
                <p className="text-xs text-rose-500 mt-1">
                  {errors.student_id_number.message}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Card 3: Upload Berkas (Avatar & Twibbon) */}
        <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-sm space-y-5">
          <div className="border-b border-slate-100 pb-3">
            <h2 className="text-lg font-bold text-slate-800 flex items-center gap-2">
              <ImageIcon className="w-5 h-5 text-indigo-600" /> Foto Profil & Twibbon
            </h2>
            <p className="text-slate-500 text-xs mt-0.5">
              Unggah foto profil resmi dan bukti pemakaian Twibbon (Format: JPG/PNG/WEBP, Maks 5MB)
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">

            {/* Avatar Upload */}
            <div className="space-y-2">
              <label className="text-xs font-semibold text-slate-700 block">
                Foto Profil (Avatar)
              </label>
              {avatarPreview ? (
                <div className="relative w-full h-44 rounded-xl border border-slate-200 overflow-hidden bg-slate-50 flex items-center justify-center group">
                  <img
                    src={formatImageUrl(avatarPreview)}
                    alt="Preview Avatar"
                    className="w-full h-full object-cover"
                  />
                  <button
                    type="button"
                    onClick={() => removeFile("avatar")}
                    className="absolute top-2 right-2 p-1.5 bg-slate-900/70 hover:bg-rose-600 text-white rounded-full transition shadow-md"
                    title="Hapus foto"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <label className="flex flex-col items-center justify-center h-44 border-2 border-dashed border-slate-200 hover:border-indigo-400 rounded-xl cursor-pointer bg-slate-50/50 hover:bg-indigo-50/30 transition text-center p-4">
                  <UploadCloud className="w-8 h-8 text-indigo-500 mb-2" />
                  <span className="text-xs font-semibold text-slate-700">
                    Klik untuk unggah Avatar
                  </span>
                  <span className="text-[11px] text-slate-400 mt-1">
                    PNG, JPG, WEBP maks. 5MB
                  </span>
                  <input
                    type="file"
                    accept="image/png, image/jpeg, image/jpg, image/webp"
                    className="hidden"
                    onChange={(e) => handleFileChange(e, "avatar")}
                  />
                </label>
              )}
              {errors.avatar && (
                <p className="text-xs text-rose-500 mt-1">
                  {errors.avatar.message as string}
                </p>
              )}
            </div>

            {/* Twibbon Upload */}
            <div className="space-y-2">
              <label className="text-xs font-semibold text-slate-700 block">
                Foto Bukti Twibbon
              </label>
              {twibbonPreview ? (
                <div className="relative w-full h-44 rounded-xl border border-slate-200 overflow-hidden bg-slate-50 flex items-center justify-center group">
                  <img
                    src={formatImageUrl(twibbonPreview)}
                    alt="Preview Twibbon"
                    className="w-full h-full object-cover"
                  />
                  <button
                    type="button"
                    onClick={() => removeFile("twibbon")}
                    className="absolute top-2 right-2 p-1.5 bg-slate-900/70 hover:bg-rose-600 text-white rounded-full transition shadow-md"
                    title="Hapus twibbon"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <label className="flex flex-col items-center justify-center h-44 border-2 border-dashed border-slate-200 hover:border-indigo-400 rounded-xl cursor-pointer bg-slate-50/50 hover:bg-indigo-50/30 transition text-center p-4">
                  <UploadCloud className="w-8 h-8 text-indigo-500 mb-2" />
                  <span className="text-xs font-semibold text-slate-700">
                    Klik untuk unggah Twibbon
                  </span>
                  <span className="text-[11px] text-slate-400 mt-1">
                    PNG, JPG, WEBP maks. 5MB
                  </span>
                  <input
                    type="file"
                    accept="image/png, image/jpeg, image/jpg, image/webp"
                    className="hidden"
                    onChange={(e) => handleFileChange(e, "twibbon")}
                  />
                </label>
              )}
              {errors.twibbon && (
                <p className="text-xs text-rose-500 mt-1">
                  {errors.twibbon.message as string}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex justify-end pt-2">
          <button
            type="submit"
            disabled={updateProfileMutation.isPending}
            className="flex items-center gap-2 px-6 py-3 bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 text-white font-semibold text-sm rounded-xl shadow-md hover:shadow-lg transition-all disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer"
          >
            {updateProfileMutation.isPending ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Menyimpan Profil...</span>
              </>
            ) : (
              <>
                <CheckCircle2 className="w-4 h-4" />
                <span>Simpan Perubahan</span>
              </>
            )}
          </button>
        </div>
      </form>
    </motion.div>
  );
}
