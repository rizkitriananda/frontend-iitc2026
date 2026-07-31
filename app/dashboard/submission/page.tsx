"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Info,
  FileText,
  CheckCircle2,
  PlusCircle,
  Link as LinkIcon,
  Lock,
  Users,
  Loader2,
  AlertCircle,
  UploadCloud,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";

import SuccessModal from "@/components/features/dashboard/submission/SuccessModal";
import { useMyTeam } from "@/features/team/hooks/use-my-team";
import { useProfile } from "@/features/profile/hooks/use-profile";
import { useUpdateSubmission } from "@/features/submission/hooks/use-update-submission";
import { updateSubmissionSchema } from "@/lib/schemas/submission.schema";
import type { ApiErrorResponse } from "@/types/submission-type";

export default function UploadWorkPage() {
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [driveLink, setDriveLink] = useState("");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const { data: myTeamResponse, isLoading: isLoadingTeam } = useMyTeam();
  const team = myTeamResponse?.data?.team ?? null;

  const { data: profileResponse } = useProfile();
  const userEmail = profileDataEmail(profileResponse);

  const isLeader = team && userEmail ? team.leader.email === userEmail : true;

  const updateSubmissionMutation = useUpdateSubmission();

  useEffect(() => {
    if (team?.submissionLink) {
      setDriveLink(team.submissionLink);
    }
  }, [team]);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setSuccessMessage(null);

    const validation = updateSubmissionSchema.safeParse({ submission: driveLink });
    if (!validation.success) {
      setErrorMessage(
        validation.error.issues[0]?.message || "Format tautan karya tidak valid",
      );
      return;
    }

    updateSubmissionMutation.mutate(
      { submission: driveLink },
      {
        onSuccess: (res) => {
          setSuccessMessage(res.message || "Tautan karya berhasil disimpan!");
          setIsSuccessModalOpen(true);
        },
        onError: (err: unknown) => {
          const apiErr = err as { response?: { data?: ApiErrorResponse } };
          setErrorMessage(
            apiErr?.response?.data?.message ||
              "Gagal menyimpan tautan karya. Silakan coba lagi.",
          );
        },
      },
    );
  };

  if (isLoadingTeam) {
    return (
      <div className="flex items-center justify-center min-h-[calc(100vh-5rem)] text-slate-400 text-sm gap-2">
        <Loader2 className="w-5 h-5 animate-spin text-indigo-600" />
        <span>Memuat data karya...</span>
      </div>
    );
  }

  return (
    <>
      <SuccessModal
        isOpen={isSuccessModalOpen}
        onClose={() => setIsSuccessModalOpen(false)}
      />

      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-5xl mx-auto space-y-8 relative z-10 pb-12"
      >
        {/* Header Page */}
        <div>
          {team?.competition?.name && (
            <div className="inline-flex items-center gap-2 bg-[#2F2FE4]/10 rounded-full px-3.5 py-1.5 mb-3">
              <div className="w-2 h-2 rounded-full bg-[#2F2FE4]" />
              <span className="text-[10px] sm:text-xs font-bold text-[#2F2FE4] uppercase tracking-wider">
                Kategori: {team.competition.name}
              </span>
            </div>
          )}
          <h1 className="text-3xl font-bold text-slate-900 mb-2">
            Unggah Karya {team ? `— Team ${team.name}` : ""}
          </h1>
          <p className="text-slate-500 text-sm md:text-base">
            Silakan unggah tautan karya tim Anda untuk tahap penjurian kompetisi IITC 2026.
          </p>
        </div>

        {/* Alert Status Submission */}
        {team?.isSubmit && (
          <div className="w-full bg-emerald-50 border border-emerald-200 rounded-xl p-4 flex items-center gap-3 text-emerald-800 text-sm font-medium">
            <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
            <span>Karya tim Anda telah berhasil diunggah sebelumnya. Anda dapat memperbaruinya sebelum batas waktu.</span>
          </div>
        )}

        {/* Alert Khusus Ketua Tim */}
        {!isLeader && (
          <div className="w-full bg-amber-50 border border-amber-200 rounded-xl p-4 flex items-start gap-3 shadow-sm">
            <Info className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
            <div>
              <h4 className="text-sm font-semibold text-amber-800 mb-1">
                Akses Terbatas (Anggota Tim)
              </h4>
              <p className="text-sm text-amber-700">
                Hanya Ketua Tim yang dapat mengunggah dan mengubah tautan karya.
              </p>
            </div>
          </div>
        )}

        {/* Alert Error / Success */}
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

        {/* Persyaratan File */}
        <Card className="border-slate-200 shadow-sm rounded-2xl overflow-hidden bg-white">
          <CardContent className="p-8 space-y-6">
            <div className="flex items-center gap-2 text-slate-900">
              <FileText className="w-5 h-5 text-[#2F2FE4]" />
              <h4 className="font-bold text-base">Persyaratan Pengunggahan File</h4>
            </div>

            <div className="bg-[#f8fafc] border border-slate-100 rounded-xl p-6 space-y-3">
              <p className="text-sm text-slate-600 font-medium">
                Pastikan folder Google Drive atau link berkas Anda berisi file berikut:
              </p>
              <div className="space-y-2.5 pt-1">
                <div className="flex items-center gap-3 text-sm text-slate-700">
                  <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0" />
                  <span>Proposal Karya (Format PDF)</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-slate-700">
                  <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0" />
                  <span>Surat Pernyataan Orisinalitas (Format PDF bertanda tangan)</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-slate-700">
                  <PlusCircle className="w-4 h-4 text-slate-400 shrink-0" />
                  <span>
                    Dokumentasi Teknis / Showcase Video / File Aset{" "}
                    <span className="text-slate-400">(Sesuai panduan lomba)</span>
                  </span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* FORM INPUT LINK & TOMBOL SIMPAN */}
        <Card className="border-slate-200 shadow-sm rounded-2xl overflow-hidden bg-white">
          <CardContent className="p-8">
            <form onSubmit={handleSave} className="space-y-6">
              <div className="space-y-2">
                <Label
                  htmlFor="driveLink"
                  className="text-sm font-bold text-slate-900 flex items-center justify-between"
                >
                  <span>Link Google Drive / Tautan Karya</span>
                  {team?.isSubmit && (
                    <span className="text-xs text-emerald-600 font-normal">
                      Tersimpan: {team.submissionLink}
                    </span>
                  )}
                </Label>
                <div className="relative">
                  <LinkIcon className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
                  <Input
                    id="driveLink"
                    value={driveLink}
                    disabled={!isLeader || updateSubmissionMutation.isPending}
                    onChange={(e) => setDriveLink(e.target.value)}
                    placeholder="https://drive.google.com/..."
                    className="pl-11 h-12 bg-white border-slate-200 focus-visible:ring-[#2F2FE4] text-slate-900 rounded-xl"
                  />
                </div>
              </div>

              {/* Tombol Simpan Link */}
              <div className="flex justify-end">
                <Button
                  type="submit"
                  disabled={!isLeader || !driveLink.trim() || updateSubmissionMutation.isPending}
                  className={`font-medium px-8 h-12 rounded-xl shadow-sm transition-all flex items-center gap-2 ${
                    driveLink.trim() && isLeader
                      ? "bg-[#2F2FE4] hover:bg-[#2323b8] text-white cursor-pointer"
                      : "bg-slate-200 text-slate-400 cursor-not-allowed"
                  }`}
                >
                  {updateSubmissionMutation.isPending ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Menyimpan Link...</span>
                    </>
                  ) : (
                    <>
                      <UploadCloud className="w-4 h-4" />
                      <span>Simpan Link Karya</span>
                    </>
                  )}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
                {/* 2. KATEGORI: GEN AI */}
        {/* <div className="space-y-3">
          <h3 className="text-lg font-bold text-slate-800">GenAI :</h3>
          <Card className="border-slate-200 shadow-sm rounded-2xl overflow-hidden bg-white">
            <CardContent className="p-8 space-y-6">
              <div className="flex items-center gap-2 text-slate-900">
                <Sparkles className="w-5 h-5 text-purple-600" />
                <h4 className="font-bold text-base">Persyaratan File</h4>
              </div>

              <div className="bg-[#f8fafc] border border-slate-100 rounded-xl p-6 space-y-3">
                <p className="text-sm text-slate-600 font-medium">
                  Pastikan folder Google Drive Anda berisi file berikut:
                </p>
                <div className="space-y-2.5 pt-1">
                  <div className="flex items-center gap-3 text-sm text-slate-700">
                    <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0" />
                    <span>Video</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-slate-700">
                    <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0" />
                    <span>Proposal Karya</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-slate-700">
                    <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0" />
                    <span>Surat Pernyataan Orisinalitas (format PDF)</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-slate-700">
                    <PlusCircle className="w-4 h-4 text-slate-400 shrink-0" />
                    <span>Dokumentasi Teknis (opsional).</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-slate-700">
                    <FileText className="w-4 h-4 text-slate-400 shrink-0" />
                    <span>Video Showcase (format MP4).</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div> */}

        {/* 3. KATEGORI: UI/UX */}
        {/* <div className="space-y-3">
          <h3 className="text-lg font-bold text-slate-800">UI/UX :</h3>
          <Card className="border-slate-200 shadow-sm rounded-2xl overflow-hidden bg-white">
            <CardContent className="p-8 space-y-6">
              <div className="flex items-center gap-2 text-slate-900">
                <LayoutGrid className="w-5 h-5 text-indigo-600" />
                <h4 className="font-bold text-base">Persyaratan File</h4>
              </div>

              <div className="bg-[#f8fafc] border border-slate-100 rounded-xl p-6 space-y-3">
                <p className="text-sm text-slate-600 font-medium">
                  Pastikan folder Google Drive Anda berisi file berikut:
                </p>
                <div className="space-y-2.5 pt-1">
                  <div className="flex items-center gap-3 text-sm text-slate-700">
                    <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0" />
                    <span>Proposal Karya</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-slate-700">
                    <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0" />
                    <span>Surat Pernyataan Orisinalitas (format PDF)</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-slate-700">
                    <FileText className="w-4 h-4 text-slate-400 shrink-0" />
                    <span>Prototype Figma/Lainya (format LINK)</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-slate-700">
                    <FileText className="w-4 h-4 text-slate-400 shrink-0" />
                    <span>Video Showcase (format MP4).</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div> */}            
        {/* Card Bawah: Catatan Akses Google Drive */}
        <Card className="border-dashed border-2 border-slate-200 shadow-none rounded-2xl bg-[#fafafa]">
          <CardContent className="p-6 flex items-start gap-4">
            <div className="w-10 h-10 rounded-xl bg-orange-50 flex items-center justify-center text-orange-500 shrink-0 mt-0.5">
              <Lock className="w-5 h-5" />
            </div>
            <div className="space-y-3">
              <h3 className="font-bold text-slate-900">Akses Google Drive / Tautan</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Pastikan tautan Google Drive Anda disetel ke &quot;Public&quot; atau
                &quot;Anyone with the link&quot; agar dewan juri dapat mengakses dan menilai karya Anda tanpa hambatan.
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
    </>
  );
}

function profileDataEmail(res: unknown): string | undefined {
  if (res && typeof res === "object" && "data" in res) {
    const dataObj = (res as { data?: { user?: { email?: string } } }).data;
    return dataObj?.user?.email;
  }
  return undefined;
}
