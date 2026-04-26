"use client";

import { toast as sonnerToast } from "sonner";

export function toast(message: string) {
  return sonnerToast(message);
}
