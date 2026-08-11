// components/features/dashboard/payment/payment.constants.ts
import { Landmark, Wallet } from "lucide-react";

export const VERIFIED_STATUSES = ["VALID", "ACCEPTED", "SUCCESS"];

export type PaymentMethodConfig = {
  title: string;
  provider: string;
  accountNumber: string;
  accountName: string;
  icon: typeof Wallet | typeof Landmark;
  fullWidth?: boolean;
};

export const PAYMENT_METHODS: PaymentMethodConfig[] = [
  {
    title: "E-Wallet",
    provider: "DANA",
    accountNumber: "082137805336",
    accountName: "Maylinda Eka Saputri",
    icon: Wallet,
  },
  {
    title: "Transfer Bank",
    provider: "BRI",
    accountNumber: "683901020736507",
    accountName: "Maylinda Eka Saputri",
    icon: Landmark,
  },
  {
    title: "Transfer Bank",
    provider: "Seabank",
    accountNumber: "901912316510",
    accountName: "Tifa Fitriana",
    icon: Landmark,
    fullWidth: true,
  },
];

const WHATSAPP_GROUP_BY_COMPETITION = [
  {
    keywords: ["web design", "webdesign"],
    url: "https://chat.whatsapp.com/GPk3ial29LvHRkYGdNmIe3",
  },
  {
    keywords: ["ui/ux", "uiux", "ui"],
    url: "https://chat.whatsapp.com/HgPrSs3uZ32AYGCE8myQh4",
  },
  {
    keywords: ["gen ai", "genai", "ai"],
    url: "https://chat.whatsapp.com/HA3xyTpiNnuIsCPQFwEY3C",
  },
];

export function getWhatsAppGroupUrl(competitionName?: string): string {
  if (!competitionName) return "#";
  const name = competitionName.toLowerCase();
  const match = WHATSAPP_GROUP_BY_COMPETITION.find((entry) =>
    entry.keywords.some((keyword) => name.includes(keyword)),
  );
  return match?.url ?? "#";
}
