'use client';

import { useRef, useEffect, useState } from 'react';

interface TimelineItem {
  year: string;
  phase: 'history' | 'present' | 'future';
  body: string;
}

interface TimelineProps {
  items: TimelineItem[];
}

const PHASE_STYLES: Record<
  string,
  { dot: string }
> = {
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

function useInView(ref: React.RefObject<HTMLLIElement | null>, threshold = 0.2) {
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.unobserve(el);
        }
      },
      { threshold }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [ref, threshold]);

  return isInView;
}

function TimelineEntry({
  item,
  index,
  isLast,
}: {
  item: TimelineItem;
  index: number;
  isLast: boolean;
}) {
  const entryRef = useRef<HTMLLIElement>(null);
  const isInView = useInView(entryRef, 0.2);
  const isLeft = index % 2 === 0;

  const phase = PHASE_STYLES[item.phase] || PHASE_STYLES.history;

  const cardContent = (
    <div className="bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden group">
      <div className="p-5 md:p-6">
        <div className="flex items-center gap-3 mb-2">
          <span className="text-2xl md:text-3xl font-normal font-poppins text-gray-900">
            {item.year}
          </span>
        </div>
        <p className="text-gray-600 leading-relaxed text-sm md:text-base">{item.body}</p>
      </div>
    </div>
  );

  return (
    <li
      ref={entryRef}
      className={`relative flex items-start w-full ${isLast ? 'pb-0' : 'pb-14 md:pb-20'}`}
      aria-label={`${item.year} — ${item.phase}`}
    >
      <div className="hidden md:flex w-[calc(50%-28px)] items-center justify-end">
        <div
          className={`w-full transition-all duration-700 ease-out motion-reduce:transition-none motion-reduce:opacity-100 ${
            isLeft
              ? isInView
                ? 'opacity-100 translate-x-0'
                : 'opacity-0 -translate-x-10'
              : isInView
                ? 'opacity-100 translate-x-0'
                : 'opacity-0 translate-x-10'
          }`}
        >
          {isLeft && cardContent}
        </div>
      </div>

      <div
        className="relative flex flex-col items-center shrink-0 mx-5 z-10"
        aria-hidden="true"
      >
        <div
          className={`w-4 h-4 rounded-full border-2 ${phase.dot} ring-4 ring-white transition-all duration-500 ease-out motion-reduce:transition-none motion-reduce:scale-100 motion-reduce:opacity-100 ${
            isInView ? 'scale-100 opacity-100' : 'scale-0 opacity-0'
          }`}
        />
        {!isLast && (
          <div className="w-0.5 flex-1 bg-gradient-to-b from-gray-200 to-transparent mt-1" />
        )}
      </div>

      <div className="hidden md:flex w-[calc(50%-28px)] items-center">
        <div
          className={`w-full transition-all duration-700 ease-out motion-reduce:transition-none motion-reduce:opacity-100 ${
            !isLeft
              ? isInView
                ? 'opacity-100 translate-x-0'
                : 'opacity-0 translate-x-10'
              : isInView
                ? 'opacity-100 translate-x-0'
                : 'opacity-0 -translate-x-10'
          }`}
        >
          {!isLeft && cardContent}
        </div>
      </div>

      <div
        className={`flex md:hidden flex-1 transition-all duration-700 ease-out motion-reduce:transition-none motion-reduce:opacity-100 motion-reduce:translate-y-0 ${
          isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}
      >
        <div className="ml-4 flex-1">{cardContent}</div>
      </div>
    </li>
  );
}

export default function Timeline({ items }: TimelineProps) {
  if (!items || items.length === 0) return null;

  return (
    <section className="relative w-full py-4 md:py-8">
      <div
        className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-gray-200 via-gray-200 to-transparent -translate-x-1/2"
        aria-hidden="true"
      />

      <div
        className="md:hidden absolute left-[28px] top-0 bottom-0 w-px bg-gradient-to-b from-gray-200 via-gray-200 to-transparent"
        aria-hidden="true"
      />

      <div className="text-center mb-14 md:mb-20">
        <div className="inline-flex items-center gap-2 text-xs font-normal uppercase tracking-[0.2em] text-brand-primary bg-brand-primary/5 px-4 py-1.5 rounded-full mb-3">
          <span className="w-1.5 h-1.5 rounded-full bg-brand-primary" />
          Our Story
        </div>
        <h3 className="text-3xl md:text-4xl font-normal font-poppins text-gray-900 tracking-tight">
          Milestones
        </h3>
        <div className="mt-3 h-px w-12 bg-brand-primary/30 mx-auto" />
      </div>

      <ol className="relative list-none p-0 m-0" aria-label="Company milestones">
        {items.map((item, idx) => (
          <TimelineEntry
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
