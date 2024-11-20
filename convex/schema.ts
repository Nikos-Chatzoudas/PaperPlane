import { defineSchema, defineTable } from "convex/server";
import { authTables } from "@convex-dev/auth/server";
import { v } from "convex/values";

const schema = defineSchema({
  ...authTables,

  conversations: defineTable({
    name: v.optional(v.string()), // Optional name for group chats
    participants: v.array(v.id("users")), // Array of user IDs
    createdAt: v.number(),
    lastMessageAt: v.number(), // For sorting conversations
    isGroup: v.boolean(), // Whether this is a group conversation
  })
    .index("by_participant", ["participants"])
    .index("by_updated", ["lastMessageAt"]),

  messages: defineTable({
    content: v.string(),
    fileUrl: v.optional(v.string()), // Optional attachment
    conversationId: v.id("conversations"),
    senderId: v.id("users"),
    createdAt: v.number(),
    isDeleted: v.boolean(), // Soft delete support
  })
    .index("by_conversation", ["conversationId", "createdAt"])
    .index("by_sender", ["senderId", "createdAt"]),

  userSettings: defineTable({
    userId: v.id("users"),
    theme: v.optional(v.string()),
    notifications: v.boolean(),
    lastSeen: v.number(),
  }).index("by_user", ["userId"]),
});

export default schema;
