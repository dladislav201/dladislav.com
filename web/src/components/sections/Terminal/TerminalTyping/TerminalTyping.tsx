"use client";

import { useEffect, useRef, useState } from "react";
import { TextWithParagraphs } from "@/components";
import "./TerminalTyping.scss";

interface TerminalTypingProps {
  message: string;
  className?: string;
}

export const TerminalTyping = ({
  message,
  className = "",
}: TerminalTypingProps) => {
  const [text, setText] = useState("");
  const indexRef = useRef(0);
  const animationFrameRef = useRef<number | null>(null);

  useEffect(() => {
    indexRef.current = 0;
    setText("");

    const typeText = () => {
      if (indexRef.current < message.length) {
        setText(message.substring(0, indexRef.current + 1));
        indexRef.current += 1;
        animationFrameRef.current = window.requestAnimationFrame(typeText);
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
      <span className="terminal__cursor" />
    </div>
  );
};
