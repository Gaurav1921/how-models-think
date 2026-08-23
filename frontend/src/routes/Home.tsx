import { Link } from "react-router-dom";
import { PageShell } from "../components/layout/PageShell";
import { Card } from "../components/common/Card";

const cards = [
  {
    to: "/learn",
    title: "Learn",
    description:
      "Work through transformers, deep learning fundamentals, and more, one topic at a time, each one building on the last.",
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
          <Link key={card.to} to={card.to} className="block h-full">
            <Card as="article" interactive>
              <h2 className="font-medium">{card.title}</h2>
              <p className="mt-2 text-sm text-[var(--color-text-muted)]">{card.description}</p>
            </Card>
          </Link>
        ))}
      </section>
    </PageShell>
  );
}
