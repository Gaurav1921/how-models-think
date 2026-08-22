import { PageShell } from "../components/layout/PageShell";

/** About page: who builds this site and why it exists. */
export function About() {
  return (
    <PageShell>
      <h1 className="font-serif text-3xl">About</h1>

      <p className="mt-6 text-lg leading-relaxed text-[var(--color-text-muted)]">
        How Models Think is written and built by{" "}
        <span className="text-[var(--color-text)]">Gaurav Singh</span>, an
        Advanced Data Science Associate on the Commercial AI team at ZS,
        working on agentic AI, LLM operations, and moving retrieval-augmented
        and evaluation-driven systems from prototype to production. Before
        that, he worked as a Data Scientist at Epsilon India. He studied at
        NIT Tiruchirappalli (2020 to 2024), where he took on leadership roles
        in the campus's data science and machine learning research clubs.
      </p>

      <p className="mt-6 text-lg leading-relaxed text-[var(--color-text-muted)]">
        This site started as a way to explain transformers visually, and it
        is growing alongside my own understanding of the field. Every
        concept explained here, from self-attention to backpropagation, is
        one I worked through myself while building the explanation for it.
        If something here is unclear, that is useful information about the
        explanation, not a gap to quietly paper over.
      </p>

      <div className="mt-8 flex gap-6 font-mono text-sm">
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
      </div>
    </PageShell>
  );
}
