import { z } from "zod";

export const todoSchema = z.object({
title: z
.string()
.trim()
.min(1, "Title is required")
.max(100, "Title must be between 1 and 100 characters"),

description: z
.string()
.trim()
.max(500, "Description must be no more than 500 characters")
.optional(),

priority: z.enum(["low", "medium", "high"]).default("medium"),
});
