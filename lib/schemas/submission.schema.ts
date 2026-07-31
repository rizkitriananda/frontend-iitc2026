import { z } from "zod";

export const updateSubmissionSchema = z.object({
  submission: z
    .string()
    .min(1, "Tautan karya wajib diisi")
    .url("Format tautan tidak valid (misal: https://drive.google.com/...)"),
});

export type UpdateSubmissionSchemaInput = z.infer<typeof updateSubmissionSchema>;
