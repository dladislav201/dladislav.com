import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { ChatMessage } from '@/moddels';
import { sendChatMessage } from '@/lib';

export function useChatMessages() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      content: "Hello! I'm an AI assistant for Vladyslav's portfolio. How can I help you?",
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
      const friendlyErrorMessage =
        "Sorry, I couldn't process your request. Please try again later.";

      const detailedErrorMessage =
        err instanceof Error ? err.message : 'Failed to get a response. Please try again.';

      const errorToShow =
        process.env.NODE_ENV === 'production' ? friendlyErrorMessage : detailedErrorMessage;

      setError(errorToShow);
      console.error('Error in AI Chat:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    messages,
    isLoading,
    error,
    sendMessage: handleSendMessage
  };
}