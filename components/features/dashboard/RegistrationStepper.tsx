// components/features/dashboard/RegistrationStepper.tsx
import {
  Check,
  Users,
  Lock,
  UserPen,
  CreditCard,
  CloudUpload,
} from "lucide-react";

interface RegistrationStepperProps {
  isProfileComplete: boolean;
  hasTwibbon: boolean;
  isTeamComplete: boolean;
  isPaymentComplete: boolean;
  isSubmissionComplete: boolean;
}

export default function RegistrationStepper({
  isProfileComplete,
  hasTwibbon,
  isTeamComplete,
  isPaymentComplete,
  isSubmissionComplete,
}: RegistrationStepperProps) {
  const isFullProfileCompleted = isProfileComplete && hasTwibbon;

  const steps = [
    {
      label: "Lengkapi Profil",
      status: isFullProfileCompleted ? "completed" : "active",
      icon: isFullProfileCompleted ? (
        <Check className="w-6 h-6" />
      ) : (
        <UserPen className="w-5 h-5" />
      ),
    },
    {
      label: "Bentuk Tim",
      status: !isProfileComplete
        ? "locked"
        : isTeamComplete
          ? "completed"
          : "active",
      icon: isTeamComplete ? (
        <Check className="w-6 h-6" />
      ) : isProfileComplete ? (
        <Users className="w-5 h-5" />
      ) : (
        <Lock className="w-5 h-5" />
      ),
    },
    {
      label: "Pembayaran",
      status: !isTeamComplete
        ? "locked"
        : isPaymentComplete
          ? "completed"
          : "active",
      icon: isPaymentComplete ? (
        <Check className="w-6 h-6" />
      ) : isTeamComplete ? (
        <CreditCard className="w-5 h-5" />
      ) : (
        <Lock className="w-5 h-5" />
      ),
    },
    {
      label: "Unggah Karya",
      status: !isPaymentComplete
        ? "locked"
        : isSubmissionComplete
          ? "completed"
          : "active",
      icon: isSubmissionComplete ? (
        <Check className="w-6 h-6" />
      ) : isPaymentComplete ? (
        <CloudUpload className="w-5 h-5" />
      ) : (
        <Lock className="w-5 h-5" />
      ),
    },
  ];

  const segmentColor = steps
    .slice(0, -1)
    .map((step) =>
      step.status === "completed" ? "bg-blue-600" : "bg-slate-200",
    );

  return (
    <div className="bg-white rounded-2xl p-8 border border-slate-200 shadow-sm">
      <h3 className="text-lg font-semibold text-slate-900 mb-8">
        Status Pendaftaran
      </h3>

      <div className="relative flex justify-between w-full max-w-4xl mx-auto">
        {/* Garis Penghubung */}
        <div className="absolute top-6 left-10 right-10 sm:left-15 sm:right-15 h-0.5 flex z-0">
          {steps.slice(0, -1).map((_, i) => (
            <div
              key={i}
              className={`flex-1 h-full transition-colors duration-300 ${segmentColor[i]}`}
            />
          ))}
        </div>

        {/* Step Items */}
        {steps.map((step) => (
          <div
            key={step.label}
            className="relative flex flex-col items-center z-10 w-20 sm:w-30"
          >
            <div
              className={`w-12 h-12 rounded-full flex items-center justify-center shadow-sm transition-colors duration-300 ${
                step.status === "completed"
                  ? "bg-[#2F2FE4] text-white"
                  : step.status === "active"
                    ? "bg-white border-2 border-[#2F2FE4] text-[#2F2FE4]"
                    : "bg-slate-50 border border-slate-100 text-slate-300 shadow-none"
              }`}
            >
              {step.icon}
            </div>

            <span
              className={`mt-3 text-xs sm:text-sm font-medium text-center leading-tight ${
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
