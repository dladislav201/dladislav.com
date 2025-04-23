import React from 'react';
import { ChatMessage } from '@/moddels';
import { TimeDisplay } from '../TimeDisplay';
import './ChatBubble.scss';

interface ChatBubbleProps {
  message: ChatMessage;
}

export function ChatBubble({ message }: ChatBubbleProps) {
  const isUser = message.role === 'user';

  return (
    <div className="chat-bubble">
      <div className="chat-bubble__content">{message.content}</div>
      {/* <div className="chat-bubble__time">
        <TimeDisplay date={new Date(message.timestamp)} />
      </div> */}
    </div>
  );
}
