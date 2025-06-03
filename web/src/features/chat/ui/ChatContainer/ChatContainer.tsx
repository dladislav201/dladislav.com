'use client';

import React, { useEffect, useRef } from 'react';
import { ChatField } from '../ChatField';
import { ChatMessage } from '../ChatMessage';
import { Wrapper } from '@/shared/ui';
import { promptTips } from '@/shared/constants';
import { useChatMessages } from '@/features/chat/hooks/useChatMessages';
import { motion } from 'framer-motion';
import { X, Lightbulb } from 'lucide-react';
import './ChatContainer.scss';

interface ChatContainerProps {
  onCloseBtnClick: () => void;
}

export function ChatContainer({ onCloseBtnClick }: ChatContainerProps) {
  const { messages, isLoading, error, sendMessage } = useChatMessages();
  const inputWrapper = useRef<HTMLDivElement | null>(null);
  const chatContentRef = useRef<HTMLDivElement | null>(null);
  const chatCurtainRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const updatePadding = () => {
      if (
        inputWrapper.current &&
        chatContentRef.current &&
        chatCurtainRef.current
      ) {
        const height = inputWrapper.current.offsetHeight;
        chatContentRef.current.style.paddingBottom = `${height}px`;
        chatCurtainRef.current.style.height = `${height}px`;
      }
    };
    updatePadding();

    window.addEventListener('resize', updatePadding);

    return () => window.removeEventListener('resize', updatePadding);
  }, [messages, isLoading]);

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
      <button
        className="chat__close-button"
        onClick={onCloseBtnClick}
        title="Close chat"
      >
        <X size={20} strokeWidth={2} />
      </button>
      <Wrapper fullHeight>
        <div className="chat__wrapper">
          <div ref={chatContentRef} className="chat__content">
            {error && <div className="chat__error">{error}</div>}

            {messages.length < 2 && (
              <ul className="chat__tips">
                {promptTips.map((tip, index) => (
                  <li
                    key={index}
                    className="chat__tip"
                    onClick={() => sendMessage(tip)}
                  >
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

          <div ref={inputWrapper} className="chat__input-wrapper">
            <ChatField onSendMessage={sendMessage} isLoading={isLoading} />
            <div className="chat__disclaimer">
              <p className="chat__disclaimer-copy">
                This chat uses artificial intelligence technology powered by
                OpenAI. Responses are generated automatically and may not always
                be accurate. Do not rely on this system for medical, legal,
                financial, or other professional advice. Your messages may be
                processed by OpenAI&apos;s API to generate responses. By using
                this chat, you acknowledge these limitations.
              </p>
            </div>
          </div>
          <div ref={chatCurtainRef} className="chat__curtain">
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
