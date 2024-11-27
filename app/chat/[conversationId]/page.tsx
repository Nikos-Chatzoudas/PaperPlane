'use client';

import { Chat } from '@/components/chat';
import { Left_Sidebar } from '@/components/left-sidebar';
import { useParams } from 'next/navigation';
import { useQuery } from 'convex/react';
import { api } from '../../../convex/_generated/api';
import { Id } from '../../../convex/_generated/dataModel';
import { Loader } from 'lucide-react';

export default function ChatPage() {
  const params = useParams();
  const conversationId = params.conversationId as Id<'conversations'>;

  const conversation = useQuery(api.conversations.get, {
    conversationId,
  });

  if (!conversation) {
    return (
      <div className="flex h-screen w-screen">
        <Left_Sidebar />
        <div className="flex-1 flex items-center justify-center">
          <Loader className="size-10 animate-spin text-zinc-400" />
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen w-screen">
      <Left_Sidebar />
      <Chat conversation={conversation} />
    </div>
  );
}
