import Link from "next/link";
import { Megaphone, MessageCircle, UserCircle } from "lucide-react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface TwibbonRequirementModalProps {
  isOpen: boolean;
  onClose: () => void;
  whatsappUrl: string;
}

export default function TwibbonRequirementModal({
  isOpen,
  onClose,
  whatsappUrl,
}: TwibbonRequirementModalProps) {
  const handleDialogChange = (open: boolean) => {
    if (!open) {
      onClose();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleDialogChange}>
      <DialogContent className="sm:max-w-162.5 max-h-[90vh] flex flex-col p-0 overflow-hidden bg-white rounded-2xl border-none shadow-2xl">
        <DialogTitle className="hidden">Wajib Upload Twibbon!</DialogTitle>

        {/* Header Modal */}
        <div className="px-8 py-6 border-b border-slate-100 pr-14">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-full bg-[#1000C7]/10 flex items-center justify-center text-[#1000C7] shrink-0">
              <Megaphone className="w-5 h-5" />
            </div>
            <h2 className="text-2xl font-bold text-slate-900">
              Wajib Upload Twibbon!
            </h2>
          </div>
          <p className="text-sm text-slate-500">
            Selesaikan persyaratan berikut agar Anda dapat mengunggah karya.
          </p>
        </div>

        {/* Body */}
        <div className="p-8 bg-slate-50/50 overflow-y-auto">
          <div className="space-y-5 text-slate-600 text-sm md:text-base leading-relaxed">
            <p>
              Selamat! Pembayaran tim Anda telah berhasil divalidasi. Sebagai
              syarat wajib sebelum Anda dapat <strong>mengunggah karya</strong>,
              Anda diharuskan mengunggah bukti post Twibbon.
            </p>

            <div className="bg-white border border-slate-200 p-6 rounded-xl shadow-sm space-y-3">
              <h3 className="font-bold text-slate-900">Langkah-langkah:</h3>
              <ol className="list-decimal list-outside ml-4 space-y-2">
                <li>
                  Bergabunglah ke <strong>Grup WhatsApp</strong> peserta (Link
                  aset Twibbon dan Caption tersedia di deskripsi/pengumuman
                  grup).
                </li>
                <li>
                  Post foto/video Anda menggunakan Twibbon di Instagram feed
                  akun Anda.
                </li>
                <li>Screenshot bukti post tersebut.</li>
                <li>
                  Unggah screenshot bukti post ke menu <strong>Profil</strong>{" "}
                  di website ini.
                </li>
              </ol>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-8 py-5 flex flex-col sm:flex-row items-center justify-end gap-3 bg-white border-t border-slate-100">
          <Button
            variant="ghost"
            onClick={onClose}
            className="text-[#2F2FE4] hover:text-[#13076b] hover:bg-indigo-50 font-bold px-6 h-11 w-full sm:w-auto order-3 sm:order-1"
          >
            Nanti Saja
          </Button>
          <Button
            asChild
            variant="outline"
            className="border-emerald-500 text-emerald-600 hover:bg-emerald-50 hover:text-emerald-700 font-medium px-6 h-11 shadow-sm transition-colors w-full sm:w-auto order-2"
          >
            <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
              <MessageCircle className="w-4 h-4 mr-2" />
              Grup WhatsApp
            </a>
          </Button>
          <Button
            asChild
            className="bg-[#2F2FE4] hover:bg-[#13076b] text-white font-medium px-6 h-11 shadow-sm transition-colors w-full sm:w-auto order-1 sm:order-3"
          >
            <Link href="/dashboard/profile">
              <UserCircle className="w-4 h-4 mr-2" />
              Unggah Profil
            </Link>
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
