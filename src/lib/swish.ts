import { SWISH_NUMBER, DEFAULT_AMOUNT } from "@/data/characters";

interface SwishOptions {
  payee?: string;
  amount?: number;
  message: string;
}

export function createSwishUrl({ payee, amount, message }: SwishOptions): string {
  const data = {
    format: "1",
    payee: { value: payee ?? SWISH_NUMBER },
    amount: { value: amount ?? DEFAULT_AMOUNT },
    message: { value: message, editable: false },
  };
  return `swish://payment?data=${encodeURIComponent(JSON.stringify(data))}`;
}

export function isMobileDevice(): boolean {
  if (typeof window === "undefined") return false;
  return /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
}
