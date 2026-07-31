import { z } from "zod";

export const loginSchema = z.object({
  email: z
    .string()
    .min(1, "Email wajib diisi")
    .email("Format email tidak valid"),
  password: z.string().min(1, "Password wajib diisi"),
});

export type LoginInput = z.infer<typeof loginSchema>;

// Validasi di FRONTEND saja (confirmPassword tidak pernah dikirim ke Laravel,
// itu cuma pengecekan UX di sisi client).
export const registerSchema = z
  .object({
    fullName: z.string().min(1, "Nama lengkap wajib diisi"),
    email: z
      .string()
      .min(1, "Email wajib diisi")
      .email("Format email tidak valid"),
    // Hanya digit setelah prefix +62, TANPA angka 0 di depan (mis. "812xxxxxxx")
    phone: z
      .string()
      .min(1, "Nomor telepon wajib diisi")
      .regex(/^[0-9]{8,13}$/, "Nomor telepon harus 8-13 digit angka"),
    password: z.string().min(8, "Password minimal 8 karakter"),
    confirmPassword: z.string().min(1, "Konfirmasi password wajib diisi"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Konfirmasi password tidak cocok",
    path: ["confirmPassword"],
  });

export type RegisterInput = z.infer<typeof registerSchema>;

export const forgotPasswordSchema = z.object({
  email: z
    .string()
    .min(1, "Email wajib diisi")
    .email("Format email tidak valid"),
});

export type ForgotPasswordInput = z.infer<typeof forgotPasswordSchema>;
