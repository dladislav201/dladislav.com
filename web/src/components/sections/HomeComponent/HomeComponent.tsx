'use client';

import { useState, useEffect } from 'react';
import { Hero, ChatContainer, Curtain } from '@/components';
import { AnimatePresence } from 'framer-motion';
import './HomeComponent.scss';

export const HomeComponent = () => {
  const [isChatVissible, setIsChatVissible] = useState(false);

  const handleStartChat = () => setIsChatVissible(true);
  const handleEndChat = () => setIsChatVissible(false);

  useEffect(() => {
    if (isChatVissible) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isChatVissible]);

  return (
    <>
      <Hero onStartChat={handleStartChat} />
      <AnimatePresence>
        {isChatVissible && (
          <>
            <Curtain key="chat-curtain" onCurtainClick={handleEndChat} />
            <ChatContainer key="chat-container" onCloseBtnClick={handleEndChat} />
          </>
        )}
      </AnimatePresence>
    </>
  );
};
