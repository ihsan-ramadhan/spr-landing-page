import { getProjects } from '../../lib/content';
import ProjectCard from '../../components/ui/ProjectCard';
import Reveal from '../../components/ui/Reveal';

export default function WhatWeDoPage() {
  const projects = getProjects();

  return (
    <div className="py-20 px-6 bg-white">
      <div className="max-w-[90%] mx-auto">
        <Reveal direction="up" delay={0.1}>
          <h1 className="text-3xl md:text-5xl font-normal mb-16 font-poppins">What We Do</h1>
        </Reveal>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-x-12 gap-y-20">
          {projects.map((project, idx) => (
            <ProjectCard key={project.slug} project={project} index={idx} />
          ))}
        </div>
      </div>
    </div>
  );
}
