'use client';
import { Left_Sidebar } from '@/components/left-sidebar';
import { Chat } from '@/components/chat';

export default function Home() {
  return (
    <div className="flex h-screen w-screen">
      <Left_Sidebar />
      <div className="flex justify-center items-center flex-grow flex-col bg-zinc-950 m-4 ml-0 rounded-lg">
        <img src="/logo.png" className="size-40" alt="PaperPlane Logo" />
        <h1 className="font-bold">Click a contact or Click make new contact</h1>
      </div>
    </div>
  );
}
