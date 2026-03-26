"use server";

import { simulateDelay } from "@/utils/simulateDelay";

export async function logoutAction() {
  await simulateDelay(3000); // manter para dificultar brute force
}
