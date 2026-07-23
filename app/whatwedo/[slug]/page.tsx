import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { getProjects, getProjectBySlug } from '../../../lib/content';
import StatCard from '../../../components/ui/StatCard';
import Reveal from '../../../components/ui/Reveal';
import ParallaxBackground from '../../../components/ui/ParallaxBackground';
import ProjectMap from '../../../components/ui/ProjectMap';
import { use } from 'react';

interface ProjectPageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  const projects = getProjects();
  return projects.map((project) => ({
    slug: project.slug,
  }));
}

export default function ProjectDetailPage({ params }: ProjectPageProps) {
  const resolvedParams = use(params);
  const project = getProjectBySlug(resolvedParams.slug);
  if (!project) {
    notFound();
  }

  const projects = getProjects();
  const currentIndex = projects.findIndex((p) => p.slug === project.slug);
  const prevProject = currentIndex > 0 ? projects[currentIndex - 1] : null;
  const nextProject = currentIndex < projects.length - 1 ? projects[currentIndex + 1] : null;

  return (
    <div className="bg-white">
      <ParallaxBackground
        className="relative min-h-[40vh] bg-brand-black flex items-end py-16 px-6 bg-cover bg-center"
        style={{
          backgroundImage: project.heroImage
            ? `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.7)), url('${project.heroImage}')`
            : "linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.7))",
        }}
      >
        <div className="max-w-[90%] mx-auto w-full">
          {project.subtitle && (
            <Reveal direction="up" delay={0.1}>
              <span className="text-xs text-gray-400 font-normal uppercase tracking-wider font-poppins">
                {project.subtitle}
              </span>
            </Reveal>
          )}
          <Reveal direction="up" delay={0.2}>
            <h1 className="text-white text-3xl md:text-5xl font-normal mt-2 font-poppins">
              {project.title}
            </h1>
          </Reveal>
        </div>
      </ParallaxBackground>

      {project.stats && project.stats.length > 0 && (
        <section className="bg-gray-100/50 border-y border-gray-100">
          <div className="max-w-[90%] mx-auto px-6 py-12">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
              {project.stats.map((stat, i) => (
                <StatCard key={i} label={stat.label} value={stat.value} unit={stat.unit} index={i} />
              ))}
            </div>
          </div>
        </section>
      )}

      {project.mapCoordinates && (
        <section className="bg-white border-b border-gray-100">
          <div className="max-w-[90%] mx-auto px-6 py-12">
            <Reveal direction="up" delay={0.1}>
              <h2 className="text-xl md:text-2xl font-normal mb-2 font-poppins text-gray-900">
                Site Location
              </h2>
              <p className="text-sm text-gray-500 mb-6">{project.mapCoordinates.label}</p>
            </Reveal>
            <Reveal direction="up" delay={0.2}>
              <ProjectMap
                lat={project.mapCoordinates.lat}
                lng={project.mapCoordinates.lng}
                zoom={project.mapCoordinates.zoom}
                label={project.mapCoordinates.label}
              />
            </Reveal>
          </div>
        </section>
      )}

      <section className="max-w-[90%] mx-auto px-6 py-16">
        <div className="space-y-12">
          {project.sections.map((section, idx) => (
            <Reveal key={idx} direction="up" delay={idx * 0.1}>
              <div className="border-b border-gray-100 pb-12 last:border-0">
                <h2 className="text-xl md:text-2xl font-normal mb-6 font-poppins text-gray-900">
                  {section.heading}
                </h2>
                <div className="space-y-4 text-gray-600 leading-relaxed max-w-4xl">
                  {section.body.map((paragraph, pIdx) => (
                    <p key={pIdx} className="whitespace-pre-line">{paragraph}</p>
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {project.images && project.images.length > 0 && (
        <section className="max-w-[90%] mx-auto px-6 pb-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {project.images.map((imgSrc, idx) => (
              <Reveal key={idx} direction="up" delay={idx * 0.15}>
                <div className="relative aspect-video w-full overflow-hidden rounded-lg border border-gray-100 shadow-sm">
                  <Image
                    src={imgSrc}
                    alt={`${project.title} Gallery ${idx + 1}`}
                    fill
                    className="object-cover"
                  />
                </div>
              </Reveal>
            ))}
          </div>
        </section>
      )}

      <section className="border-t border-gray-100 bg-gray-50/50">
        <div className="max-w-[90%] mx-auto px-6 py-12 flex justify-between items-center text-sm font-normal">
          <div>
            {prevProject ? (
              <Link
                href={`/whatwedo/${prevProject.slug}`}
                className="group flex flex-col items-start space-y-1"
              >
                <span className="text-xs font-normal text-gray-400 uppercase tracking-wider">
                  Previous Project
                </span>
                <span className="text-gray-900 group-hover:text-brand-primary group-hover:-translate-x-0.5 inline-block transition-all duration-300">
                  &larr; {prevProject.title}
                </span>
              </Link>
            ) : (
              <div className="opacity-0 pointer-events-none" />
            )}
          </div>
          <div>
            {nextProject ? (
              <Link
                href={`/whatwedo/${nextProject.slug}`}
                className="group flex flex-col items-end space-y-1"
              >
                <span className="text-xs font-normal text-gray-400 uppercase tracking-wider">
                  Next Project
                </span>
                <span className="text-gray-900 group-hover:text-brand-primary group-hover:translate-x-0.5 inline-block transition-all duration-300">
                  {nextProject.title} &rarr;
                </span>
              </Link>
            ) : (
              <div className="opacity-0 pointer-events-none" />
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
