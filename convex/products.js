import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

// Barcha mahsulotlarni olish
export const getProducts = query({
  handler: async (ctx) => {
    return await ctx.db.query("products").order("desc").collect();
  },
});

// Yangi mahsulot qo'shish (rasm havolasi / Base64 yoki URL bilan)
export const addProduct = mutation({
  args: {
    title: v.string(),
    price: v.number(),
    description: v.string(),
    imageUrl: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const newProductId = await ctx.db.insert("products", {
      title: args.title,
      price: args.price,
      description: args.description,
      imageUrl: args.imageUrl || "",
    });
    return newProductId;
  },
});