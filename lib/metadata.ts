import type { Metadata } from 'next';
import { getSiteConfig, isLocale, DEFAULT_LOCALE, type Locale } from './content';

type PageKey = 'home' | 'about' | 'careers' | 'governance' | 'investors' | 'whatWeDo';

const META: Record<PageKey, Record<Locale, { title: string; description: string }>> = {
  home: {
    en: { title: 'Home', description: 'Our pure and renewable journey together.' },
    id: { title: 'Beranda', description: 'Perjalanan kita bersama yang murni dan terbarukan.' },
  },
  about: {
    en: { title: 'About', description: 'Our pure and renewable journey together — purpose, vision, values, and history.' },
    id: { title: 'Tentang', description: 'Perjalanan kita bersama yang murni dan terbarukan — tujuan, visi, nilai, dan sejarah.' },
  },
  careers: {
    en: { title: 'Careers', description: 'Join us. Be ASPIRE. Make good impact to the world.' },
    id: { title: 'Karir', description: 'Bergabunglah dengan kami. Jadilah ASPIRE. Berikan dampak baik bagi dunia.' },
  },
  governance: {
    en: { title: 'Corporate Governance', description: 'ASPIREstargate commitment to corporate governance with independency, fairness, and equality.' },
    id: { title: 'Tata Kelola Perusahaan', description: 'Komitmen ASPIREstargate terhadap tata kelola perusahaan dengan independensi, keadilan, dan kesetaraan.' },
  },
  investors: {
    en: { title: 'Investors Relations', description: 'Investor relations contact and address for ASPIRE.' },
    id: { title: 'Hubungan Investor', description: 'Kontak dan alamat hubungan investor ASPIRE.' },
  },
  whatWeDo: {
    en: { title: 'What We Do', description: 'Our projects across nickel mining, smelting, industrial park, and renewable battery materials.' },
    id: { title: 'Kegiatan Kami', description: 'Proyek kami di pertambangan nikel, smelter, taman industri, dan bahan baterai terbarukan.' },
  },
};

export function pageMetadata(key: PageKey, locale: string): Metadata {
  const loc: Locale = isLocale(locale) ? locale : DEFAULT_LOCALE;
  const m = META[key][loc];
  const config = getSiteConfig(loc);
  return {
    title: m.title,
    description: key === 'home' ? config.ui.home.heroText : m.description,
    alternates: {
      languages: { en: `/en`, id: `/id` },
    },
  };
}

export function projectMetadata(title: string, summary: string, locale: string): Metadata {
  const loc: Locale = isLocale(locale) ? locale : DEFAULT_LOCALE;
  return {
    title,
    description: summary,
    alternates: {
      languages: { en: '/en', id: '/id' },
    },
  };
}
