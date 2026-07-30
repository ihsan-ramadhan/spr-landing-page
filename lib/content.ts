import fs from "fs";
import path from "path";

export type Locale = "en" | "id";

export const LOCALES: Locale[] = ["en", "id"];
export const DEFAULT_LOCALE: Locale = "en";

export function isLocale(value: string): value is Locale {
  return LOCALES.includes(value as Locale);
}

export interface UIStrings {
  languageToggle: string;
  menuOpen: string;
  menuClose: string;
  cta: {
    learnMore: string;
    ourFuture: string;
    joinNow: string;
    emailCvPrompt: string;
  };
  home: {
    heroText: string;
    introText: string;
    nickelHeading: string;
    nickelButton: string;
  };
  about: {
    purposeHeading: string;
    purposeH1: string;
    companyName: string;
    assetLine: string;
    journeyHeading: string;
    purposeSectionHeading: string;
    purposeH3: string;
    visionSectionHeading: string;
    visionH3: string;
    valuesSectionHeading: string;
    valuesH3: string;
    commitmentLabel: string;
    historyHeading: string;
    ourStoryLabel: string;
    milestonesLabel: string;
    ariaMilestonesLabel: string;
  };
  governance: {
    title: string;
    intro: string;
    structure: string;
  };
  careers: {
    title: string;
    subtitle: string;
    body: string;
  };
  whatWeDo: {
    title: string;
    siteLocation: string;
    prevProject: string;
    nextProject: string;
  };
  investors: {
    title: string;
    address: string;
    contact: string;
  };
  footer: {
    siteMap: string;
    socialLinks: string;
    aboutLink: string;
    getInvolved: string;
    rights: string;
  };
}

export interface SiteConfig {
  name: string;
  legalName: string;
  address: string;
  investorAddress?: string;
  email: string;
  social: { instagram: string; facebook: string; twitter: string };
  nav: { label: string; href: string }[];
  ui: UIStrings;
}

export interface Project {
  slug: string;
  title: string;
  subtitle?: string;
  summary: string;
  heroImage: string;
  order: number;
  featured: boolean;
  stats?: { label: string; value: string; unit?: string }[];
  sections: { heading: string; body: string[] }[];
  mapCoordinates?: { lat: number; lng: number; zoom: number; label: string };
  images?: string[];
}

export interface AboutContent {
  intro?: string[];
  purpose: { heading: string; body: string };
  vision: { heading: string; body: string };
  values: { heading: string; body: string[] };
  timeline: { year: string; phase: "history" | "present" | "future"; body: string }[];
}

function contentDir(locale: string): string {
  return path.join(process.cwd(), "content", isLocale(locale) ? locale : DEFAULT_LOCALE);
}

export function getSiteConfig(locale: string = DEFAULT_LOCALE): SiteConfig {
  const filePath = path.join(contentDir(locale), "site.json");
  const raw = fs.readFileSync(filePath, "utf-8");
  return JSON.parse(raw) as SiteConfig;
}

export function getAboutContent(locale: string = DEFAULT_LOCALE): AboutContent {
  const filePath = path.join(contentDir(locale), "about.json");
  const raw = fs.readFileSync(filePath, "utf-8");
  return JSON.parse(raw) as AboutContent;
}

export function getProjects(locale: string = DEFAULT_LOCALE): Project[] {
  const projectsDir = path.join(contentDir(locale), "projects");
  if (!fs.existsSync(projectsDir)) {
    return [];
  }
  const files = fs.readdirSync(projectsDir);
  const projects = files
    .filter((file) => file.endsWith(".json"))
    .map((file) => {
      const filePath = path.join(projectsDir, file);
      const raw = fs.readFileSync(filePath, "utf-8");
      return JSON.parse(raw) as Project;
    });
  return projects.sort((a, b) => a.order - b.order);
}

export function getProjectBySlug(slug: string, locale: string = DEFAULT_LOCALE): Project | null {
  const projects = getProjects(locale);
  return projects.find((p) => p.slug === slug) || null;
}
