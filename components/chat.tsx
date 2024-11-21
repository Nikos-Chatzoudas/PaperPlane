import { useState, useCallback } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Send, Paperclip, Smile, Loader } from "lucide-react";
import { useOtherUser } from "@/hooks/use-other-user";
import { Doc } from "../convex/_generated/dataModel";

interface ChatProps {
  conversation: Doc<"conversations">;
}

const Chat: React.FC<ChatProps> = ({ conversation }) => {
  const [input, setInput] = useState<string>("");
  const otherUser = useOtherUser(conversation);
  const otherUserName = otherUser?.name;

  return (
    <div className="flex-1 flex flex-col bg-zinc-950 m-4 ml-0 rounded-lg w-full ">
      {/* Chat Header */}
      <div className="p-3 flex items-center gap-3 h-16">
        <Avatar className="size-10">
          <AvatarImage
            src={otherUser?.image || "/placeholder.svg?height=40&width=40"}
            alt={otherUser?.name || conversation.name || "Chat"}
          />
          <AvatarFallback>
            {(otherUser?.name || conversation.name || "Chat").substring(0, 2)}
          </AvatarFallback>
        </Avatar>
        <div>
          <h2 className="text-lg font-semibold text-white">
            {otherUser?.name || conversation.name || "Chat"}
          </h2>
          <p className="text-sm text-zinc-400">
            {conversation.isGroup ? "Group Chat" : "Direct Message"}
          </p>
        </div>
      </div>

      {/* Messages */}
      <ScrollArea className="flex-1 p-4 overflow-y-auto">
        <div className="space-y-4"></div>
      </ScrollArea>

      {/* Message Input */}
      <div className="p-4">
        <form className="flex items-center space-x-2">
          <Button
            type="button"
            size="icon"
            variant="ghost"
            className="text-zinc-400 hover:text-white"
          >
            <Paperclip className="h-5 w-5" />
            <span className="sr-only">Attach file</span>
          </Button>
          <Input
            type="text"
            placeholder="Type a message"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="flex-1 bg-zinc-800 border-none  text-zinc-300 placeholder-zinc-500"
          />
          <Button
            type="button"
            size="icon"
            variant="ghost"
            className="text-zinc-400 hover:text-white"
          >
            <Smile className="h-5 w-5" />
            <span className="sr-only">Insert emoji</span>
          </Button>
          <Button
            type="submit"
            size="icon"
            className="bg-blue-600 hover:bg-blue-700 text-white"
            disabled={!input.trim()}
          >
            <Send className="h-5 w-5" />
            <span className="sr-only">Send message</span>
          </Button>
        </form>
      </div>
    </div>
  );
};

export { Chat };
