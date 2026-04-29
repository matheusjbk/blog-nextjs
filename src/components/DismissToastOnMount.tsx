"use client";

import { showMessage } from "@/adapters/showMessage";
import { useEffect } from "react";

export function DismissToastOnMount() {
  useEffect(() => {
    showMessage.dismiss();
  }, []);

  return null;
}
