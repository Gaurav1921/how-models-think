import { Link } from "react-router-dom";
import { PageShell } from "../components/layout/PageShell";
import { Card } from "../components/common/Card";
import { getExplainers } from "../lib/api";
import { useApi } from "../lib/useApi";

const cards = [
  {
    to: "/transformers",
    title: "Transformers and Attention Is All You Need",
    description:
      "A visual, step-by-step walkthrough of how a transformer turns text into a prediction, from tokens to attention to the next word.",
  },
  {
    to: "/timeline",
    title: "How we got here",
    description:
      "A timeline from rule-based systems through classical machine learning, deep learning, transformers, and large language models.",
  },
  {
    to: "/blog",
    title: "The AI center",
    description:
      "Writing on prompt engineering, context engineering, harness engineering, and agent engineering.",
  },
];

/** The site's homepage. */
export function Home() {
  const explainersState = useApi(getExplainers);
  const foundations =
    explainersState.status === "success"
      ? explainersState.data.filter((explainer) => explainer.slug !== "transformers")
      : [];

  return (
    <PageShell wide>
      <section className="py-8">
        <h1 className="font-serif text-4xl leading-tight sm:text-5xl">
          Large language models, explained by seeing them work.
        </h1>
        <p className="mt-6 max-w-2xl text-lg text-[var(--color-text-muted)]">
          An LLM is, underneath everything, a function that turns the text so
          far into a probability for what comes next. This site builds up
          that idea visually, one mechanism at a time, starting with the
          paper that made modern language models possible.
        </p>
      </section>

      <section className="grid gap-4 py-8 sm:grid-cols-3">
        {cards.map((card) => (
          <Link key={card.to} to={card.to} className="block">
            <Card as="article">
              <h2 className="font-medium">{card.title}</h2>
              <p className="mt-2 text-sm text-[var(--color-text-muted)]">{card.description}</p>
            </Card>
          </Link>
        ))}
      </section>

      {foundations.length > 0 && (
        <section className="py-8">
          <h2 className="mb-4 text-sm font-medium tracking-wide text-[var(--color-text-muted)] uppercase">
            Foundations
          </h2>
          <div className="grid gap-4 sm:grid-cols-2">
            {foundations.map((explainer) =>
              explainer.status === "live" ? (
                <Link key={explainer.slug} to={`/explainers/${explainer.slug}`} className="block">
                  <Card as="article">
                    <h3 className="font-medium">{explainer.title}</h3>
                    <p className="mt-2 text-sm text-[var(--color-text-muted)]">{explainer.summary}</p>
                  </Card>
                </Link>
              ) : (
                <Card as="article" key={explainer.slug}>
                  <div className="flex items-center gap-2">
                    <h3 className="font-medium text-[var(--color-text-muted)]">{explainer.title}</h3>
                    <span className="rounded-full border border-[var(--color-border)] px-2 py-0.5 font-mono text-[10px] text-[var(--color-text-muted)]">
                      coming soon
                    </span>
                  </div>
                  <p className="mt-2 text-sm text-[var(--color-text-muted)]">{explainer.summary}</p>
                </Card>
              ),
            )}
          </div>
        </section>
      )}
    </PageShell>
  );
}
