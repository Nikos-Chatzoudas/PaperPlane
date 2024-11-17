import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { auth } from "./auth";
import { error } from "console";
export const create = mutation({
  args: {
    name: v.string(),
  },
  handler: async (ctx, args) => {
    const userId = await auth.getUserId(ctx);
    if (!userId) {
      throw new Error("Unothorized");
    }
    const joinCode = "12345";
    const ServerId = await ctx.db.insert("servers", {
      name: args.name,
      userId,
      joinCode,
    });
    return ServerId;
  },
});
export const get = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("servers").collect();
  },
});
