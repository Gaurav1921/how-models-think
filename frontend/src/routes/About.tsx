import { useState } from "react";
import { PageShell } from "../components/layout/PageShell";
import { Card } from "../components/common/Card";
import { Tag } from "../components/common/Tag";
import { OrgLogo } from "../features/about/OrgLogo";
import { ExperienceItem } from "../features/about/ExperienceItem";
import {
  CERTIFICATIONS,
  EDUCATION,
  EXPERIENCE,
  HONORS,
  LANGUAGES,
  PROJECTS,
  PUBLICATIONS,
  SKILLS,
} from "../features/about/data";

function Headshot() {
  const [errored, setErrored] = useState(false);

  if (errored) {
    return (
      <div className="flex h-36 w-36 shrink-0 items-center justify-center rounded-full border border-[var(--color-border)] bg-[var(--color-bg-raised)] font-serif text-4xl text-[var(--color-text-muted)] sm:h-40 sm:w-40">
        GS
      </div>
    );
  }

  return (
    <img
      src="/about/headshot.png"
      alt="Gaurav Singh"
      onError={() => setErrored(true)}
      className="h-36 w-36 shrink-0 rounded-full border border-[var(--color-border)] object-cover sm:h-40 sm:w-40"
    />
  );
}

function SectionHeading({ children }: { children: string }) {
  return (
    <h2 className="mb-5 text-sm font-medium tracking-wide text-[var(--color-text-muted)] uppercase">
      {children}
    </h2>
  );
}

