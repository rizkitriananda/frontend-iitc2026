"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  Mail,
  ArrowRight,
  ArrowLeft,
  RotateCcw,
  Loader2,
  MailCheck,
} from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Ilustrasi1 from "@/public/Icon-forgot-password.png";
import {
  forgotPasswordSchema,
  type ForgotPasswordInput,
} from "@/lib/schemas/auth.schema";
import {
  useForgotPassword,
  getForgotPasswordErrorMessage,
} from "@/features/auth/hooks/use-forgot-password";

export default function ForgotPasswordForm() {
  const forgotPasswordMutation = useForgotPassword();

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<ForgotPasswordInput>({
    resolver: zodResolver(forgotPasswordSchema),
  });

  const onSubmit = (values: ForgotPasswordInput) => {
    forgotPasswordMutation.mutate(values);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 }}
      className="w-full max-w-[460px] border border-slate-200 rounded-3xl p-8 sm:p-10 relative overflow-hidden bg-white shadow-sm"
    >
      {/* Watermark Ilustrasi Maskot di Pojok Kanan Atas */}
      <div className="absolute top-0 right-0 -mr-6 -mt-6 w-32 h-32 opacity-10 pointer-events-none flex items-center justify-center">
        <span className="text-xs d rotate-0 border-2  w-24 h-24 flex items-center justify-center">
          <Image
            src={Ilustrasi1}
            alt="Logo IITC2026"
            width={220}
            height={60}
            className="h-full w-auto"
          />
        </span>
      </div>

      <div className="relative z-10 flex flex-col items-center">
        {forgotPasswordMutation.isSuccess ? (
          // State sukses: ganti seluruh isi form jadi konfirmasi.
          // Ini lebih jelas buat user daripada form kosong lagi + toast
          // yang gampang keskip, apalagi untuk aksi yang efeknya "cek email".
          <>
            <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-6">
              <MailCheck className="w-7 h-7" />
            </div>

            <h1 className="text-2xl font-bold text-slate-900 mb-3 text-center">
              Cek Email Anda
            </h1>
            <p className="text-slate-500 text-sm text-center mb-8 leading-relaxed px-4">
              Kami telah mengirimkan tautan reset password ke{" "}
              <span className="font-semibold text-slate-700">
                {getValues("email")}
              </span>
              . Silakan periksa kotak masuk (atau folder spam) Anda.
            </p>

            <Link
              href="/login"
              className="flex items-center gap-2 text-sm font-semibold text-[#2e2be3] hover:text-[#1c1a9c] hover:underline transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Kembali ke Login
            </Link>
          </>
        ) : (
          <>
            <div className="w-16 h-16 bg-blue-100 text-[#2e2be3] rounded-full flex items-center justify-center mb-6">
              <RotateCcw className="w-7 h-7" />
            </div>

            {/* Teks Judul & Deskripsi */}
            <h1 className="text-2xl font-bold text-slate-900 mb-3 text-center">
              Lupa Password?
            </h1>
            <p className="text-slate-500 text-sm text-center mb-8 leading-relaxed px-4">
              Masukkan email yang terdaftar. Kami akan mengirimkan tautan untuk
              mengatur ulang kata sandi Anda.
            </p>

            {/* Error umum dari server (mis. "Email tidak ditemukan") */}
            {forgotPasswordMutation.isError && (
              <div className="w-full rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600 mb-6">
                {getForgotPasswordErrorMessage(forgotPasswordMutation.error)}
              </div>
            )}

            {/* Form Input Email */}
            <form
              className="w-full space-y-6"
              onSubmit={handleSubmit(onSubmit)}
              noValidate
            >
              <div className="space-y-2">
                <Label
                  htmlFor="email"
                  className="text-[11px] font-bold text-slate-500 uppercase tracking-wider"
                >
                  Alamat Email
                </Label>
                <div className="relative">
                  <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
                  <Input
                    id="email"
                    type="email"
                    className="pl-11 bg-[#fafafa] border-slate-200 h-12 focus-visible:ring-[#2e2be3]"
                    placeholder="nama@email.com"
                    {...register("email")}
                  />
                </div>
                {errors.email && (
                  <p className="text-sm text-red-500">{errors.email.message}</p>
                )}
              </div>

              {/* Tombol Kirim Tautan */}
              <Button
                type="submit"
                disabled={forgotPasswordMutation.isPending}
                className="w-full bg-[#2F2FE4] hover:bg-[#2523b8] text-white h-12 rounded-lg text-sm font-medium transition-colors shadow-sm flex items-center justify-center gap-2 disabled:opacity-70"
              >
                {forgotPasswordMutation.isPending ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" /> Mengirim...
                  </>
                ) : (
                  <>
                    Kirim Tautan Reset <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </Button>
            </form>

            {/* Tombol Kembali ke Login */}
            <div className="mt-8">
              <Link
                href="/login"
                className="flex items-center gap-2 text-sm font-semibold text-[#2e2be3] hover:text-[#1c1a9c] hover:underline transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                Kembali ke Login
              </Link>
            </div>
          </>
        )}
      </div>
    </motion.div>
  );
}
