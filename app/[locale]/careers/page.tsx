import { getSiteConfig, isLocale, DEFAULT_LOCALE } from '../../../lib/content';
import { pageMetadata } from '../../../lib/metadata';
import Reveal from '../../../components/ui/Reveal';
import CareersActions from '../../../components/careers/CareersActions';

interface CareersPageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: CareersPageProps) {
  const { locale } = await params;
  return pageMetadata('careers', locale);
}

export default async function CareersPage({ params }: CareersPageProps) {
  const { locale } = await params;
  const loc = isLocale(locale) ? locale : DEFAULT_LOCALE;
  const ui = getSiteConfig(loc).ui;

  return (
    <div className="py-24 px-6 bg-white text-center">
      <div className="max-w-2xl mx-auto space-y-8">
        <Reveal direction="up" delay={0.1}>
          <h1 className="text-3xl md:text-5xl font-normal font-poppins">{ui.careers.title}</h1>
        </Reveal>

        <Reveal direction="up" delay={0.2}>
          <p className="text-lg text-gray-600 leading-relaxed max-w-xl mx-auto">
            {ui.careers.subtitle}
          </p>
        </Reveal>

        <Reveal direction="up" delay={0.3}>
          <p className="text-gray-500 max-w-lg mx-auto">
            {ui.careers.body}
          </p>
        </Reveal>

        <Reveal direction="up" delay={0.4}>
          <CareersActions ui={ui} />
        </Reveal>
      </div>
    </div>
  );
}
