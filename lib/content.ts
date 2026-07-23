import fs from "fs";
import path from "path";

export interface SiteConfig {
  name: string;
  legalName: string;
  address: string;
  investorAddress?: string;
  email: string;
  social: { instagram: string; facebook: string; twitter: string };
  nav: { label: string; href: string }[];
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

const contentDir = path.join(process.cwd(), "content");

export function getSiteConfig(): SiteConfig {
  const filePath = path.join(contentDir, "site.json");
  const raw = fs.readFileSync(filePath, "utf-8");
  return JSON.parse(raw) as SiteConfig;
}

export function getAboutContent(): AboutContent {
  const filePath = path.join(contentDir, "about.json");
  const raw = fs.readFileSync(filePath, "utf-8");
  return JSON.parse(raw) as AboutContent;
}

export function getProjects(): Project[] {
  const projectsDir = path.join(contentDir, "projects");
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

export function getProjectBySlug(slug: string): Project | null {
  const projects = getProjects();
  return projects.find((p) => p.slug === slug) || null;
}
