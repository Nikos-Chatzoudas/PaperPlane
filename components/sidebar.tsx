import { Search, UserPlus, MessageSquare } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { ScrollArea } from "./ui/scroll-area";
import { UserButton } from "./user-button";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";

import { useState } from "react";
import { useQuery, useMutation } from "convex/react";
import { api } from "../convex/_generated/api";
import { useRouter } from "next/navigation";
import { Id } from "../convex/_generated/dataModel";

export const Sidebar = () => {
  const [isAddFriendDialogOpen, setIsAddFriendDialogOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();

  const searchResults = useQuery(api.users.search, {
    searchQuery: searchQuery,
  });

  const createConversation = useMutation(api.conversations.create);

  const handleMessageUser = async (userId: Id<"users">) => {
    const conversationId = await createConversation({
      participantIds: [userId],
      isGroup: false,
    });
    router.push(`/chat/${conversationId}`);
    setIsAddFriendDialogOpen(false);
  };

  return (
    <div className="w-[25%] bg-zinc-900 m-4 rounded-lg">
      <div className="p-3 flex justify-between items-center">
        <h2 className="text-xl font-semibold text-white">Chats</h2>
        <UserButton />
      </div>
      <div className="p-3 flex flex-col gap-2">
        <Dialog
          open={isAddFriendDialogOpen}
          onOpenChange={setIsAddFriendDialogOpen}
        >
          <DialogTrigger asChild>
            <Button className="w-full bg-zinc-800 hover:bg-zinc-700">
              <UserPlus className="mr-2" />
              Make new Contact
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-zinc-800 border-none text-white">
            <DialogHeader>
              <DialogTitle className="text-xl">Find Users</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-zinc-500" />
                <Input
                  placeholder="Search by username or email"
                  className="pl-8 bg-zinc-700 border-none text-zinc-300 placeholder-zinc-500"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <ScrollArea className="h-[300px]">
                <div className="space-y-2">
                  {!searchQuery.trim() ? (
                    <p className="text-zinc-500 text-center p-4"></p>
                  ) : searchResults?.length === 0 ? (
                    <p className="text-zinc-500 text-center p-4">
                      No users found
                    </p>
                  ) : (
                    searchResults?.map((user) => (
                      <div
                        key={user._id}
                        className="flex items-center justify-between p-2 hover:bg-zinc-700 rounded-lg"
                      >
                        <div className="flex items-center gap-2">
                          <Avatar>
                            <AvatarImage src={user.image} />
                            <AvatarFallback>
                              {user.name?.[0]?.toUpperCase() || "U"}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="text-sm font-medium">{user.name}</p>
                            <p className="text-xs text-zinc-400">
                              {user.email}
                            </p>
                          </div>
                        </div>
                        <Button
                          size="sm"
                          onClick={() => handleMessageUser(user._id)}
                          className="bg-zinc-600 hover:bg-zinc-500"
                        >
                          <MessageSquare className="h-4 w-4" />
                        </Button>
                      </div>
                    ))
                  )}
                </div>
              </ScrollArea>
            </div>
          </DialogContent>
        </Dialog>
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
