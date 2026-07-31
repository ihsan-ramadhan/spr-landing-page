import { getSiteConfig, isLocale, DEFAULT_LOCALE } from '../../../lib/content';
import { pageMetadata } from '../../../lib/metadata';
import Reveal from '../../../components/ui/Reveal';
import Image from 'next/image';

interface GovernancePageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: GovernancePageProps) {
  const { locale } = await params;
  return pageMetadata('governance', locale);
}

export default async function GovernancePage({ params }: GovernancePageProps) {
  const { locale } = await params;
  const loc = isLocale(locale) ? locale : DEFAULT_LOCALE;
  const ui = getSiteConfig(loc).ui.governance;

  return (
    <div className="py-20 px-6 bg-white">
      <div className="max-w-7xl mx-auto space-y-12">
        <Reveal direction="up" delay={0.1}>
          <h1 className="text-3xl md:text-5xl font-normal font-poppins text-center">
            {ui.title}
          </h1>
        </Reveal>

        <Reveal direction="up" delay={0.2}>
          <div className="max-w-4xl mx-auto">
            <p className="text-gray-600 leading-relaxed text-center">
              {ui.intro}
            </p>
          </div>
        </Reveal>

        <Reveal direction="up" delay={0.3}>
          <div className="max-w-4xl mx-auto">
            <h2 className="text-xl md:text-2xl font-normal font-poppins text-gray-900 text-center mb-8">
              {ui.structure}
            </h2>
            <div className="relative w-full aspect-2188/1360">
              <Image
                src="https://images.squarespace-cdn.com/content/v1/61cdb78e5104297f40ace0af/19b2dbd5-de16-4edb-863a-49566c386d68/ASPIRE-governance-structure.png"
                alt={ui.structure}
                fill
                className="object-contain"
                priority
                sizes="(max-width: 768px) 100vw, 896px"
              />
            </div>
          </div>
        </Reveal>
      </div>
    </div>
  );
}
