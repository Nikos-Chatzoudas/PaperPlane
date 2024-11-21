"use client";
import { Sidebar } from "@/components/sidebar";
import { Chat } from "@/components/chat";

export default function Home() {
  return (
    <div className="flex h-screen w-screen">
      <Sidebar />
      <div className="flex justify-center items-center flex-grow flex-col bg-zinc-950 m-4 ml-0 rounded-lg">
        <img src="logo.png" className="size-40" alt="" />
        <h1 className="font-bold">Click a contact or Click make new contact</h1>
      </div>
    </div>
  );
}
