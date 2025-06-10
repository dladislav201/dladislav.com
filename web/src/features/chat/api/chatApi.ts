import { ApiClient } from '@/shared/api';
import { normalizeApiError } from '@/shared/api';
import { ChatMessageSchemaDTO, ChatMessage, toMessage } from '@/entities/chat';
import { z } from 'zod';

const api = new ApiClient({});

export async function sendMessage(message: string): Promise<ChatMessage> {
  try {
    const dto = await api.post('/ai/chat', ChatMessageSchemaDTO, {
      message,
    });
    return toMessage(dto);
  } catch (err) {
    throw normalizeApiError(err);
  }
}

export async function getChatHistory(): Promise<ChatMessage[]> {
  try {
    const dtos = await api.get(
      '/ai/chat/history',
      z.array(ChatMessageSchemaDTO),
    );
    return dtos.map(toMessage);
  } catch (err) {
    throw normalizeApiError(err);
  }
}
