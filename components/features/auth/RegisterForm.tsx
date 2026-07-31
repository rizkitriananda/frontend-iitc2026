"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  User,
  Mail,
  Phone,
  Lock,
  Eye,
  EyeOff,
  RotateCcw,
  Loader2,
} from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { registerSchema, type RegisterInput } from "@/lib/schemas/auth.schema";
import { useRegister } from "@/features/auth/hooks/use-register";
import { getAuthErrorMessage } from "@/features/auth/utils";

export default function RegisterForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const registerMutation = useRegister();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterInput>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = (values: RegisterInput) => {
    registerMutation.mutate(values);
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="w-full max-w-md space-y-8"
    >
      {/* Header Formulir */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold text-[#1a0b8c]">
          Mulai Inovasi Anda
        </h1>
        <p className="text-slate-500 text-sm">
          Buat akun untuk berpartisipasi dalam warisan teknologi nusantara.
        </p>
      </div>

      {/* Formulir */}
      <form className="space-y-5" onSubmit={handleSubmit(onSubmit)} noValidate>
        {/* Error umum dari server (mis. "Email sudah terdaftar") */}
        {registerMutation.isError && (
          <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
            {getAuthErrorMessage(registerMutation.error)}
          </div>
        )}

        {/* Input Nama Lengkap */}
        <div className="space-y-2">
          <Label htmlFor="name" className="text-slate-700 font-medium">
            Nama Lengkap
          </Label>
          <div className="relative">
            <User className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
            <Input
              id="name"
              type="text"
              className="pl-11 bg-[#fafafa] border-slate-200 h-12 focus-visible:ring-[#1a0b8c]"
              placeholder="Masukkan nama lengkap Anda"
              {...register("fullName")}
            />
          </div>
          {errors.fullName && (
            <p className="text-sm text-red-500">{errors.fullName.message}</p>
          )}
        </div>

        {/* Input Email */}
        <div className="space-y-2">
          <Label htmlFor="email" className="text-slate-700 font-medium">
            Email
          </Label>
          <div className="relative">
            <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
            <Input
              id="email"
              type="email"
              className="pl-11 bg-[#fafafa] border-slate-200 h-12 focus-visible:ring-[#1a0b8c]"
              placeholder="nama@email.com"
              {...register("email")}
            />
          </div>
          {errors.email && (
            <p className="text-sm text-red-500">{errors.email.message}</p>
          )}
        </div>

        {/* Input Nomor Telepon */}
        <div className="space-y-2">
          <Label htmlFor="phone" className="text-slate-700 font-medium">
            Nomor Telepon
          </Label>
          <div className="relative flex items-center">
            <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
            {/* Teks statis +62 di dalam input (nilai yg dikirim tetap cuma digitnya) */}
            <span className="absolute left-11 text-slate-600 text-sm font-medium">
              +62
            </span>
            <Input
              id="phone"
              type="tel"
              inputMode="numeric"
              className="pl-20 bg-[#fafafa] border-slate-200 h-12 focus-visible:ring-[#1a0b8c]"
              placeholder="812XXXX"
              {...register("phone")}
            />
          </div>
          {errors.phone && (
            <p className="text-sm text-red-500">{errors.phone.message}</p>
          )}
        </div>

        {/* Input Password */}
        <div className="space-y-2">
          <Label htmlFor="password" className="text-slate-700 font-medium">
            Password
          </Label>
          <div className="relative">
            <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
            <Input
              id="password"
              type={showPassword ? "text" : "password"}
              className="pl-11 pr-12 bg-[#fafafa] border-slate-200 h-12 focus-visible:ring-[#1a0b8c]"
              placeholder="Minimal 8 karakter"
              {...register("password")}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
              tabIndex={-1}
            >
              {showPassword ? (
                <EyeOff className="w-5 h-5" />
              ) : (
                <Eye className="w-5 h-5" />
              )}
            </button>
          </div>
          {errors.password && (
            <p className="text-sm text-red-500">{errors.password.message}</p>
          )}
        </div>

        {/* Input Konfirmasi Password */}
        <div className="space-y-2">
          <Label
            htmlFor="confirmPassword"
            className="text-slate-700 font-medium"
          >
            Konfirmasi Password
          </Label>
          <div className="relative">
            <RotateCcw className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
            <Input
              id="confirmPassword"
              type={showConfirmPassword ? "text" : "password"}
              className="pl-11 pr-12 bg-[#fafafa] border-slate-200 h-12 focus-visible:ring-[#1a0b8c]"
              placeholder="Ulangi password Anda"
              {...register("confirmPassword")}
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
              tabIndex={-1}
            >
              {showConfirmPassword ? (
                <EyeOff className="w-5 h-5" />
              ) : (
                <Eye className="w-5 h-5" />
              )}
            </button>
          </div>
          {errors.confirmPassword && (
            <p className="text-sm text-red-500">
              {errors.confirmPassword.message}
            </p>
          )}
        </div>

        {/* Tombol Submit */}
        <Button
          type="submit"
          disabled={registerMutation.isPending}
          className="w-full bg-[#2F2FE4] hover:bg-[#110287] text-white h-12 rounded-lg text-base font-medium mt-2 transition-colors shadow-md flex items-center justify-center gap-2 disabled:opacity-70"
        >
          {registerMutation.isPending ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" /> Memproses...
            </>
          ) : (
            "Daftar"
          )}
        </Button>
      </form>

      {/* Footer Link */}
      <p className="text-center text-sm text-slate-500 mt-6">
        Sudah punya akun?{" "}
        <Link
          href="/login"
          className="text-[#1a0b8c] font-semibold hover:underline"
        >
          Masuk
        </Link>
      </p>
    </motion.div>
  );
}
