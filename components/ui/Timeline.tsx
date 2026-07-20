'use client';

import { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface TimelineItem {
  year: string;
  phase: 'history' | 'present' | 'future';
  body: string;
}

interface TimelineProps {
  items: TimelineItem[];
}

const PHASE_STYLES: Record<string, { dot: string }> = {
  history: {
    dot: 'border-gray-300 bg-white',
  },
  present: {
    dot: 'border-brand-primary bg-brand-primary',
  },
  future: {
    dot: 'border-gray-500 bg-gray-500',
  },
};

function TimelineItemRow({
  item,
  index,
  isLast,
}: {
  item: TimelineItem;
  index: number;
  isLast: boolean;
}) {
  const rowRef = useRef<HTMLLIElement>(null);
  const desktopCardRef = useRef<HTMLDivElement>(null);
  const mobileCardRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  const [isDesktop, setIsDesktop] = useState(true);

  useEffect(() => {
    const mq = window.matchMedia('(min-width: 768px)');
    setIsDesktop(mq.matches);

    const handler = (e: MediaQueryListEvent) => setIsDesktop(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  useEffect(() => {
    const row = rowRef.current;
    const dot = dotRef.current;
    const line = lineRef.current;
    const card = isDesktop ? desktopCardRef.current : mobileCardRef.current;
    if (!row || !dot || !card) return;

    const ctx = gsap.context(() => {
      gsap.set(dot, { scale: 0, opacity: 0 });
      if (line) gsap.set(line, { scaleY: 0, transformOrigin: 'top center' });
      gsap.set(card, { opacity: 0, x: index % 2 === 0 ? -40 : 40 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: row,
          start: 'top 80%',
          once: true,
        },
      });

      tl.to(dot, { scale: 1, opacity: 1, duration: 0.4, ease: 'back.out(2)' });

      if (!isLast && line) {
        tl.to(line, { scaleY: 1, duration: 0.5, ease: 'power3.out' }, '-=0.3');
      }

      tl.to(card, { opacity: 1, x: 0, duration: 0.7, ease: 'power3.out' }, '-=0.4');
    }, row);

    return () => {
      ctx.revert();
    };
  }, [index, isLast, isDesktop]);

  const isLeft = index % 2 === 0;
  const phase = PHASE_STYLES[item.phase] || PHASE_STYLES.history;

  return (
    <li
      ref={rowRef}
      className={`relative flex items-start w-full ${isLast ? 'pb-0' : 'pb-14 md:pb-20'}`}
      aria-label={`${item.year} — ${item.phase}`}
    >
      <div className="hidden md:flex w-[calc(50%-28px)] items-center justify-end">
        {isLeft && (
          <div
            ref={desktopCardRef}
            className="bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-300 group"
          >
            <div className="p-5 md:p-6">
              <div className="flex items-center gap-3 mb-2">
                <span className="text-2xl md:text-3xl font-normal font-poppins text-gray-900">
                  {item.year}
                </span>
              </div>
              <p className="text-gray-600 leading-relaxed text-sm md:text-base">{item.body}</p>
            </div>
          </div>
        )}
      </div>

      <div className="relative flex flex-col items-center shrink-0 mx-5 z-10" aria-hidden="true">
        <div
          ref={dotRef}
          className={`w-4 h-4 rounded-full border-2 ${phase.dot}`}
        />
        {!isLast && (
          <div
            ref={lineRef}
            className="w-0.5 flex-1 bg-linear-to-b from-gray-200 to-transparent mt-1"
            style={{ transform: 'scaleY(0)', transformOrigin: 'top center' }}
          />
        )}
      </div>

      <div className="hidden md:flex w-[calc(50%-28px)] items-center">
        {!isLeft && (
          <div
            ref={desktopCardRef}
            className="bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-300 group"
          >
            <div className="p-5 md:p-6">
              <div className="flex items-center gap-3 mb-2">
                <span className="text-2xl md:text-3xl font-normal font-poppins text-gray-900">
                  {item.year}
                </span>
              </div>
              <p className="text-gray-600 leading-relaxed text-sm md:text-base">{item.body}</p>
            </div>
          </div>
        )}
      </div>

      <div className="flex md:hidden flex-1">
        <div className="ml-4 flex-1">
          <div
            ref={mobileCardRef}
            className="bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-300 group"
          >
            <div className="p-5 md:p-6">
              <div className="flex items-center gap-3 mb-2">
                <span className="text-2xl md:text-3xl font-normal font-poppins text-gray-900">
                  {item.year}
                </span>
              </div>
              <p className="text-gray-600 leading-relaxed text-sm md:text-base">{item.body}</p>
            </div>
          </div>
        </div>
      </div>
    </li>
  );
}

export default function Timeline({ items }: TimelineProps) {
  const headerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const header = headerRef.current;
    if (!header) return;

    const ctx = gsap.context(() => {
      const headerItems = header.querySelectorAll('.timeline-header-item');
      if (!headerItems.length) return;

      gsap.fromTo(
        headerItems,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: header,
            start: 'top 85%',
            once: true,
          },
        },
      );
    }, header);

    const refreshId = requestAnimationFrame(() => ScrollTrigger.refresh());

    return () => {
      cancelAnimationFrame(refreshId);
      ctx.revert();
    };
  }, []);

  if (!items || items.length === 0) return null;

  return (
    <section className="relative w-full py-4 md:py-8">
      <div
        className="hidden md:block absolute left-1/2 top-28 bottom-0 w-px bg-linear-to-b from-gray-200 via-gray-200 to-transparent -translate-x-1/2"
        aria-hidden="true"
      />
      <div
        className="md:hidden absolute left-7 top-28 bottom-0 w-px bg-linear-to-b from-gray-200 via-gray-200 to-transparent"
        aria-hidden="true"
      />

      <div ref={headerRef} className="text-center mb-14 md:mb-20">
        <div className="inline-flex items-center gap-2 text-xs font-normal uppercase tracking-[0.2em] text-brand-primary bg-brand-primary/5 px-4 py-1.5 rounded-full mb-3 timeline-header-item">
          <span className="w-1.5 h-1.5 rounded-full bg-brand-primary" />
          Our Story
        </div>
        <h3 className="text-3xl md:text-4xl font-normal font-poppins text-gray-900 tracking-tight timeline-header-item">
          Milestones
        </h3>
      </div>

      <ol className="relative list-none p-0 m-0" aria-label="Company milestones">
        {items.map((item, idx) => (
          <TimelineItemRow
            key={idx}
            item={item}
            index={idx}
            isLast={idx === items.length - 1}
          />
        ))}
      </ol>
    </section>
  );
}
