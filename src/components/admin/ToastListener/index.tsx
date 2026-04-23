"use client";

import { showMessage } from "@/adapters/showMessage";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export function ToastListener() {
  const searchParams = useSearchParams();
  const postCreated = searchParams.get("postCreated");
  const userCreated = searchParams.get("userCreated");
  const userChanged = searchParams.get("userChanged");
  const router = useRouter();

  useEffect(() => {
    if (postCreated === "1") {
      showMessage.dismiss();
      showMessage.success("Post criado com sucesso.");
      const url = new URL(window.location.href);
      url.searchParams.delete("postCreated");
      router.replace(url.toString());
    }

    if (userCreated === "1") {
      showMessage.dismiss();
      showMessage.success("Conta criada com sucesso.");
      const url = new URL(window.location.href);
      url.searchParams.delete("userCreated");
      router.replace(url.toString());
    }

    if (userChanged === "1") {
      showMessage.dismiss();
      showMessage.success("Seu perfil foi alterado. Faça login novamente.");
      const url = new URL(window.location.href);
      url.searchParams.delete("userChanged");
      router.replace(url.toString());
    }
  }, [postCreated, userCreated, userChanged, router]);

  return null;
}
