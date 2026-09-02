import axios from "axios";
import type { CertificateResponse } from "@/types/certificate-type";

export const getMyCertificate = async (): Promise<CertificateResponse> => {
  const { data } = await axios.get<CertificateResponse>(
    "/api/certificates/mine",
  );
  return data;
};
