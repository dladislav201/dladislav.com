import React from 'react';
import { ChatMessage as ChatMessageType } from '@/entities/chat/model/types';
import { ChatBubble } from '../ChatBubble';
import classNames from 'classnames';
import './ChatMessage.scss';

interface ChatMessageProps {
  message: ChatMessageType;
}

export function ChatMessage({ message }: ChatMessageProps) {
  const isUser = message.role === 'user';

  return (
    <div
      className={classNames('message', {
        'message--sent': isUser,
        'message--received': !isUser,
      })}
    >
      <ChatBubble message={message} />
    </div>
  );
}
