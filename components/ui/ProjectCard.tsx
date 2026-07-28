'use client';

import Link from 'next/link';
import { Project } from '../../lib/content';
import Reveal from './Reveal';

interface ProjectCardProps {
  project: Project;
  index?: number;
}

export default function ProjectCard({ project, index = 0 }: ProjectCardProps) {
  return (
    <Reveal direction="up" delay={index * 0.1} once>
      <div className="group flex flex-col space-y-4">
        <div className="relative aspect-4/3 overflow-hidden bg-gray-100 rounded-lg">
          <img
            src={project.heroImage}
            alt={project.title}
            className="object-cover w-full h-full"
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
