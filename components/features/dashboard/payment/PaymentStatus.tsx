import { CalendarClock, Clock, CheckCircle, XCircle } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface PaymentStatusProps {
  status?: string;
  reason?: string | null;
}

export default function PaymentStatus({ status, reason }: PaymentStatusProps) {
  const currentStatus = status?.toUpperCase() || "UNPAID";

  let icon = <CalendarClock className="w-7 h-7 text-orange-400" />;
  let bgIcon = "bg-orange-50";
  let title = "Status: Menunggu Pembayaran";
  let desc =
    "Tim Anda belum menyelesaikan tahap pembayaran. Harap segera lakukan transfer dan unggah bukti.";
  let borderColor = "border-slate-200";

  if (currentStatus === "PENDING") {
    icon = <Clock className="w-7 h-7 text-blue-500" />;
    bgIcon = "bg-blue-50";
    title = "Status: Menunggu Validasi";
    desc =
      "Bukti pembayaran Anda sedang diperiksa oleh panitia. Harap tunggu proses validasi selesai.";
    borderColor = "border-blue-200";
  } else if (currentStatus === "VALID" || currentStatus === "ACCEPTED") {
    icon = <CheckCircle className="w-7 h-7 text-green-500" />;
    bgIcon = "bg-green-50";
    title = "Status: Pembayaran Diterima";
    desc = "Pembayaran Anda telah divalidasi. Tim Anda kini resmi terdaftar!";
    borderColor = "border-green-200";
  } else if (currentStatus === "INVALID") {
    icon = <XCircle className="w-7 h-7 text-red-500" />;
    bgIcon = "bg-red-50";
    title = "Status: Pembayaran Ditolak";
    desc = reason
      ? `Alasan: ${reason}`
      : "Bukti pembayaran tidak valid. Silakan unggah ulang bukti yang benar.";
    borderColor = "border-red-300";
  }

  return (
    <Card className={`shadow-sm rounded-2xl ${borderColor}`}>
      <CardContent className="p-6 flex items-start gap-5">
        <div
          className={`w-14 h-14 rounded-full ${bgIcon} flex items-center justify-center shrink-0`}
        >
          {icon}
        </div>
        <div className="space-y-1.5">
          <h3
            className={`text-lg font-bold ${
              currentStatus === "REJECTED" ? "text-red-600" : "text-slate-900"
            }`}
          >
            {title}
          </h3>
          <p className="text-sm text-slate-500 leading-relaxed">{desc}</p>
        </div>
      </CardContent>
    </Card>
  );
}
