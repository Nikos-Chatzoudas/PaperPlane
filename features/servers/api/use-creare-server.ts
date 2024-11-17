import { useMutation, useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { useCallback, useMemo, useState } from "react";
import { Id } from "@/convex/_generated/dataModel";

type RequestType = { name: string };
type ResponseType = Id<"servers"> | null;

type Options = {
  onSuccess?: (data: ResponseType) => void;
  onError?: (error: Error) => void;
  onSettled?: () => void;
  throwError?: boolean;
};

export const useCreateServer = () => {
  const mutation = useMutation(api.servers.create);

  const [error, setError] = useState<Error | null>(null);
  const [data, setData] = useState<ResponseType>(null);
  const [status, setStatus] = useState<
    "success" | "error" | "pending" | "settled" | null
  >(null);

  //const [isPending, setIsPending] = useState(false);
  //const [isSuccess, setIsSuccess] = useState(false);
  //const [isError, setIsError] = useState(false);
  //const [isSettled, setIsSettled] = useState(false);
  const isPending = useMemo(() => status === "pending", [status]);
  const isSuccess = useMemo(() => status === "success", [status]);
  const isError = useMemo(() => status === "error", [status]);
  const isSettled = useMemo(() => status === "settled", [status]);
  const mutate = useCallback(
    async (values: any, options?: Options) => {
      try {
        setData(null);
        setError(null);
        setStatus("pending");
        //setIsSuccess(false);
        //setIsError(false);
        //setIsSettled(false);
        //setIsPending(true);

        const response = await mutation(values);
        options?.onSuccess?.(response);
        return response;
      } catch (error) {
        options?.onError?.(error as Error);
        if (options?.throwError) {
          throw error;
        }
      } finally {
        setStatus("settled");
        options?.onSettled?.();
      }
    },
    [mutation]
  );
  return {
    mutate,
    data,
    error,
    isPending,
    isSuccess,
    isError,
    isSettled,
  };
};
