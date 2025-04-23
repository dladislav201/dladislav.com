'use client';

import React, { useState } from 'react';
import { ChatField } from '../ChatField';
import { ChatMessage } from '../ChatMessage';
import { Wrapper } from '@/components';
import { ChatMessage as ChatMessageType } from '@/moddels';
import { motion } from 'framer-motion';
import { promptTips } from '@/data';
import { X, Lightbulb } from 'lucide-react';
import { v4 as uuidv4 } from 'uuid';
import { sendChatMessage } from '@/lib';
import './ChatContainer.scss';

interface ChatContainerProps {
  onCloseBtnClick: () => void;
}

export function ChatContainer({ onCloseBtnClick }: ChatContainerProps) {
  const [messages, setMessages] = useState<ChatMessageType[]>([
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

    const userMessage: ChatMessageType = {
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

      const assistantMessage: ChatMessageType = {
        id: uuidv4(),
        content: aiResponse,
        role: 'assistant',
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (err: unknown) {
      const errorMessage =
        err instanceof Error ? err.message : 'Failed to get a response. Please try again.';

      setError(errorMessage);
      console.error('Error in AI Chat:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const containerVariants = {
    hidden: {
      opacity: 0,
      y: 225,
    },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.2,
        ease: 'easeOut',
      },
    },
    exit: {
      opacity: 0,
      y: 225,
      transition: {
        duration: 0.2,
        ease: 'easeOut',
      },
    },
  };

  return (
    <motion.div
      className="chat"
      variants={containerVariants}
      initial="hidden"
      animate="show"
      exit="exit"
    >
      <button className="chat__close-button" onClick={onCloseBtnClick} title="Close chat">
        <X size={20} strokeWidth={2} />
      </button>
      <Wrapper fullHeight>
        <div className="chat__wrapper">
          <div className="chat__content">
            {error && <div className="chat__error">{error}</div>}

            {messages.length < 2 && (
              <ul className="chat__tips">
                {promptTips.map((tip, index) => (
                  <li key={index} className="chat__tip" onClick={() => handleSendMessage(tip)}>
                    <Lightbulb size={14} strokeWidth={2} />
                    {tip}
                  </li>
                ))}
              </ul>
            )}

            {isLoading && (
              <div className="chat__typing-indicator">
                <div className="chat__typing-dot"></div>
                <div className="chat__typing-dot"></div>
                <div className="chat__typing-dot"></div>
              </div>
            )}

            {[...messages].reverse().map((message) => (
              <ChatMessage key={message.id} message={message} />
            ))}
          </div>

          <div className="chat__input-wrapper">
            <ChatField onSendMessage={handleSendMessage} isLoading={isLoading} />
            <div className="chat__disclaimer">
              <p className="chat__disclaimer-copy">
                This chat uses artificial intelligence technology powered by OpenAI. Responses are
                generated automatically and may not always be accurate. Do not rely on this system
                for medical, legal, financial, or other professional advice. Your messages may be
                processed by OpenAI's API to generate responses. By using this chat, you acknowledge
                these limitations.
              </p>
            </div>
          </div>
          <div className="chat__curtain">
            <div className="chat__curtain-blur">
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
            </div>
            <div className="chat__curtain-gradient"></div>
          </div>
        </div>
      </Wrapper>
    </motion.div>
  );
}
