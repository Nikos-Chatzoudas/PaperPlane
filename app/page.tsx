"use client";
import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Search, Settings, Send, Paperclip, Smile } from "lucide-react";
import { UserButton } from "@/components/user-button";

export default function Home() {
  const [input, setInput] = useState("");

  const conversations = [
    {
      id: 1,
      name: "Alice Johnson",
      avatar: "/placeholder.svg?height=32&width=32",
      lastMessage: "Hey, how's it going?",
      time: "10:30 AM",
    },
    {
      id: 2,
      name: "Bob Smith",
      avatar: "/placeholder.svg?height=32&width=32",
      lastMessage: "Did you see the game last night?",
      time: "Yesterday",
    },
    {
      id: 3,
      name: "Carol Williams",
      avatar: "/placeholder.svg?height=32&width=32",
      lastMessage: "Can we reschedule our meeting?",
      time: "Tuesday",
    },
  ];

  const messages = [
    {
      id: 1,
      sender: "Alice Johnson",
      content: "Hey there! How's your day going?",
      time: "10:30 AM",
      isSent: false,
    },
    {
      id: 2,
      sender: "You",
      content: "Hi Alice! It's going well, thanks for asking. How about yours?",
      time: "10:32 AM",
      isSent: true,
    },
    {
      id: 3,
      sender: "Alice Johnson",
      content:
        "That's great to hear! My day is going pretty well too. I just finished a big project at work.",
      time: "10:35 AM",
      isSent: false,
    },
    {
      id: 4,
      sender: "You",
      content:
        "Wow, congratulations on finishing your project! That must feel amazing. What was the project about?",
      time: "10:38 AM",
      isSent: true,
    },
  ];

  return (
    <div className="flex h-screen bg-black text-zinc-300">
      {/* Sidebar */}
      <div className="w-[25%] bg-zinc-900 border-r border-zinc-800">
        <div className="p-4 flex justify-between items-center border-b border-zinc-800">
          <h2 className="text-xl font-semibold text-white">Chats</h2>
          <div className="flex gap-2">
            <Button
              variant="ghost"
              size="icon"
              className="text-zinc-400 hover:text-black"
            >
              <Settings className="h-5 w-5" />
              <span className="sr-only">Settings</span>
            </Button>
            <UserButton />
          </div>
        </div>
        <div className="p-4">
          <div className="relative">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-zinc-500" />
            <Input
              placeholder="Search"
              className="pl-8 bg-zinc-800 border-zinc-700 text-zinc-300 placeholder-zinc-500"
            />
          </div>
        </div>
        <ScrollArea className="h-[calc(100vh-8rem)]">
          {conversations.map((conversation) => (
            <div
              key={conversation.id}
              className="p-4 hover:bg-zinc-800 cursor-pointer"
            >
              <div className="flex items-center space-x-4">
                <Avatar>
                  <AvatarImage
                    src={conversation.avatar}
                    alt={conversation.name}
                  />
                  <AvatarFallback>
                    {conversation.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-zinc-200 truncate">
                    {conversation.name}
                  </p>
                  <p className="text-sm text-zinc-500 truncate">
                    {conversation.lastMessage}
                  </p>
                </div>
                <div className="text-xs text-zinc-500">{conversation.time}</div>
              </div>
            </div>
          ))}
        </ScrollArea>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col bg-zinc-950">
        {/* Chat Header */}
        <div className="p-4 border-b border-zinc-800 flex items-center space-x-4">
          <Avatar>
            <AvatarImage
              src="/placeholder.svg?height=40&width=40"
              alt="Alice Johnson"
            />
            <AvatarFallback>AJ</AvatarFallback>
          </Avatar>
          <div>
            <h2 className="text-lg font-semibold text-white">Alice Johnson</h2>
            <p className="text-sm text-zinc-400">Online</p>
          </div>
        </div>

        {/* Messages */}
        <ScrollArea className="flex-1 p-4">
          <div className="space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.isSent ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[70%] rounded-lg p-3 ${message.isSent ? "bg-blue-600 text-white" : "bg-zinc-800 text-zinc-300"}`}
                >
                  <p className="text-sm">{message.content}</p>
                  <p className="text-xs text-zinc-400 mt-1">{message.time}</p>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>

        {/* Message Input */}
        <div className="p-4 border-t border-zinc-800">
          <form
            onSubmit={(e) => {
              e.preventDefault(); /* Handle send message */
            }}
            className="flex items-center space-x-2"
          >
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
              className="flex-1 bg-zinc-800 border-zinc-700 text-zinc-300 placeholder-zinc-500"
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
            >
              <Send className="h-5 w-5" />
              <span className="sr-only">Send message</span>
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
