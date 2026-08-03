import type { MetadataRoute } from 'next';
import { getProjects, LOCALES, DEFAULT_LOCALE } from '../lib/content';

export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  const base = 'https://aspire.id';
  const slugs = getProjects(DEFAULT_LOCALE).map((p) => p.slug);

  const staticRoutes = ['', '/about', '/careers', '/governance', '/investors', '/whatwedo'];
  const routes: MetadataRoute.Sitemap = [];

  for (const locale of LOCALES) {
    for (const route of staticRoutes) {
      routes.push({
        url: `${base}/${locale}${route}`,
        lastModified: new Date('2026-07-31'),
        changeFrequency: 'monthly',
        priority: route === '' ? 1 : 0.8,
        alternates: { languages: { en: `${base}/en${route}`, id: `${base}/id${route}` } },
      });
    }
    for (const slug of slugs) {
      routes.push({
        url: `${base}/${locale}/whatwedo/${slug}`,
        lastModified: new Date('2026-07-31'),
        changeFrequency: 'monthly',
        priority: 0.6,
        alternates: { languages: { en: `${base}/en/whatwedo/${slug}`, id: `${base}/id/whatwedo/${slug}` } },
      });
    }
  }

  return routes;
}
