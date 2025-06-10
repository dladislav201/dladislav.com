import { z } from 'zod';
import type { ChatMessage } from './types';

export const ChatMessageRoleEnum = z.enum(['system', 'user', 'assistant']);

export const ChatMessageSchemaDTO = z.object({
  id: z.string(),
  role: ChatMessageRoleEnum,
  content: z.string(),
  timestamp: z.string(),
});

export type ChatMessageDTO = z.infer<typeof ChatMessageSchemaDTO>;

export function toMessage(dto: ChatMessageDTO): ChatMessage {
  const { id, role, content, timestamp } = dto;
  return {
    id,
    role,
    content,
    timestamp,
  };
}
