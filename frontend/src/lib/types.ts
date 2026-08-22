/** Types mirroring the backend's Pydantic content schemas. */

export interface BlogPostSummary {
  slug: string;
  title: string;
  summary: string;
  date: string;
  tags: string[];
}

export interface BlogPost extends BlogPostSummary {
  body_markdown: string;
}

export interface TimelineEvent {
  id: string;
  era: string;
  year_label: string;
  title: string;
  summary: string;
  tags: string[];
}

export interface ExplainerMeta {
  slug: string;
  title: string;
  summary: string;
  status: "live" | "coming-soon";
}

export interface GlossaryTerm {
  slug: string;
  term: string;
  short_definition: string;
  read_more_href: string | null;
}
