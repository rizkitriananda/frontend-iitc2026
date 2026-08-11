import { UserPlus, MessageCircle } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface WhatsAppGroupCardProps {
  groupUrl?: string;
}

export default function WhatsAppGroupCard({
  groupUrl = "#",
}: WhatsAppGroupCardProps) {
  return (
    <Card className="border-slate-200 shadow-sm rounded-2xl">
      <CardContent className="p-6 flex items-center justify-between gap-4 flex-wrap">
        <div className="flex items-start gap-5">
          <div className="w-14 h-14 rounded-full bg-green-50 flex items-center justify-center shrink-0">
            <UserPlus className="w-7 h-7 text-green-500" />
          </div>
          <div className="space-y-1.5">
            <h3 className="text-lg font-bold text-slate-900">Grup WhatsApp</h3>
            <p className="text-sm text-slate-500 leading-relaxed">
              Seluruh peserta wajib bergabung ke grup WhatsApp
            </p>
          </div>
        </div>

        <a
          href={groupUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-[#25D366] hover:bg-[#1ebe5a] text-white font-medium px-6 h-11 rounded-lg shadow-sm flex items-center gap-2 shrink-0 transition-colors"
        >
          <MessageCircle className="w-4 h-4" />
          Gabung Grup WA
        </a>
      </CardContent>
    </Card>
  );
}
