"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Mail, Lock, ArrowRight, Eye, EyeOff, Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { loginSchema, type LoginInput } from "@/lib/schemas/auth.schema";
import { useLogin, getAuthErrorMessage } from "@/features/auth/hooks/use-login";
export default function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const loginMutation = useLogin();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = (values: LoginInput) => {
    loginMutation.mutate(values);
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
        <h1 className="text-3xl font-bold text-[#1a1a1a]">
          Selamat Datang Kembali
        </h1>
        <p className="text-slate-500 text-sm">
          Masuk ke akun IITC Anda untuk melanjutkan.
        </p>
      </div>

      {/* Formulir */}
      <form className="space-y-5" onSubmit={handleSubmit(onSubmit)} noValidate>
        {/* Error umum dari server (mis. "Email atau password salah") */}
        {loginMutation.isError && (
          <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
            {getAuthErrorMessage(loginMutation.error)}
          </div>
        )}

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
              className="pl-11 bg-white border-slate-200 h-12 focus-visible:ring-[#2e2be3]"
              placeholder="nama@email.com"
              {...register("email")}
            />
          </div>
          {errors.email && (
            <p className="text-sm text-red-500">{errors.email.message}</p>
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
              className="pl-11 pr-12 bg-white border-slate-200 h-12 focus-visible:ring-[#2e2be3]"
              placeholder="••••••••"
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

        {/* Lupa Password Link */}
        <div className="flex justify-end pt-1">
          <Link
            href="/forgot-password"
            className="text-sm font-medium text-[#2e2be3] hover:underline"
          >
            Lupa Password?
          </Link>
        </div>

        {/* Tombol Submit */}
        <Button
          type="submit"
          disabled={loginMutation.isPending}
          className="w-full bg-[#2F2FE4] hover:bg-[#2523b8] text-white h-12 rounded-lg text-base font-medium transition-colors shadow-sm flex items-center justify-center gap-2 disabled:opacity-70"
        >
          {loginMutation.isPending ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" /> Memproses...
            </>
          ) : (
            <>
              Masuk <ArrowRight className="w-5 h-5" />
            </>
          )}
        </Button>
      </form>

      {/* Footer Link */}
      <p className="text-center text-sm text-slate-500 mt-6">
        Belum punya akun?{" "}
        <Link
          href="/register"
          className="text-[#2e2be3] font-semibold hover:underline"
        >
          Daftar Sekarang
        </Link>
      </p>
    </motion.div>
  );
}
