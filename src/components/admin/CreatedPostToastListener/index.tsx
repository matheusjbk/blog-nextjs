"use client";

import { showMessage } from "@/adapters/showMessage";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export function CreatedPostToatListener() {
  const searchParams = useSearchParams();
  const postCreated = searchParams.get("postCreated");
  const userCreated = searchParams.get("userCreated");
  const router = useRouter();

  useEffect(() => {
    if (postCreated === "1") {
      showMessage.dismiss();
      showMessage.success("Post criado com sucesso");
      const url = new URL(window.location.href);
      url.searchParams.delete("postCreated");
      router.replace(url.toString());
    }
  }, [postCreated, router]);

  useEffect(() => {
    if (userCreated === "1") {
      showMessage.dismiss();
      showMessage.success("Conta criada com sucesso");
      const url = new URL(window.location.href);
      url.searchParams.delete("userCreated");
      router.replace(url.toString());
    }
  }, [userCreated, router]);

  return null;
}
