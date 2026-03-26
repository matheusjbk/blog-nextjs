"use server";

import { createLoginSession, verifyPassword } from "@/lib/login/manage-login";
import { simulateDelay } from "@/utils/simulateDelay";
import { redirect } from "next/navigation";

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

  const username = formData.get("username")?.toString().trim() || "";
  const password = formData.get("password")?.toString().trim() || "";

  if (!username || !password)
    return {
      username,
      error: "Digite o usuário e a senha",
    };

  const isValidUsername = username === process.env.LOGIN_USER;
  const isValidPassword = await verifyPassword(
    password,
    process.env.LOGIN_PASS || "",
  );

  if (!isValidUsername || !isValidPassword) {
    return {
      username,
      error: "Usuário ou senha inválidos",
    };
  }

  await createLoginSession(username);
  redirect("/admin/post");
}
