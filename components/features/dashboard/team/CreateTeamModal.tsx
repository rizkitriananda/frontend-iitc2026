"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2 } from "lucide-react";
import type { CreateTeamModalProps } from "@/types/team-type";
import {
  createTeamSchema,
  type CreateTeamInput,
} from "@/lib/schemas/team.schema";
import {
  useJoinCompetition,
  getJoinCompetitionErrorMessage,
} from "@/features/team/hooks/use-join-competition";

export default function CreateTeamModal({
  isOpen,
  onClose,
  onCreateTeam,
  competitionSlug,
}: CreateTeamModalProps) {
  const joinCompetitionMutation = useJoinCompetition(competitionSlug ?? "");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CreateTeamInput>({
    resolver: zodResolver(createTeamSchema),
  });

  const handleDialogChange = (open: boolean) => {
    if (!open) {
      onClose();
      setTimeout(() => {
        reset();
        joinCompetitionMutation.reset();
      }, 200);
    }
  };

  const onSubmit = (values: CreateTeamInput) => {
    // Jaga-jaga: tombol pemicu modal ini seharusnya sudah disabled kalau
    // competitionSlug kosong (lihat CreateTeamCard di team/page.tsx), tapi
    // dicek lagi di sini supaya gak ada request ngaco ke /api/teams/undefined.
    if (!competitionSlug) return;

    joinCompetitionMutation.mutate(values, {
      onSuccess: (response) => {
        onCreateTeam(response.data.team);
        reset();
        onClose();
      },
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleDialogChange}>
      <DialogContent className="sm:max-w-[480px] p-8 rounded-2xl border-none shadow-xl bg-white [&>button]:hidden">
        <DialogTitle className="hidden">Buat Tim Baru</DialogTitle>

        <div className="space-y-6">
          <div className="space-y-2">
            <h2 className="text-2xl md:text-3xl font-semibold text-slate-900">
              Buat Tim Baru
            </h2>
            <p className="text-slate-600 text-sm md:text-base leading-relaxed">
              Silakan masukkan nama tim Anda untuk memulai kompetisi.
            </p>
          </div>

          {joinCompetitionMutation.isError && (
            <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
              {getJoinCompetitionErrorMessage(joinCompetitionMutation.error)}
            </div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} noValidate>
            <div className="space-y-2 pt-2">
              <Label
                htmlFor="teamName"
                className="text-sm font-medium text-slate-900"
              >
                Nama Tim
              </Label>
              <Input
                id="teamName"
                placeholder="Masukkan nama tim (misal: Majapahit Tech)"
                className="h-12 bg-slate-50/50 border-slate-200 ring-1 focus-visible:ring-[#2F2FE4] text-slate-900"
                {...register("name")}
              />
              {errors.name && (
                <p className="text-sm text-red-500">{errors.name.message}</p>
              )}
            </div>

            <div className="flex items-center justify-end gap-2 pt-6">
              <Button
                type="button"
                variant="ghost"
                onClick={onClose}
                disabled={joinCompetitionMutation.isPending}
                className="text-[#2F2FE4] hover:bg-indigo-50 hover:text-[#13076b] font-semibold px-6 h-11"
              >
                Batal
              </Button>
              <Button
                type="submit"
                disabled={joinCompetitionMutation.isPending}
                className="bg-[#2F2FE4] hover:bg-[#13076b] text-white font-medium px-8 h-11 rounded-lg disabled:opacity-70"
              >
                {joinCompetitionMutation.isPending ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin mr-2" />
                    Membuat...
                  </>
                ) : (
                  "Buat Tim"
                )}
              </Button>
            </div>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
}
