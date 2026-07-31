import { z } from "zod";

export const createTeamSchema = z.object({
  name: z
    .string()
    .min(1, "Nama tim wajib diisi")
    .min(3, "Nama tim minimal 3 karakter")
    .max(100, "Nama tim maksimal 100 karakter"),
});

export type CreateTeamInput = z.infer<typeof createTeamSchema>;

export const joinTeamSchema = z.object({
  // Sengaja tidak dikunci ke panjang tertentu (mis. exact 8 karakter) —
  // contoh di dokumentasi Postman ("uq81hq71", "04hq32qc") kebetulan
  // 8 karakter, tapi UI lain di codebase ini menyebut "kode 6 digit".
  // Daripada salah tebak dan nge-block kode yang sebenarnya valid,
  // validasi cuma pastikan field-nya diisi.
  code: z.string().min(1, "Kode tim wajib diisi").trim().toLowerCase(),
});

export type JoinTeamInput = z.infer<typeof joinTeamSchema>;
