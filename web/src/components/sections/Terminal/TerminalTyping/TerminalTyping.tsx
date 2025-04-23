'use client';

import { useEffect, useRef, useState } from 'react';
import { TextWithParagraphs } from '@/components';
import classNames from 'classnames';
import './TerminalTyping.scss';

interface TerminalTypingProps {
  message: string;
  className?: string;
  onTypingComplete?: () => void;
}

export const TerminalTyping = ({
  message,
  className = '',
  onTypingComplete,
}: TerminalTypingProps) => {
  const [text, setText] = useState('');
  const [isTypingComplete, setIsTypingComplete] = useState(false);
  const indexRef = useRef(0);
  const animationFrameRef = useRef<number | null>(null);

  useEffect(() => {
    indexRef.current = 0;
    setText('');
    setIsTypingComplete(false);

    const typeText = () => {
      if (indexRef.current < message.length) {
        setText(message.substring(0, indexRef.current + 1));
        indexRef.current += 1;
        animationFrameRef.current = window.requestAnimationFrame(typeText);
      } else {
        setIsTypingComplete(true);
        if (onTypingComplete) onTypingComplete();
      }
    };

    animationFrameRef.current = window.requestAnimationFrame(typeText);

    return () => {
      if (animationFrameRef.current !== null) {
        window.cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [message]);

  return (
    <div className={`terminal ${className}`}>
      <span className="terminal__text">
        <TextWithParagraphs text={text} />
      </span>
      <span
        className={classNames('terminal__cursor', { 'terminal__cursor--blink': isTypingComplete })}
      />
    </div>
  );
};
