export interface CertificateData {
  name: string;
  email: string;
  teamId: number;
  teamName: string;
  competitionName: string;
  paymentStatus: string;
  certificateNumber: string;
  winnerStatus: string;
  seminarName?: string;
  certificateUrl?: string | null;
}

export interface CertificateResponse {
  success: boolean;
  message: string;
  data: CertificateData;
}
