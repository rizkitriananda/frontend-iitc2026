export interface UploadPaymentResponse {
  success: boolean;
  message: string;
  data: {
    team: {
      teamId: number;
    };
    payment: {
      team_id: number;
      transfer_receipt: string;
      updated_at: string;
      created_at: string;
    };
  };
}
