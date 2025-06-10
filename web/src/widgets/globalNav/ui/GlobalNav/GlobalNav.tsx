'use client';

import { useEffect, useRef, useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import classNames from 'classnames';
import { Wrapper, Curtain } from '@/shared/ui';
import { DesktopMenu } from '../DesktopMenu';
import { MobileMenu } from '../MobileMenu';
import { useResponsive } from '@/shared/hooks';
import './GlobalNav.scss';

export const Globalnav = () => {
  const { isMobile } = useResponsive();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const bottomOpenRef = useRef<SVGAnimateElement | null>(null);
  const bottomCloseRef = useRef<SVGAnimateElement | null>(null);
  const topOpenRef = useRef<SVGAnimateElement | null>(null);
  const topCloseRef = useRef<SVGAnimateElement | null>(null);

  const toggleNav = () => {
    if (isMenuOpen) {
      startCloseAnimation();
    } else {
      startOpenAnimation();
    }

    setIsMenuOpen(!isMenuOpen);
  };

  const startOpenAnimation = () => {
    bottomOpenRef.current?.beginElement();
    topOpenRef.current?.beginElement();
  };

  const startCloseAnimation = () => {
    bottomCloseRef.current?.beginElement();
    topCloseRef.current?.beginElement();
  };

  useEffect(() => {
    const handleScroll = () => {
      if (isMenuOpen) {
        setIsMenuOpen(false);
        startCloseAnimation();
      }
    };

    if (isMenuOpen) {
      window.addEventListener('scroll', handleScroll);
    } else {
      window.removeEventListener('scroll', handleScroll);
    }

    return () => window.removeEventListener('scroll', handleScroll);
  }, [isMenuOpen]);

  return (
    <>
      <nav
        className={classNames('globalnav', {
          'globalnav--expanded': isMenuOpen,
        })}
      >
        <Wrapper fullHeight>
          <div className="globalnav__content">
            {isMobile ? <MobileMenu isOpen={isMenuOpen} /> : <DesktopMenu />}

            <div className="globalnav__burger">
              <button className="globalnav__burger-btn" onClick={toggleNav}>
                <svg width="28" height="28" viewBox="0 0 18 18">
                  <polyline
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    points="2 12, 16 12"
                  >
                    <animate
                      ref={bottomOpenRef}
                      attributeName="points"
                      keyTimes="0;0.5;1"
                      dur="0.24s"
                      begin="indefinite"
                      fill="freeze"
                      calcMode="spline"
                      keySplines="0.42, 0, 1, 1;0, 0, 0.58, 1"
                      values=" 2 12, 16 12; 2 9, 16 9; 3.5 15, 15 3.5"
                    ></animate>
                    <animate
                      ref={bottomCloseRef}
                      attributeName="points"
                      keyTimes="0;0.5;1"
                      dur="0.24s"
                      begin="indefinite"
                      fill="freeze"
                      calcMode="spline"
                      keySplines="0.42, 0, 1, 1;0, 0, 0.58, 1"
                      values=" 3.5 15, 15 3.5; 2 9, 16 9; 2 12, 16 12"
                    ></animate>
                  </polyline>
                  <polyline
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    points="2 5, 16 5"
                  >
                    <animate
                      ref={topOpenRef}
                      attributeName="points"
                      keyTimes="0;0.5;1"
                      dur="0.24s"
                      begin="indefinite"
                      fill="freeze"
                      calcMode="spline"
                      keySplines="0.42, 0, 1, 1;0, 0, 0.58, 1"
                      values=" 2 5, 16 5; 2 9, 16 9; 3.5 3.5, 15 15"
                    ></animate>
                    <animate
                      ref={topCloseRef}
                      attributeName="points"
                      keyTimes="0;0.5;1"
                      dur="0.24s"
                      begin="indefinite"
                      fill="freeze"
                      calcMode="spline"
                      keySplines="0.42, 0, 1, 1;0, 0, 0.58, 1"
                      values=" 3.5 3.5, 15 15; 2 9, 16 9; 2 5, 16 5"
                    ></animate>
                  </polyline>
                </svg>
              </button>
            </div>
          </div>
        </Wrapper>
      </nav>
      <AnimatePresence>
        {isMobile && isMenuOpen && (
          <Curtain onCurtainClick={toggleNav} disableOnDesktop />
        )}
      </AnimatePresence>
    </>
  );
};
