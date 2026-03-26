"use server";

import { simulateDelay } from "@/utils/simulateDelay";

type LoginActionState = {
  username: string;
  error: string;
};

export async function loginAction(state: LoginActionState, formData: FormData) {
  await simulateDelay(3000); // manter para dificultar brute force

  if (!(formData instanceof FormData))
    return {
      username: "",
      error: "Dados inválidos",
    };

  const username = formData.get("username")?.toString() || "";
  const password = formData.get("password")?.toString() || "";

  const isValidUsername = username === process.env.LOGIN_USER;
  const isValidPassword = "";

  return {
    username: "",
    error: "",
  };
}
