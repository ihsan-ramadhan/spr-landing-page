'use client';

import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { prefersReducedMotion } from '../../lib/motion';

interface HeroAnimationProps {
  text: string;
}

export default function HeroAnimation({ text }: HeroAnimationProps) {
  const headingRef = useRef<HTMLHeadingElement>(null);

  const words = text.split(' ');

  useEffect(() => {
    const heading = headingRef.current;
    if (!heading) return;

    const wordSpans = heading.querySelectorAll('.hero-word');

    if (prefersReducedMotion()) {
      gsap.set(wordSpans, { opacity: 1, y: 0, rotateX: 0 });
      return;
    }

    const ctx = gsap.context(() => {
      gsap.fromTo(
        wordSpans,
        { opacity: 0, y: 30, rotateX: -20 },
        {
          opacity: 1,
          y: 0,
          rotateX: 0,
          duration: 0.8,
          stagger: 0.08,
          ease: 'power3.out',
          delay: 0.3,
        },
      );
    }, heading);

    return () => ctx.revert();
  }, []);

  return (
    <h1
      ref={headingRef}
      className="text-white text-4xl md:text-6xl font-normal max-w-3xl leading-tight font-poppins"
    >
      {words.map((word, idx) => (
        <span key={idx} className="inline-block hero-word">
          {word}
          {idx < words.length - 1 ? '\u00A0' : ''}
        </span>
      ))}
    </h1>
  );
}
