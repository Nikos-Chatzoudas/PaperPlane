import { useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";

interface UseGetServerProps {
  id: Id<"servers">;
}

export const useGetServer = ({ id }: UseGetServerProps) => {
  const data = useQuery(api.servers.getById, { id });
  const isLoading = data === undefined;
  return { data, isLoading };
};
