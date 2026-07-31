import { notFound } from 'next/navigation';
import Navbar from '../../components/layout/Navbar';
import Footer from '../../components/layout/Footer';
import { getSiteConfig, isLocale, LOCALES } from '../../lib/content';

export function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }));
}

interface LocaleLayoutProps {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}

export default async function LocaleLayout({ children, params }: LocaleLayoutProps) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  const config = getSiteConfig(locale);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: config.legalName,
    alternateName: config.name,
    email: config.email,
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Konawe Utara',
      addressRegion: 'Southeast Sulawesi',
      addressCountry: 'ID',
    },
    sameAs: [config.social.instagram, config.social.facebook, config.social.twitter],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Navbar nav={config.nav} ui={config.ui} locale={locale} altText={config.name} />
      <main id="main-content" className="grow">{children}</main>
      <Footer
        name={config.name}
        address={config.address}
        email={config.email}
        social={config.social}
        legalName={config.legalName}
        ui={config.ui}
        locale={locale}
      />
    </>
  );
}
