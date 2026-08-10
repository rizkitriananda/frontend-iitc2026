import { api } from "@/lib/api/axios";
import type { UploadPaymentResponse } from "@/types";

export async function uploadPayment(
  formData: FormData,
): Promise<UploadPaymentResponse> {
  const { data } = await api.post<UploadPaymentResponse>(
    "/payment/mine",
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    },
  );

  return data;
}
