import type {
  BlogPost,
  BlogPostSummary,
  CurriculumCategory,
  CurriculumDomain,
  ExplainerMeta,
  GlossaryTerm,
  TimelineEvent,
} from "./types";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? "http://localhost:8000";

async function getJson<T>(path: string): Promise<T> {
  const response = await fetch(`${API_BASE_URL}${path}`);
  if (!response.ok) {
    throw new Error(`Request to ${path} failed with status ${response.status}`);
  }
  return response.json() as Promise<T>;
}

export function getBlogPosts(): Promise<BlogPostSummary[]> {
  return getJson("/api/blog/posts");
}

export function getBlogPost(slug: string): Promise<BlogPost> {
  return getJson(`/api/blog/posts/${slug}`);
}

export function getTimelineEvents(): Promise<TimelineEvent[]> {
  return getJson("/api/timeline/events");
}

export function getExplainers(): Promise<ExplainerMeta[]> {
  return getJson("/api/explainers");
}

export function getGlossaryTerms(): Promise<GlossaryTerm[]> {
  return getJson("/api/glossary/terms");
}

export function getCurriculumDomains(): Promise<CurriculumDomain[]> {
  return getJson("/api/curriculum/domains");
}

export function getCurriculumCategories(): Promise<CurriculumCategory[]> {
  return getJson("/api/curriculum/categories");
}
