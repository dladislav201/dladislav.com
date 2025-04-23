'use client';

import { useState } from 'react';
import { Button, TerminalTyping, Wrapper } from '@/components';
import Image from 'next/image';
import { AnimatePresence, motion } from 'framer-motion';
import './Hero.scss';

interface HeroProps {
  onStartChat: () => void;
}

export const Hero = ({ onStartChat }: HeroProps) => {
  const [isTypingComplete, setIsTypingComplete] = useState(false);

  const handleTypingComplete = () => {
    setIsTypingComplete(true);
  };

  const buttonVariants = {
    hidden: {
      opacity: 0,
      y: 25,
    },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.2,
        ease: 'easeOut',
      },
    },
  };

  return (
    <Wrapper fullHeight>
      <div className="hero">
        <div className="hero__avatar">
          <Image
            src={'/avatar.png'}
            className="hero__avatar--img"
            width={100}
            height={100}
            priority={true}
            alt="Vlad Avatar Image"
          ></Image>
        </div>
        <div className="hero__copy">
          <h1 className="hero__title">
            <span>Hi there</span>, I&apos;m Vlad.
          </h1>
          <TerminalTyping
            message={`By day (and often late into the night), I build things on the web with React, Vue, TypeScript, and Node.js. Frontend by heart, fullstack when needed. \n\nChess enthusiast on a mission to become a grandmaster. Also passionate about designing and engineering great UI/UX experiences. Want to know more about my work, skills, or experience?`}
            className="hero__intro"
            onTypingComplete={handleTypingComplete}
          />
        </div>
        <AnimatePresence>
          {isTypingComplete && (
            <motion.div
              className="hero__button-wrapper"
              variants={buttonVariants}
              initial="hidden"
              animate="show"
            >
              <Button onClick={onStartChat} variant="primary" size="small">
                Ask AI Bot about Vlad
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </Wrapper>
  );
};
