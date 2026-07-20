'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface CountUpOptions {
  value: number;
  duration?: number;
  delay?: number;
  start?: string;
  suffix?: string;
  prefix?: string;
  separator?: string;
  decimals?: number;
  disabled?: boolean;
}

export function useCountUp(options: CountUpOptions) {
  const {
    value,
    duration = 2,
    delay = 0.2,
    start = 'top 85%',
    suffix = '',
    prefix = '',
    separator = ',',
    decimals = 0,
    disabled = false,
  } = options;

  const ref = useRef<HTMLSpanElement>(null);
  const [hasAnimated, setHasAnimated] = useState(false);

  const formatNumber = useCallback(
    (num: number) => {
      const fixed = num.toFixed(decimals);
      const [int, dec] = fixed.split('.');
      const formattedInt = int.replace(/\B(?=(\d{3})+(?!\d))/g, separator);
      const formattedDecimals = dec !== undefined ? `.${dec}` : '';
      return `${prefix}${formattedInt}${formattedDecimals}${suffix}`;
    },
    [prefix, suffix, separator, decimals],
  );

  useEffect(() => {
    const el = ref.current;
    if (!el || disabled || hasAnimated) return;

    const ctx = gsap.context(() => {
      el.textContent = formatNumber(0);
      gsap.set(el, { opacity: 1 });

      const obj = { val: 0 };

      ScrollTrigger.create({
        trigger: el,
        start,
        once: true,
        onEnter: () => {
          gsap.to(obj, {
            val: value,
            duration,
            delay,
            ease: 'power3.out',
            onUpdate: () => {
              el.textContent = formatNumber(obj.val);
            },
            onComplete: () => {
              el.textContent = formatNumber(value);
              setHasAnimated(true);
            },
          });
        },
        markers: false,
      });
    }, el);

    return () => ctx.revert();
  }, [value, duration, delay, start, disabled, hasAnimated, formatNumber]);

  return ref;
}
