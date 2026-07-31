import { z } from "zod";

const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp"];
const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

const fileSchema = z
  .custom<File | undefined>()
  .refine(
    (file) => !file || (file instanceof File && file.size <= MAX_FILE_SIZE),
    "Ukuran berkas maksimal 5MB",
  )
  .refine(
    (file) => !file || (file instanceof File && ACCEPTED_IMAGE_TYPES.includes(file.type)),
    "Format berkas harus berupa JPG, PNG, atau WEBP",
  );

export const updateProfileSchema = z.object({
  fullName: z.string().min(1, "Nama lengkap wajib diisi"),
  grade: z.string().min(1, "Jenjang / Kelas / Tingkat wajib diisi"),
  institution: z.string().min(1, "Instansi / Sekolah / Universitas wajib diisi"),
  student_id_number: z.string().min(1, "NIM / NISN / No. Kartu Pelajar wajib diisi"),
  gender: z.string().min(1, "Jenis kelamin wajib diisi"),
  phone: z
    .string()
    .min(1, "Nomor telepon wajib diisi")
    .regex(/^[0-9]{8,15}$/, "Nomor telepon harus 8-15 digit angka"),
  avatar: fileSchema.optional().nullable(),
  twibbon: fileSchema.optional().nullable(),
});

export type UpdateProfileSchemaInput = z.infer<typeof updateProfileSchema>;
