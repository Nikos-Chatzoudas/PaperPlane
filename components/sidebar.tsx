import { Search, UserPlus } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { ScrollArea } from "./ui/scroll-area";
import { UserButton } from "./user-button";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

export const Sidebar = () => {
  return (
    <div className="w-[25%] bg-zinc-900 ">
      <div className="p-3 flex justify-between items-center">
        <h2 className="text-xl font-semibold text-white">Chats</h2>
        <UserButton />
      </div>
      <div className="p-3 flex flex-col gap-2">
        <Button className="w-full bg-zinc-800 hover:bg-zinc-700">
          <UserPlus />
          Make new Friends
        </Button>
        <div className="relative">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-zinc-500" />
          <Input
            placeholder="Search"
            className="pl-8 bg-zinc-800 border-none text-zinc-300 placeholder-zinc-500"
          />
        </div>
      </div>
      <ScrollArea className="h-max w-max"></ScrollArea>
    </div>
  );
};
