'use client';
import React, { useState, useRef, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';
import './ChatField.scss';

interface ChatFieldProps {
  onSendMessage: (message: string) => void;
  isLoading: boolean;
}

export function ChatField({ onSendMessage, isLoading }: ChatFieldProps) {
  const [message, setMessage] = useState('');
  const inputRef = useRef<HTMLTextAreaElement | null>(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.style.height = '40px';
      const scrollHeight = inputRef.current.scrollHeight;
      inputRef.current.style.height = `${Math.min(scrollHeight, 150)}px`;
    }
  }, [message]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim() || isLoading) return;

    onSendMessage(message.trim());
    setMessage('');
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <form className="chat-field" onSubmit={handleSubmit}>
      <textarea
        ref={inputRef}
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyDown={handleKeyDown}
        disabled={isLoading}
        placeholder="Ask something..."
        className="chat-field__textarea"
      />
      <div className="chat-field__button-wrapper">
        <button
          type="submit"
          className="chat-field__button"
          disabled={isLoading || !message.trim()}
        >
          <ArrowUp size={20} strokeWidth={2} />
        </button>
      </div>
    </form>
  );
}
