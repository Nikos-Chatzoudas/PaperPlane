"use client";

import { CreateServerModal } from "@/features/servers/components/create-server-modal";
import { useEffect, useState } from "react";
export const Modals = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;
  return (
    <>
      <CreateServerModal />
    </>
  );
};
