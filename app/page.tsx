"use client";
import { useGetServers } from "@/features/servers/api/use-get-servers";
import { Button } from "@/components/ui/button";
import { UserButton } from "@/components/user-button";
import { useCreateServerModal } from "@/features/servers/store/use-create-server-modal";
import { useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const [open, SetOpen] = useCreateServerModal();
  const router = useRouter();
  const { data, isLoading } = useGetServers();

  const serverId = useMemo(() => {
    if (!data || !Array.isArray(data) || data.length === 0) {
      return null;
    }
    return data[0]._id;
  }, [data]);

  useEffect(() => {
    if (isLoading) return;

    if (serverId) {
      router.replace(`/server/${serverId}`);
    } else if (!open) {
      SetOpen(true);
    }
  }, [serverId, isLoading, open, SetOpen, router]);
  return (
    <div className="flex items-center justify-center h-screen ">
      <UserButton />
    </div>
  );
}
