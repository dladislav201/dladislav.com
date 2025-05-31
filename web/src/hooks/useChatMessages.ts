import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { ChatMessage } from '@/types/ai';
import { sendChatMessage } from '@/lib/aiService';
import { getErrorMessage } from '@/utils/getErrorMessage';
import { AuthError, ChatError, RateLimitError } from '@/errors/ChatErrors';

export function useChatMessages() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      content:
        "Hello! I'm an AI assistant for Vladyslav's portfolio. How can I help you?",
      role: 'assistant',
      timestamp: new Date(),
    },
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSendMessage = async (message: string) => {
    if (!message.trim()) return;

    const userMessage: ChatMessage = {
      id: uuidv4(),
      content: message,
      role: 'user',
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);
    setError(null);

    try {
      const { response: aiResponse } = await sendChatMessage(message);

      const assistantMessage: ChatMessage = {
        id: uuidv4(),
        content: aiResponse,
        role: 'assistant',
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (err: unknown) {
      if (
        err instanceof RateLimitError ||
        err instanceof AuthError ||
        err instanceof ChatError
      ) {
        setError(err.message);
      } else {
        setError(
          getErrorMessage(err, {
            map: { 500: 'Internal server error. Please try again later.' },
          }),
        );
      }
    } finally {
      setIsLoading(false);
    }
  };

  return {
    messages,
    isLoading,
    error,
    sendMessage: handleSendMessage,
  };
}
