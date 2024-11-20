import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { Doc, Id } from "./_generated/dataModel";
import { auth } from "./auth";

export const send = mutation({
  args: {
    content: v.string(),
    conversationId: v.id("conversations"),
    fileUrl: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const userId = await auth.getUserId(ctx);
    if (!userId) {
      throw new Error("Not authenticated");
    }

    // Verify user is part of the conversation
    const conversation = await ctx.db.get(args.conversationId);
    if (!conversation || !conversation.participants.includes(userId)) {
      throw new Error("Not authorized to send messages in this conversation");
    }

    const message = await ctx.db.insert("messages", {
      content: args.content,
      fileUrl: args.fileUrl,
      conversationId: args.conversationId,
      senderId: userId,
      createdAt: Date.now(),
      isDeleted: false,
    });

    // Update conversation's lastMessageAt
    await ctx.db.patch(args.conversationId, {
      lastMessageAt: Date.now(),
    });

    return message;
  },
});

export const list = query({
  args: {
    conversationId: v.id("conversations"),
    paginationOpts: v.optional(
      v.object({
        limit: v.number(),
        cursor: v.optional(v.string()),
      })
    ),
  },
  handler: async (ctx, args) => {
    const userId = await auth.getUserId(ctx);
    if (!userId) {
      throw new Error("Not authenticated");
    }

    // Verify user is part of the conversation
    const conversation = await ctx.db.get(args.conversationId);
    if (!conversation || !conversation.participants.includes(userId)) {
      throw new Error("Not authorized to view these messages");
    }

    const limit = args.paginationOpts?.limit ?? 50;
    
    return await ctx.db
      .query("messages")
      .withIndex("by_conversation", (q) => 
        q.eq("conversationId", args.conversationId)
      )
      .order("desc")
      .take(limit);
  },
});
