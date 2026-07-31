import { getProjects, getSiteConfig, isLocale, DEFAULT_LOCALE } from '../../../lib/content';
import { pageMetadata } from '../../../lib/metadata';
import ProjectCard from '../../../components/ui/ProjectCard';
import Reveal from '../../../components/ui/Reveal';

interface WhatWeDoPageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: WhatWeDoPageProps) {
  const { locale } = await params;
  return pageMetadata('whatWeDo', locale);
}

export default async function WhatWeDoPage({ params }: WhatWeDoPageProps) {
  const { locale } = await params;
  const loc = isLocale(locale) ? locale : DEFAULT_LOCALE;
  const projects = getProjects(loc);
  const learnMoreLabel = getSiteConfig(loc).ui.cta.learnMore;

  return (
    <div className="py-20 px-6 bg-white">
      <div className="max-w-[90%] mx-auto">
        <Reveal direction="up" delay={0.1}>
          <h1 className="text-3xl md:text-5xl font-normal mb-16 font-poppins">
            {getSiteConfig(loc).ui.whatWeDo.title}
          </h1>
        </Reveal>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-x-12 gap-y-20">
          {projects.map((project, idx) => (
            <ProjectCard key={project.slug} project={project} index={idx} learnMoreLabel={learnMoreLabel} locale={loc} />
          ))}
        </div>
      </div>
    </div>
  );
}
