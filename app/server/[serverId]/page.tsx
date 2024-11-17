"use client";

import { useGetServer } from "@/features/servers/api/use-get-server";
import { useServerId } from "@/hooks/use-server-id";

const ServerIdPage = () => {
  const serverId = useServerId();
  const { data } = useGetServer({ id: serverId });

  return <div className="text-white">data: {JSON.stringify(data)}</div>;
};

export default ServerIdPage;
