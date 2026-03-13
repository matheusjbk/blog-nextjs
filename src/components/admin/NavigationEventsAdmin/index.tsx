"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

export function NavigationEventsAdmin({ onClose }: { onClose: () => void }) {
  const pathname = usePathname();

  useEffect(() => {
    onClose();
  }, [pathname, onClose]);

  return null;
}
