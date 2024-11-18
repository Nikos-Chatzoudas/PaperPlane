"use client";
import { Loader, LogOut } from "lucide-react";
import { Avatar } from "@radix-ui/react-avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { AvatarFallback, AvatarImage } from "./ui/avatar";
import { useCurrentUser } from "@/hooks/use-current-user";
import { useAuthActions } from "@convex-dev/auth/react";

export const UserButton = () => {
  const { data, isLoading } = useCurrentUser();
  const { signOut } = useAuthActions();

  if (isLoading) {
    return <Loader className="size-4 animate-spin text-zinc-400" />;
  }

  if (!data) {
    return null;
  }

  const { image, name, email } = data;
  const avatarfallback = name!.charAt(0).toUpperCase();

  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger className="outline-none relative size-10">
        <Avatar className="size-10 hover:opacity-75 transition">
          <AvatarImage alt="pfp" src={image} className="rounded-full" />
          <AvatarFallback className="bg-zinc-700 text-zinc-100">
            {avatarfallback}
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="center"
        side="right"
        className="w-60 bg-zinc-800 text-zinc-100 rounded-md shadow-lg border-none"
      >
        <DropdownMenuItem
          onClick={() => signOut()}
          className="h-10 flex items-center px-4 hover:text-white hover:bg-zinc-700 text-red-500"
        >
          <LogOut className="size-4 mr-2" />
          Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
