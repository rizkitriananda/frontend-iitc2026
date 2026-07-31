"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Key, Copy, UserPlus, Star, LogOut, Info, Check, Shield } from "lucide-react";
import Image from "next/image";
import maskotIITC from "@/public/Maskot2.svg";
import { Button } from "@/components/ui/button";

import RemoveMemberModal from "@/components/features/dashboard/team/RemoveMemberModal";
import LeaveTeamModal from "@/components/features/dashboard/team/LeaveTeamModal";
import type { ActiveTeamDashboardProps } from "@/types/team-type";

export default function ActiveTeamDashboard({
  team,
  role,
  userEmail,
  onLeaveTeam,
}: ActiveTeamDashboardProps) {
  const [isRemoveModalOpen, setIsRemoveModalOpen] = useState(false);
  const [isLeaveModalOpen, setIsLeaveModalOpen] = useState(false);
  const [selectedMemberName, setSelectedMemberName] = useState("");
  const [copied, setCopied] = useState(false);

  const handleCopyCode = () => {
    if (team?.code) {
      navigator.clipboard.writeText(team.code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleOpenRemoveModal = (memberName: string) => {
    setSelectedMemberName(memberName);
    setIsRemoveModalOpen(true);
  };

  const handleConfirmRemove = () => {
    setIsRemoveModalOpen(false);
  };

  const handleConfirmLeave = () => {
    setIsLeaveModalOpen(false);
    onLeaveTeam();
  };

  const leader = team.leader;
  const members = team.members ?? [];
  const competition = team.competition;

  const totalMembers = 1 + members.length;
  const maxMembers = competition?.max_members ?? 3;
  const emptySlotsCount = Math.max(0, maxMembers - totalMembers);

  const teamAvatarSrc = team.avatar && team.avatar.trim().length > 0 ? team.avatar : null;

  return (
    <>
      <RemoveMemberModal
        isOpen={isRemoveModalOpen}
        onClose={() => setIsRemoveModalOpen(false)}
        onConfirm={handleConfirmRemove}
        teamName={selectedMemberName || team.name}
      />

      <LeaveTeamModal
        isOpen={isLeaveModalOpen}
        onClose={() => setIsLeaveModalOpen(false)}
        onConfirm={handleConfirmLeave}
        teamName={team.name}
      />

      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-5xl mx-auto space-y-8 relative z-10"
      >
        {/* HEADER */}
        <div>
          <div className="inline-flex items-center gap-2 bg-[#2F2FE4]/10 rounded-full px-3.5 py-1.5 mb-4">
            <div className="w-2 h-2 rounded-full bg-[#2F2FE4]" />
            <span className="text-[10px] sm:text-xs font-bold text-slate-500 uppercase tracking-wider">
              Kategori Kompetisi:
            </span>
            <span className="text-[10px] sm:text-xs font-bold text-[#2F2FE4]">
              {competition?.name ?? "Lomba"}
            </span>
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-2">
            <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-2xl overflow-hidden border-2 border-indigo-100 bg-indigo-50 shrink-0 shadow-sm flex items-center justify-center">
              {teamAvatarSrc ? (
                <img
                  src={teamAvatarSrc}
                  alt={team.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <Image
                  src={maskotIITC}
                  alt="Maskot IITC"
                  fill
                  className="object-contain p-2"
                />
              )}
            </div>

            <div>
              <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-1">
                Team {team.name}
              </h1>
            </div>
          </div>

          <p className="text-slate-500 text-sm md:text-base">
            {role === "leader"
              ? "Kelola anggota tim Anda untuk mempersiapkan kompetisi."
              : "Lihat informasi tim dan daftar anggota tim Anda."}
          </p>
        </div>

        {/* SECTION: KODE UNDANGAN (KETUA TIM) */}
        {role === "leader" && (
          <div className="bg-[#f8fafc] border border-slate-200 rounded-2xl p-6 sm:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-sm">
            <div className="space-y-4 max-w-lg">
              <div className="flex items-center gap-2 text-slate-900">
                <Key className="w-5 h-5 text-[#2F2FE4]" />
                <h3 className="font-bold text-lg">Kode Undangan Tim</h3>
              </div>
              <p className="text-sm text-slate-500 leading-relaxed">
                Bagikan kode ini kepada calon anggota tim Anda agar mereka dapat
                bergabung. Satu tim maksimal terdiri dari {maxMembers} orang.
              </p>
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <div className="bg-slate-200/80 px-6 py-3 rounded-xl flex items-center justify-center border border-slate-300">
                  <span className="text-xl font-mono font-extrabold tracking-[0.25em] text-slate-900 uppercase">
                    {team.code}
                  </span>
                </div>
                <Button
                  onClick={handleCopyCode}
                  className="bg-[#2F2FE4] hover:bg-[#2323b8] text-white font-medium h-12 px-6 rounded-xl flex items-center gap-2 transition"
                >
                  {copied ? (
                    <>
                      <Check className="w-4 h-4 text-emerald-300" />
                      <span>Tersalin!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4" />
                      <span>Salin Kode</span>
                    </>
                  )}
                </Button>
              </div>
            </div>
            <div className="hidden md:flex w-32 h-32 rounded-2xl bg-indigo-50 items-center justify-center shrink-0 border border-indigo-100">
              <UserPlus className="w-10 h-10 text-indigo-500" />
            </div>
          </div>
        )}

        {/* SECTION: DAFTAR ANGGOTA TIM */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-lg text-slate-900">
              Anggota Tim ({totalMembers}/{maxMembers})
            </h3>
            {team.isSubmit && (
              <span className="text-xs font-semibold px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full">
                Karya Telah Diunggah
              </span>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* KETUA TIM CARD */}
            <div className="bg-white border-2 border-indigo-500/30 rounded-2xl p-6 flex flex-col items-center text-center relative shadow-sm hover:shadow-md transition">
              <div className="relative mb-4">
                <div className="w-20 h-20 rounded-full border-[3px] border-[#2F2FE4] overflow-hidden p-0.5 bg-indigo-50">
                  <img
                    src={
                      leader?.avatar && leader.avatar.trim().length > 0
                        ? leader.avatar
                        : `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(
                          leader?.name || "Leader",
                        )}&backgroundColor=f1f5f9`
                    }
                    alt={leader?.name || "Ketua Tim"}
                    className="w-full h-full rounded-full object-cover"
                  />
                </div>
                <div className="absolute -top-2 -right-6 bg-[#2F2FE4] text-white text-[10px] font-bold px-2.5 py-1 rounded-full flex items-center gap-1 shadow-sm border border-white">
                  <Star className="w-3 h-3 fill-current text-amber-300" /> Ketua Tim
                </div>
              </div>
              <h4 className="text-lg font-bold text-slate-900">
                {leader?.name || "Ketua Tim"}
              </h4>
              <p className="text-sm text-slate-500">{leader?.email || "-"}</p>
            </div>

            {/* ANGGOTA TIM CARDS */}
            {members.map((member) => {
              const isCurrentUser = userEmail && member.email === userEmail;

              return (
                <div
                  key={member.id}
                  className={`bg-white border rounded-2xl p-6 flex flex-col items-center text-center relative shadow-sm hover:shadow-md transition ${isCurrentUser ? "border-[#2F2FE4] ring-1 ring-[#2F2FE4]/30" : "border-slate-200"
                    }`}
                >
                  {isCurrentUser && (
                    <div className="absolute top-3 right-3 bg-[#2F2FE4] text-white text-[10px] font-bold px-2.5 py-0.5 rounded-full">
                      ANDA
                    </div>
                  )}
                  <div className="w-20 h-20 rounded-full overflow-hidden mb-4 bg-slate-100">
                    <img
                      src={
                        member.avatar && member.avatar.trim().length > 0
                          ? member.avatar
                          : `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(
                            member.name,
                          )}&backgroundColor=f1f5f9`
                      }
                      alt={member.name}
                      className="w-full h-full rounded-full object-cover"
                    />
                  </div>
                  <h4 className="text-lg font-bold text-slate-900">{member.name}</h4>
                  <p className="text-sm text-slate-500 mb-4">{member.email}</p>

                  <div className="mt-auto w-full pt-2 flex items-center justify-between border-t border-slate-100">
                    <span className="bg-slate-100 text-slate-700 text-xs font-semibold px-3 py-1 rounded-full">
                      Anggota
                    </span>

                    {role === "leader" && (
                      <button
                        onClick={() => handleOpenRemoveModal(member.name)}
                        className="text-red-500 hover:text-red-700 p-1.5 hover:bg-red-50 rounded-lg transition-colors"
                        title="Keluarkan Anggota"
                      >
                        <LogOut className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </div>
              );
            })}

            {/* SLOT KOSONG (JIKA MEMBERS < MAX_MEMBERS) */}
            {Array.from({ length: emptySlotsCount }).map((_, idx) => (
              <div
                key={`empty-slot-${idx}`}
                className="bg-slate-50/60 border-2 border-dashed border-slate-200 rounded-2xl p-6 flex flex-col items-center justify-center text-center"
              >
                <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center mb-4">
                  <UserPlus className="w-6 h-6 text-slate-400" />
                </div>
                <h4 className="text-sm font-bold text-slate-700 mb-1">
                  Menunggu Anggota...
                </h4>
                <p className="text-xs text-slate-400">
                  {role === "leader"
                    ? "Bagikan kode tim untuk mengundang."
                    : "Slot belum terisi."}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* SECTION: INFO ATAU DANGER ZONE */}
        {role === "leader" ? (
          <div className="bg-amber-50/80 border border-amber-200 rounded-xl p-5 flex items-start gap-3">
            <Info className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
            <div>
              <h4 className="font-bold text-sm text-amber-900 mb-1">Informasi Tim</h4>
              <p className="text-sm text-amber-800 leading-relaxed">
                Pastikan seluruh anggota tim telah melengkapi profil mereka. Tim
                dapat mengunggah karya kompetisi melalui menu &quot;Unggah Karya&quot;.
              </p>
            </div>
          </div>
        ) : (
          <div className="space-y-4 pt-4">
            <h3 className="font-bold text-lg text-red-500">Zona Bahaya</h3>
            <div className="bg-red-50/50 border border-red-200 rounded-2xl p-6 md:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
              <div>
                <h4 className="text-lg font-bold text-slate-900 mb-1">
                  Keluar dari Tim
                </h4>
                <p className="text-sm text-slate-600">
                  Tindakan ini tidak dapat dibatalkan. Anda harus diundang
                  kembali oleh Ketua Tim jika ingin bergabung ulang.
                </p>
              </div>
              <Button
                onClick={() => setIsLeaveModalOpen(true)}
                variant="outline"
                className="border-red-500 text-red-500 hover:bg-red-50 hover:text-red-600 font-semibold px-6 h-11 shrink-0 flex items-center gap-2"
              >
                <LogOut className="w-4 h-4" /> Keluar Tim
              </Button>
            </div>
          </div>
        )}
      </motion.div>
    </>
  );
}
