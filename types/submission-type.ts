import type { ApiErrorResponse } from "./index";

export interface UpdateSubmissionInput {
  submission: string;
}

export interface UpdateSubmissionResponse {
  success?: boolean;
  status?: boolean;
  message: string;
  data?: unknown;
}

export type { ApiErrorResponse };
