"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  CloudUpload,
  ArrowRight,
  FileUp,
  CheckCircle2,
  Loader2,
  AlertCircle,
  Lock,
} from "lucide-react";
import { toast } from "sonner";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import PaymentSuccessModal from "@/components/features/dashboard/payment/PaymentSuccessModal";
import {
  useUploadPayment,
  getPaymentErrorMessage,
} from "@/features/payment/hooks/use-upload-payment";

interface UploadProofProps {
  status?: string;
}

export default function UploadProof({ status }: UploadProofProps) {
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [clientError, setClientError] = useState<string | null>(null);
  const [showSuccessModal, setShowSuccessModal] = useState<boolean>(false);

  const paymentMutation = useUploadPayment();
  const currentStatus = status?.toUpperCase();

  const isLocked =
    currentStatus === "PENDING" ||
    currentStatus === "SUCCESS" ||
    currentStatus === "ACCEPTED";

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (isLocked) return;

    setClientError(null);
    paymentMutation.reset();

    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      setClientError("Ukuran file terlalu besar. Maksimal 5MB.");
      setUploadedFile(null);
      return;
    }

    const allowedTypes = ["image/jpeg", "image/png"];
    if (!allowedTypes.includes(file.type)) {
      setClientError("Format file tidak didukung. Gunakan JPG atau PNG.");
      setUploadedFile(null);
      return;
    }

    setUploadedFile(file);
  };

  const handleSubmit = () => {
    if (!uploadedFile || isLocked) return;

    const formData = new FormData();
    formData.append("proveOfPayment", uploadedFile);

    paymentMutation.mutate(formData, {
      onSuccess: () => {
        setUploadedFile(null);
        setShowSuccessModal(true); // Memunculkan modal sukses saja tanpa toast
      },
      onError: (error) => {
        const errorMessage = getPaymentErrorMessage(error);
        toast.error(errorMessage);
      },
    });
  };

  return (
    <>
      {/* Modal Sukses Upload */}
      <PaymentSuccessModal
        isOpen={showSuccessModal}
        onClose={() => setShowSuccessModal(false)}
      />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <Card
          className={`shadow-sm rounded-2xl overflow-hidden ${isLocked ? "border-slate-200 bg-slate-50/50" : "border-slate-200"}`}
        >
          <CardContent className="p-0">
            <div className="p-6">
              <div className="flex items-center gap-2 mb-4">
                <FileUp
                  className={`w-5 h-5 ${isLocked ? "text-slate-400" : "text-[#2F2FE4]"}`}
                />
                <h3
                  className={`font-semibold ${isLocked ? "text-slate-500" : "text-slate-900"}`}
                >
                  Unggah Bukti Pembayaran
                </h3>
              </div>

              {(paymentMutation.isError || clientError) && !isLocked && (
                <div className="mb-4 flex items-start gap-2 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
                  <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
                  <p>
                    {clientError ||
                      getPaymentErrorMessage(paymentMutation.error)}
                  </p>
                </div>
              )}

              <div
                className={`border-2 border-dashed rounded-xl p-8 flex flex-col items-center justify-center text-center relative transition-colors ${
                  isLocked
                    ? "border-slate-200 bg-slate-100/50"
                    : clientError
                      ? "border-red-300 bg-red-50/50"
                      : "border-blue-300 bg-[#f8faff] hover:bg-blue-50/50"
                }`}
              >
                <input
                  type="file"
                  onChange={handleFileSelect}
                  accept="image/jpeg,image/png"
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer disabled:cursor-not-allowed"
                  disabled={paymentMutation.isPending || isLocked}
                />

                <div
                  className={`w-12 h-12 rounded-full flex items-center justify-center mb-4 ${
                    isLocked
                      ? "bg-slate-200 text-slate-400"
                      : "bg-blue-100 text-[#2F2FE4]"
                  }`}
                >
                  {isLocked ? (
                    <Lock className="w-5 h-5" />
                  ) : uploadedFile ? (
                    <CheckCircle2 className="w-6 h-6 text-green-600" />
                  ) : (
                    <CloudUpload className="w-6 h-6" />
                  )}
                </div>

                <h4
                  className={`text-base font-bold mb-1 ${isLocked ? "text-slate-500" : "text-slate-900"}`}
                >
                  {isLocked
                    ? "Form Terkunci"
                    : uploadedFile
                      ? uploadedFile.name
                      : "Tarik & Lepas file di sini"}
                </h4>

                <p className="text-xs text-slate-500 mb-6">
                  {isLocked
                    ? "Anda tidak dapat mengunggah bukti pembayaran pada status ini."
                    : uploadedFile
                      ? "File berhasil dipilih. Siap untuk dikonfirmasi."
                      : "atau klik untuk menelusuri komputer Anda (Maks. 5MB, JPG/PNG)"}
                </p>

                <Button
                  type="button"
                  variant="outline"
                  disabled={isLocked}
                  className="pointer-events-none bg-white font-medium px-8 rounded-lg shadow-sm border-slate-200 text-slate-700 disabled:opacity-50"
                >
                  {uploadedFile ? "Ganti File" : "Pilih File"}
                </Button>
              </div>
            </div>

            <div className="bg-slate-50/80 border-t border-slate-100 px-6 py-4 flex justify-end">
              <Button
                onClick={handleSubmit}
                disabled={
                  !uploadedFile || paymentMutation.isPending || isLocked
                }
                className={`font-medium px-6 h-12 rounded-lg flex items-center gap-2 shadow-sm transition-colors cursor-pointer ${
                  uploadedFile && !paymentMutation.isPending && !isLocked
                    ? "bg-[#2F2FE4] hover:bg-[#2523b8] text-white"
                    : "bg-slate-200 text-slate-400"
                }`}
              >
                {paymentMutation.isPending ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" /> Memproses...
                  </>
                ) : (
                  <>
                    Konfirmasi Pembayaran <ArrowRight className="w-5 h-5" />
                  </>
                )}
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </>
  );
}
