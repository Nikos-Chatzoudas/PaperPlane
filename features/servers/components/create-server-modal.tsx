"use client";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useCreateServerModal } from "../store/use-create-server-modal";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useCreateServer } from "../api/use-creare-server";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export const CreateServerModal = () => {
  const [open, SetOpen] = useCreateServerModal();
  const [name, SetName] = useState("");

  const router = useRouter();

  const { mutate, isPending, isError, isSuccess, data, error } =
    useCreateServer();
  const hadleClose = () => {
    SetOpen(false);
    SetName("");
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    mutate(
      { name },
      {
        onSuccess(id) {
          router.push(`/server/${id}`);
          toast.success("Server Created! 🎉");
          hadleClose();
        },
      }
    );
  };
  return (
    <Dialog open={open} onOpenChange={hadleClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create a Server</DialogTitle>
        </DialogHeader>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <Input
            value={name}
            onChange={(e) => SetName(e.target.value)}
            disabled={isPending}
            required
            autoFocus
            minLength={3}
            placeholder="Server Name"
          />
          <div className="flex justify-end">
            <Button disabled={isPending}>Create</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
