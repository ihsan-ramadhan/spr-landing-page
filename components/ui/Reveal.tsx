'use client';

import { ReactNode, useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ANIMATION_DEFAULTS, type RevealDirection, getFromVars } from '../../lib/animations';

gsap.registerPlugin(ScrollTrigger);

interface RevealProps {
  children: ReactNode;
  direction?: RevealDirection;
  distance?: number;
  duration?: number;
  delay?: number;
  start?: string;
  once?: boolean;
  className?: string;
  as?: 'div' | 'section' | 'article' | 'span';
  disabled?: boolean;
}

export default function Reveal({
  children,
  direction = 'up',
  distance,
  duration = ANIMATION_DEFAULTS.revealDuration,
  delay = 0,
  start = ANIMATION_DEFAULTS.scrollStart,
  once = true,
  className,
  as: Tag = 'div',
  disabled = false,
}: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || disabled) return;

    const fromVars = {
      ...getFromVars(direction, distance || ANIMATION_DEFAULTS.slideDistance),
      ease: ANIMATION_DEFAULTS.ease,
    };

    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        fromVars,
        {
          opacity: 1,
          x: 0,
          y: 0,
          duration,
          delay,
          ease: ANIMATION_DEFAULTS.ease,
          scrollTrigger: {
            trigger: el,
            start,
            once,
          },
        },
      );
    }, el);

    return () => ctx.revert();
  }, [disabled, direction, distance, duration, delay, start, once]);

  return (
    <Tag ref={ref} className={className}>
      {children}
    </Tag>
  );
}
