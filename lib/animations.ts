//shared animation configuration for GSAP powered animations

import gsap from 'gsap';

export const ANIMATION_DEFAULTS = {
  revealDuration: 0.8,
  ease: 'power3.out',
  slideDistance: 40,
  scrollStart: 'top 85%',
} as const;

export type RevealDirection = 'up' | 'down' | 'left' | 'right';

export function getFromVars(
  direction: RevealDirection = 'up',
  distance: number = ANIMATION_DEFAULTS.slideDistance,
) {
  const from: gsap.TweenVars = { opacity: 0 };
  switch (direction) {
    case 'up':
      from.y = distance;
      break;
    case 'down':
      from.y = -distance;
      break;
    case 'left':
      from.x = distance;
      break;
    case 'right':
      from.x = -distance;
      break;
  }
  return from;
}
