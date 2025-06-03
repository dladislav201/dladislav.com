import type { ContextItem, ChatMessage, ChatResponse } from './types';

/**
 * Наприклад, сервер повертає ChatMessageDTO:
 * {
 *   msg_id: string;
 *   msg_text: string;
 *   msg_role: 'user' | 'assistant';
 *   created_at: string;
 * }
 */
interface ChatMessageDTO {
  msg_id: string;
  msg_text: string;
  msg_role: 'user' | 'assistant';
  created_at: string;
}

export function toChatMessage(dto: ChatMessageDTO): ChatMessage {
  return {
    id: dto.msg_id,
    content: dto.msg_text,
    role: dto.msg_role,
    timestamp: dto.created_at,
  };
}

/**
 * Якщо API повертає контекст окремим об’єктом:
 * interface ContextItemDTO { text_snip: string; type: string; sim_score: number; }
 */
interface ContextItemDTO {
  text_snip: string;
  type: string;
  sim_score: number;
}

export function toContextItem(dto: ContextItemDTO): ContextItem {
  return {
    text: dto.text_snip,
    category: dto.type,
    similarity: dto.sim_score,
  };
}

/**
 * І нарешті, якщо є загальний DTO для відповіді:
 * interface ChatResponseDTO { answer: string; context_items: ContextItemDTO[]; }
 */
interface ChatResponseDTO {
  answer: string;
  context_items: ContextItemDTO[];
}

export function toChatResponse(dto: ChatResponseDTO): ChatResponse {
  return {
    response: dto.answer,
    context: dto.context_items.map(toContextItem),
  };
}
