'use client';

import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function CareersActions() {
  const btnRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    const btn = btnRef.current;
    if (!btn) return;

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: btn,
        start: 'top 85%',
        once: true,
        onEnter: () => {
          gsap.fromTo(
            btn,
            { scale: 1 },
            {
              scale: 1.03,
              duration: 0.6,
              yoyo: true,
              repeat: 1,
              ease: 'power1.inOut',
            },
          );
        },
      });
    }, btn);

    return () => ctx.revert();
  }, []);

  return (
    <div className="flex flex-col items-center space-y-4">
      <p className="text-sm text-gray-400 font-medium">Email your CV or resume to:</p>
      <a
        ref={btnRef}
        href="mailto:career@aspire.id"
        className="inline-flex px-8 py-3.5 bg-brand-black text-white font-normal tracking-wider uppercase hover:bg-brand-primary transition-all duration-300 rounded hover:shadow-lg hover:scale-[1.03] active:scale-95"
      >
        Join Now
      </a>
      <a
        href="mailto:career@aspire.id"
        className="text-brand-primary font-normal text-sm relative group"
      >
        career@aspire.id
        <span className="absolute bottom-0 left-0 w-0 h-px bg-brand-primary transition-all duration-300 group-hover:w-full" />
      </a>
    </div>
  );
}
