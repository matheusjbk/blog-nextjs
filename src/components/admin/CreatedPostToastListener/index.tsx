"use client";

import { showMessage } from "@/adapters/showMessage";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export function CreatedPostToatListener() {
  const searchParams = useSearchParams();
  const created = searchParams.get("created");
  const router = useRouter();

  useEffect(() => {
    if (created === "1") {
      showMessage.dismiss();
      showMessage.success("Post criado com sucesso");
      const url = new URL(window.location.href);
      url.searchParams.delete("created");
      router.replace(url.toString());
    }
  }, [created, router]);

  return null;
}
