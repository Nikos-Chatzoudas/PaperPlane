import { useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";
export const useGetServers = () => {
  const data = useQuery(api.servers.get);
  const isLoading = data === undefined;
  return { data, isLoading };
};
