'use client';

import { useRef, useCallback } from 'react';
import Link from 'next/link';
import { Project } from '../../lib/content';
import Reveal from './Reveal';

interface ProjectCardProps {
  project: Project;
  index?: number;
}

export default function ProjectCard({ project, index = 0 }: ProjectCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const card = cardRef.current;
      const img = imgRef.current;
      if (!card || !img) return;

      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = ((y - centerY) / centerY) * -6;
      const rotateY = ((x - centerX) / centerX) * 6;

      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
      img.style.transform = `scale(1.08) translateX(${(x - centerX) / 20}px) translateY(${(y - centerY) / 20}px)`;
    },
    [],
  );

  const handleMouseLeave = useCallback(() => {
    const card = cardRef.current;
    const img = imgRef.current;
    if (!card || !img) return;

    card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg)';
    img.style.transform = 'scale(1) translateX(0) translateY(0)';
  }, []);

  return (
    <Reveal direction="up" delay={index * 0.1} once>
      <div
        ref={cardRef}
        className="group flex flex-col space-y-4 transition-transform duration-200 ease-out will-change-transform"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{ transform: 'perspective(1000px) rotateX(0deg) rotateY(0deg)' }}
      >
        <div
          ref={imgRef}
          className="relative aspect-4/3 overflow-hidden bg-gray-100 rounded-lg transition-transform duration-300 ease-out will-change-transform"
        >
          <img
            src={project.heroImage}
            alt={project.title}
            className="object-cover w-full h-full group-hover:scale-105 transition duration-500"
          />
        </div>
        <div>
          <h3 className="text-lg font-normal text-gray-900 leading-tight group-hover:text-brand-primary transition-colors duration-300">
            {project.title}
          </h3>
          {project.subtitle && (
            <p className="text-xs text-gray-400 font-normal uppercase mt-1 tracking-wider">
              {project.subtitle}
            </p>
          )}
          <p className="text-sm text-gray-500 line-clamp-3 mt-2 leading-relaxed">
            {project.summary}
          </p>
        </div>
        <div>
          <Link
            href={`/whatwedo/${project.slug}`}
            className="relative inline-flex items-center text-sm font-normal text-brand-primary pb-0.5 group/link"
          >
            <span>Learn more</span>
            <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-brand-primary transition-all duration-300 group-hover/link:w-full" />
          </Link>
        </div>
      </div>
    </Reveal>
  );
}
