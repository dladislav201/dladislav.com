import React from 'react';
import { ChatMessage } from '@/moddels';
import './ChatBubble.scss';

interface ChatBubbleProps {
  message: ChatMessage;
}

export function ChatBubble({ message }: ChatBubbleProps) {
  return (
    <div className="chat-bubble">
      <div className="chat-bubble__content">{message.content}</div>
    </div>
  );
}
