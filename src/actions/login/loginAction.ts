"use server";

import { simulateDelay } from "@/utils/simulateDelay";

type LoginActionState = {
  username: string;
  error: string;
};

export async function loginAction(state: LoginActionState, formData: FormData) {
  await simulateDelay(3000); // manter para dificultar brute force

  return {
    username: "",
    error: "",
  };
}
