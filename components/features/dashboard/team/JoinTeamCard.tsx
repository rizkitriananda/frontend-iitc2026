"use client";

import { useState } from "react";
import { Key, Loader2, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";

interface JoinTeamCardProps {
  onJoin?: (code: string) => void;
  isLoading?: boolean;
  errorMessage?: string | null;
}

export default function JoinTeamCard({
  onJoin,
  isLoading = false,
  errorMessage = null,
}: JoinTeamCardProps) {
  const [teamCode, setTeamCode] = useState("");
  const [localError, setLocalError] = useState<string | null>(null);

  const handleJoin = (e?: React.FormEvent) => {
    e?.preventDefault();
    setLocalError(null);

    const cleanCode = teamCode.trim();
    if (cleanCode.length === 0) {
      setLocalError("Masukkan kode tim terlebih dahulu");
      return;
    }

    if (onJoin) {
      onJoin(cleanCode);
    }
  };

  const activeError = localError || errorMessage;

  return (
    <Card className="border-slate-200 shadow-sm hover:shadow-md transition-shadow rounded-2xl overflow-hidden h-full">
      <CardContent className="p-8 flex flex-col h-full">
        <div className="w-12 h-12 rounded-xl bg-orange-50 flex items-center justify-center mb-6">
          <Key className="w-6 h-6 text-[#a85914]" />
        </div>

        <div className="flex-1 space-y-3 mb-6">
          <h2 className="text-xl font-bold text-slate-900">Gabung ke Tim</h2>
          <p className="text-sm text-slate-500 leading-relaxed">
            Sudah memiliki tim? Masukkan kode undangan 6 digit yang diberikan
            oleh ketua tim Anda untuk bergabung ke dalam ruang kerja mereka.
          </p>
        </div>

        {activeError && (
          <div className="mb-4 p-3 rounded-xl bg-rose-50 border border-rose-200 text-xs text-rose-700 flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0 text-rose-500" />
            <span>{activeError}</span>
          </div>
        )}

        <form onSubmit={handleJoin} className="space-y-2">
          <Label
            htmlFor="teamCode"
            className="text-xs font-semibold text-slate-700"
          >
            Kode Tim
          </Label>
          <div className="flex gap-3">
            <Input
              id="teamCode"
              value={teamCode}
              onChange={(e) => {
                setTeamCode(e.target.value);
                if (localError) setLocalError(null);
              }}
              placeholder="MISAL: A1B2C3"
              className="h-11 border-slate-200 bg-slate-50 focus-visible:ring-[#2F2FE4] uppercase font-medium flex-1"
              maxLength={10}
              disabled={isLoading}
            />
            <Button
              type="submit"
              disabled={isLoading || !teamCode.trim()}
              variant="outline"
              className="h-11 px-8 border-[#2F2FE4] text-[#1a0b8c] hover:bg-indigo-50 font-semibold rounded-lg shrink-0 disabled:opacity-50"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin mr-2" />
                  <span>Memproses...</span>
                </>
              ) : (
                "Gabung"
              )}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
