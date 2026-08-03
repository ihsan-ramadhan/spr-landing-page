import { getSiteConfig, isLocale, DEFAULT_LOCALE } from '../../../lib/content';
import { pageMetadata } from '../../../lib/metadata';
import Reveal from '../../../components/ui/Reveal';

interface InvestorsPageProps {
  readonly params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: InvestorsPageProps) {
  const { locale } = await params;
  return pageMetadata('investors', locale);
}

export default async function InvestorsPage({ params }: InvestorsPageProps) {
  const { locale } = await params;
  const loc = isLocale(locale) ? locale : DEFAULT_LOCALE;
  const config = getSiteConfig(loc);
  const ui = config.ui.investors;

  return (
    <div className="py-24 px-6 bg-white text-center">
      <div className="max-w-md mx-auto space-y-8">
        <Reveal direction="up" delay={0.1}>
          <h1 className="text-3xl md:text-5xl font-normal font-poppins">{ui.title}</h1>
        </Reveal>

        <Reveal direction="up" delay={0.2}>
          <div className="p-8 border border-gray-100 rounded-lg bg-gray-50/50 space-y-4 hover:border-gray-300 hover:shadow-sm transition-all duration-300">
            <p className="text-xs font-normal uppercase tracking-wider text-gray-400 font-poppins">
              {ui.address}
            </p>
            <p className="text-gray-700 leading-relaxed font-normal whitespace-pre-line">
              {config.investorAddress || config.address}
            </p>
            <p className="text-xs font-normal uppercase tracking-wider text-gray-400 font-poppins pt-4">
              {ui.contact}
            </p>
            <a
              href={`mailto:${config.email}`}
              className="inline-block text-brand-primary font-normal relative group"
            >
              {config.email}
              <span className="absolute bottom-0 left-0 w-0 h-px bg-brand-primary transition-all duration-300 group-hover:w-full" />
            </a>
          </div>
        </Reveal>
      </div>
    </div>
  );
}
