"use client";

import { useEffect } from "react";
import { useStoreModal } from "@/hooks/useStoreModal";

export default function SetupPage() {
  const { onOpen, isOpen } = useStoreModal();

  useEffect(() => {
    if (isOpen === false) {
      onOpen();
    }
  }, [isOpen, onOpen]);

  return null;
}
