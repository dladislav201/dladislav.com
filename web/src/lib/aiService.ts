import { AuthError, ChatError, RateLimitError } from '@/errors/ChatErrors';
import { ChatResponse } from '@/types/ai';

const API_URL =
  process.env.NODE_ENV === 'development'
    ? 'http://localhost:3001'
    : process.env.NEXT_PUBLIC_API_URL;

export async function sendChatMessage(message: string): Promise<ChatResponse> {
  const res = await fetch(`${API_URL}/api/ai/chat`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ message }),
  });

  const payload = await res.json().catch(() => ({}));
  if (res.status === 429) {
    throw new RateLimitError(payload.message || 'Too many requests', payload);
  }
  if (res.status === 401) {
    throw new AuthError(payload.message || 'Unauthorized', payload);
  }
  if (!res.ok) {
    const msg = payload.message || payload.error;
    throw new ChatError(msg, res.status, payload);
  }

  return payload;
}
