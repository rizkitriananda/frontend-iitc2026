// "use client";

import { useRouter } from "next/navigation";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { AlertTriangle } from "lucide-react";

interface StepGuardModalProps {
  isProfileComplete: boolean;
  isTeamComplete: boolean;
  isPaymentComplete?: boolean;
  requiredStep: "team" | "payment" | "submission";
}

interface GuardConfig {
  title: string;
  message: string;
  redirect: string;
  btn: string;
}

// Menentukan konfigurasi modal berdasarkan tahapan yang belum terpenuhi
function resolveGuardConfig({
  isProfileComplete,
  isTeamComplete,
  isPaymentComplete,
  requiredStep,
}: StepGuardModalProps): GuardConfig | null {
  if (!isProfileComplete) {
    return {
      title: "Profil Belum Lengkap",
      message:
        "Anda harus melengkapi data profil wajib terlebih dahulu sebelum dapat mengakses halaman ini.",
      redirect: "/dashboard/profile",
      btn: "Lengkapi Profil",
    };
  }

  if (
    (requiredStep === "payment" || requiredStep === "submission") &&
    !isTeamComplete
  ) {
    return {
      title: "Belum Memiliki Tim",
      message:
        "Anda harus membuat atau bergabung dengan tim terlebih dahulu untuk melanjutkan pendaftaran.",
      redirect: "/dashboard/team",
      btn: "Bentuk Tim",
    };
  }

  if (requiredStep === "submission" && !isPaymentComplete) {
    return {
      title: "Pembayaran Belum Selesai",
      message:
        "Pembayaran registrasi tim Anda belum selesai atau belum diverifikasi oleh admin.",
      redirect: "/dashboard/payment",
      btn: "Cek Pembayaran",
    };
  }

  return null;
}

export default function StepGuardModal(props: StepGuardModalProps) {
  const router = useRouter();
  const config = resolveGuardConfig(props);
  const isOpen = config !== null;

  return (
    <Dialog open={isOpen}>
      <DialogContent
        className="sm:max-w-100 p-8 rounded-2xl border-none shadow-2xl bg-white [&>button]:hidden flex flex-col items-center text-center outline-none"
        onInteractOutside={(e) => e.preventDefault()}
        onEscapeKeyDown={(e) => e.preventDefault()}
      >
        <DialogTitle className="hidden">{config?.title}</DialogTitle>

        <div className="w-16 h-16 bg-amber-50 rounded-full flex items-center justify-center mb-4">
          <AlertTriangle className="w-8 h-8 text-amber-500" />
        </div>

        <h2 className="text-xl font-bold text-slate-900 mb-2">
          {config?.title}
        </h2>
        <p className="text-sm text-slate-500 mb-6 leading-relaxed">
          {config?.message}
        </p>

        <div className="flex flex-col gap-3 w-full">
          <Button
            onClick={() => config && router.push(config.redirect)}
            className="w-full bg-[#2F2FE4] hover:bg-[#13076b] text-white font-medium h-12 rounded-xl shadow-sm transition-colors"
          >
            {config?.btn}
          </Button>

          <Button
            variant="ghost"
            onClick={() => router.push("/dashboard")}
            className="w-full text-slate-600 hover:bg-slate-100 font-medium h-11 rounded-xl transition-colors"
          >
            Kembali ke Beranda
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
