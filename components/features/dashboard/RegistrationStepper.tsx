import { Check, Users, Lock } from "lucide-react";

const steps = [
  {
    label: "Lengkapi Profil",
    status: "completed" as const,
  },
  {
    label: "Bentuk Tim",
    status: "active" as const,
  },
  {
    label: "Pembayaran",
    status: "locked" as const,
  },
  {
    label: "Unggah Karya",
    status: "locked" as const,
  },
];

// Warna garis penghubung ANTAR step (index 0 = garis antara step 1 & 2, dst)
// Sebuah segmen berwarna biru jika step sebelumnya sudah "completed"
const segmentColor = steps
  .slice(0, -1)
  .map((step) =>
    step.status === "completed" ? "bg-blue-600" : "bg-slate-200",
  );

export default function RegistrationStepper() {
  return (
    <div className="bg-white rounded-2xl p-8 border border-slate-200 shadow-sm">
      <h3 className="text-lg font-semibold text-slate-900 mb-8">
        Status Pendaftaran
      </h3>

      <div className="grid grid-cols-4 max-w-4xl mx-auto">
        {steps.map((step, i) => (
          <div key={step.label} className="relative flex flex-col items-center">
            {/* Separuh garis kiri, menyambung ke pusat kolom sebelumnya */}
            {i > 0 && (
              <div
                className={`absolute right-1/2 top-6 w-1/2 h-[2px] ${segmentColor[i - 1]}`}
              />
            )}
            {/* Separuh garis kanan, menyambung ke pusat kolom berikutnya */}
            {i < steps.length - 1 && (
              <div
                className={`absolute left-1/2 top-6 w-1/2 h-[2px] ${segmentColor[i]}`}
              />
            )}

            {/* Lingkaran ikon, di atas garis (z-10) supaya garis menyambung mulus di baliknya */}
            <div
              className={`relative z-10 w-12 h-12 rounded-full flex items-center justify-center shadow-sm ${
                step.status === "completed"
                  ? "bg-[#2F2FE4] text-white"
                  : step.status === "active"
                    ? "bg-white border-2 border-[#2F2FE4] text-[#2F2FE4]"
                    : "bg-slate-50 border border-slate-100 text-slate-300 shadow-none"
              }`}
            >
              {step.status === "completed" && <Check className="w-6 h-6" />}
              {step.status === "active" && <Users className="w-5 h-5" />}
              {step.status === "locked" && <Lock className="w-5 h-5" />}
            </div>

            <span
              className={`relative z-10 mt-3 text-sm font-medium text-center px-2 ${
                step.status === "completed"
                  ? "text-slate-900"
                  : step.status === "active"
                    ? "text-[#2F2FE4]"
                    : "text-slate-400"
              }`}
            >
              {step.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
