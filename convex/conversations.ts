import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { Doc, Id } from "./_generated/dataModel";
import { auth } from "./auth";

export const create = mutation({
  args: {
    participantIds: v.array(v.id("users")),
    name: v.optional(v.string()),
    isGroup: v.boolean(),
  },
  handler: async (ctx, args) => {
    const userId = await auth.getUserId(ctx);
    if (!userId) {
      throw new Error("Not authenticated");
    }

    // Ensure creator is included in participants
    const participants = [...new Set([...args.participantIds, userId])];

    // For 1:1 chats, check if conversation already exists
    if (!args.isGroup && participants.length === 2) {
      const existing = await ctx.db
        .query("conversations")
        .withIndex("by_participant")
        .filter(
          (q) =>
            q.eq(q.field("isGroup"), false) &&
            q.eq(q.field("participants"), participants)
        )
        .first();

      if (existing) {
        return existing._id;
      }
    }

    // Create new conversation
    return await ctx.db.insert("conversations", {
      participants,
      name: args.name,
      isGroup: args.isGroup,
      createdAt: Date.now(),
      lastMessageAt: Date.now(),
    });
  },
});

export const list = query({
  args: {},
  handler: async (ctx) => {
    const userId = await auth.getUserId(ctx);
    if (!userId) {
      throw new Error("Not authenticated");
    }

    return await ctx.db
      .query("conversations")
      .withIndex("by_participant")
      .filter((q) => q.eq(q.field("participants"), [userId]))
      .order("desc")
      .collect();
  },
});

export const get = query({
  args: {
    conversationId: v.id("conversations"),
  },
  handler: async (ctx, args) => {
    const userId = await auth.getUserId(ctx);
    if (!userId) {
      throw new Error("Not authenticated");
    }

    const conversation = await ctx.db.get(args.conversationId);
    if (!conversation || !conversation.participants.includes(userId)) {
      throw new Error("Not authorized to view this conversation");
    }

    return conversation;
  },
});
