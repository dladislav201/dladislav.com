import { z } from "zod";

export const contextItemSchema = z.object({
    text: z.string(),
    category: z.string(),
    similarity: z.number(),
});

export const chatMessageSchema = z.object({
    id: z.string(),
    content: z.string(),
    role: z.enum(['user', 'assistant']),
    timestamp: z.date(),
    context: z.array(contextItemSchema).optional(),
});
  
export const chatResponseSchema = z.object({
    response: z.string(),
    context: z.array(contextItemSchema).optional(),
});

export type ContextItem = z.infer<typeof contextItemSchema>;
export type ChatMessage = z.infer<typeof chatMessageSchema>;
export type ChatResponse = z.infer<typeof chatResponseSchema>;