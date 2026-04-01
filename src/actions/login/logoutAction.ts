"use server";

import { deleteLoginSession } from "@/lib/login/manage-login";
import { simulateDelay } from "@/utils/simulateDelay";
import { redirect } from "next/navigation";

export async function logoutAction() {
  await simulateDelay(3000); // manter para dificultar brute force

  await deleteLoginSession();

  redirect("/");
}
