import { auth } from "./auth";
import { query } from "./_generated/server";
import { v } from "convex/values";

export const current = query({
  args: {},
  handler: async (ctx) => {
    const userId = await auth.getUserId(ctx);

    if (userId === null) {
      return null;
    }
    return await ctx.db.get(userId);
  },
});

export const get = query({
  args: { userId: v.id("users") },
  handler: async (ctx, args) => {
    const user = await ctx.db.get(args.userId);
    
    if (!user) {
      return null;
    }

    return {
      id: user._id,
      name: user.name,
      image: user.image
    };
  },
});

export const search = query({
  args: { searchQuery: v.string() },
  handler: async (ctx, args) => {
    const userId = await auth.getUserId(ctx);
    if (!userId) return [];

    if (!args.searchQuery.trim()) {
      return [];
    }

    const searchLower = args.searchQuery.toLowerCase();
    const users = await ctx.db
      .query("users")
      .filter((q) => q.neq(q.field("_id"), userId))
      .collect();

    return users.filter(
      (user) =>
        user.name?.toLowerCase().includes(searchLower) ||
        user.email?.toLowerCase().includes(searchLower)
    );
  },
});
