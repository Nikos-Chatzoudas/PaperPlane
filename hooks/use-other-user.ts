import { Doc } from "../convex/_generated/dataModel";
import { useQuery } from "convex/react";
import { api } from "../convex/_generated/api";

export const useOtherUser = (conversation: Doc<"conversations">) => {
  const currentUser = useQuery(api.users.current);

  if (!currentUser?._id || !conversation) {
    return null;
  }

  if (conversation.isGroup) {
    return null;
  }

  const otherParticipant = conversation.participants.find(
    (participantId) => participantId !== currentUser._id
  );

  if (!otherParticipant) {
    return null;
  }

  const otherUser = useQuery(api.users.get, {
    userId: otherParticipant,
  });

  if (!otherUser) {
    return null;
  }

  return {
    id: otherUser.id,
    name: otherUser.name,
    image: otherUser.image,
  };
};