/** About page: the site author's background, experience, and projects. */
export function About() {
  return (
    <PageShell wide>
      <header className="flex flex-col items-start gap-6 py-8 sm:flex-row sm:items-center">
        <Headshot />
        <div>
          <h1 className="font-serif text-4xl leading-tight">Gaurav Singh</h1>
          <p className="mt-2 text-lg text-[var(--color-text-muted)]">Data Scientist at ZS</p>
          <p className="mt-1 text-sm text-[var(--color-text-muted)]">Bengaluru, Karnataka, India</p>
          <div className="mt-3 flex flex-wrap gap-2">
            <Tag label="Ex-Epsilon" />
            <Tag label="NIT Trichy '24" />
            <Tag label="IIT Madras '25" />
          </div>
          <div className="mt-4 flex flex-wrap gap-5 font-mono text-sm">
            <a
              href="https://www.linkedin.com/in/gauravsingh1921/"
              target="_blank"
              rel="noreferrer"
              className="text-[var(--color-query)] hover:underline"
            >
              LinkedIn
            </a>
            <a
              href="https://github.com/Gaurav1921"
              target="_blank"
              rel="noreferrer"
              className="text-[var(--color-query)] hover:underline"
            >
              GitHub
            </a>
            <a href="mailto:gjs190201@gmail.com" className="text-[var(--color-query)] hover:underline">
              Email
            </a>
          </div>
        </div>
      </header>

      <section className="max-w-2xl py-6">
        <p className="text-lg leading-relaxed text-[var(--color-text-muted)]">
          I'm a data scientist at ZS, working on agentic AI, LLM operations,
          and moving retrieval-augmented and evaluation-driven systems from
          prototype to production. Before that, I spent about a year and a
          half at Epsilon. I graduated from NIT Tiruchirappalli in 2024 and
          completed a diploma in Data Science and Programming from IIT Madras
          in 2025. Earlier research interests centered on cybersecurity,
          insider threat detection, and detecting false information at
          scale, using text mining, sentiment analysis, and deep learning for
          text.
        </p>
        <p className="mt-6 text-lg leading-relaxed text-[var(--color-text-muted)]">
          How Models Think is a separate thing I'm building alongside all of
          that: it started as a way to explain transformers visually, and it
          is growing alongside my own understanding of the field. Every
          concept explained here, from self-attention to backpropagation, is
          one I worked through myself while building the explanation for it.
        </p>
      </section>

      <section className="py-10">
        <SectionHeading>Experience</SectionHeading>
        <div className="relative max-w-2xl border-l border-[var(--color-border)]">
          {EXPERIENCE.map((entry, index) => (
            <ExperienceItem key={`${entry.org}-${entry.dateRange}-${index}`} entry={entry} />
          ))}
        </div>
      </section>

      <section className="py-10">
        <SectionHeading>Projects</SectionHeading>
        <div className="grid gap-4 sm:grid-cols-2">
          {PROJECTS.map((project) => {
            const content = (
              <Card as="article" interactive={Boolean(project.url ?? project.homepage)}>
                <div className="flex items-baseline justify-between gap-2">
                  <h3 className="font-medium">{project.name}</h3>
                  <span className="shrink-0 font-mono text-xs text-[var(--color-text-muted)]">
                    {project.language}
                  </span>
                </div>
                <p className="mt-2 text-sm text-[var(--color-text-muted)]">{project.description}</p>
                {(project.url || project.homepage) && (
                  <div className="mt-3 flex gap-4 font-mono text-xs">
                    {project.url && <span className="text-[var(--color-query)]">GitHub &gt;</span>}
                    {project.homepage && <span className="text-[var(--color-value)]">Live demo &gt;</span>}
                  </div>
                )}
              </Card>
            );

            if (!project.url && !project.homepage) {
              return <div key={project.name}>{content}</div>;
            }

            return (
              <a
                key={project.name}
                href={project.homepage ?? project.url}
                target="_blank"
                rel="noreferrer"
                className="block h-full"
              >
                {content}
              </a>
            );
          })}
        </div>
      </section>

      <section className="py-10">
        <SectionHeading>Education</SectionHeading>
        <div className="flex max-w-2xl flex-col gap-5">
          {EDUCATION.map((entry) => (
            <div key={entry.org + entry.degree} className="flex gap-3">
              <OrgLogo src={entry.logo} alt={entry.org} />
              <div>
                <h3 className="font-medium">{entry.org}</h3>
                <p className="text-sm text-[var(--color-text-muted)]">{entry.degree}</p>
                <p className="font-mono text-xs text-[var(--color-text-muted)]">{entry.dateRange}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="grid gap-10 py-10 sm:grid-cols-2">
        <div>
          <SectionHeading>Skills</SectionHeading>
          <div className="flex flex-wrap gap-2">
            {SKILLS.map((skill) => (
              <Tag key={skill} label={skill} />
            ))}
          </div>
        </div>

        <div>
          <SectionHeading>Certifications</SectionHeading>
          <ul className="flex flex-col gap-2 text-sm text-[var(--color-text-muted)]">
            {CERTIFICATIONS.map((certification) => (
              <li key={certification}>{certification}</li>
            ))}
          </ul>
        </div>

        <div>
          <SectionHeading>Honors and awards</SectionHeading>
          <ul className="flex flex-col gap-2 text-sm text-[var(--color-text-muted)]">
            {HONORS.map((honor) => (
              <li key={honor}>{honor}</li>
            ))}
          </ul>
        </div>

        <div>
          <SectionHeading>Languages</SectionHeading>
          <ul className="flex flex-col gap-2 text-sm text-[var(--color-text-muted)]">
            {LANGUAGES.map((language) => (
              <li key={language.name}>
                <span className="text-[var(--color-text)]">{language.name}</span>, {language.level}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="max-w-2xl py-10">
        <SectionHeading>Publications</SectionHeading>
        <ul className="flex flex-col gap-2 text-sm text-[var(--color-text-muted)]">
          {PUBLICATIONS.map((publication) => (
            <li key={publication.title}>
              {publication.url ? (
                <a
                  href={publication.url}
                  target="_blank"
                  rel="noreferrer"
                  className="text-[var(--color-query)] hover:underline"
                >
                  {publication.title}
                </a>
              ) : (
                publication.title
              )}
            </li>
          ))}
        </ul>
      </section>
    </PageShell>
  );
}
