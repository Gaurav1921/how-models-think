import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { PageShell } from "../components/layout/PageShell";
import { Card } from "../components/common/Card";
import { LoadingState } from "../components/common/LoadingState";
import { ErrorState } from "../components/common/ErrorState";
import { getCurriculumCategories, getCurriculumDomains, getExplainers } from "../lib/api";
import { useApi } from "../lib/useApi";
import { explainerHref } from "../lib/explainerHref";
import type { ExplainerMeta } from "../lib/types";

function TopicGrid({ topics }: { topics: ExplainerMeta[] }) {
  if (topics.length === 0) {
    return (
      <Card as="article">
        <p className="text-sm text-[var(--color-text-muted)]">More topics coming soon.</p>
      </Card>
    );
  }

  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {topics.map((topic, index) =>
        topic.status === "live" ? (
          <Link key={topic.slug} to={explainerHref(topic.slug)} className="block h-full">
            <Card as="article" interactive>
              <span className="font-mono text-xs text-[var(--color-text-muted)]">
                {String(index + 1).padStart(2, "0")}
              </span>
              <h2 className="mt-1 font-medium">{topic.title}</h2>
              <p className="mt-2 text-sm text-[var(--color-text-muted)]">{topic.summary}</p>
            </Card>
          </Link>
        ) : (
          <Card as="article" key={topic.slug}>
            <span className="font-mono text-xs text-[var(--color-text-muted)]">
              {String(index + 1).padStart(2, "0")}
            </span>
            <div className="mt-1 flex items-center gap-2">
              <h2 className="font-medium text-[var(--color-text-muted)]">{topic.title}</h2>
              <span className="rounded-full border border-[var(--color-border)] px-2 py-0.5 font-mono text-[10px] text-[var(--color-text-muted)]">
                coming soon
              </span>
            </div>
            <p className="mt-2 text-sm text-[var(--color-text-muted)]">{topic.summary}</p>
          </Card>
        ),
      )}
    </div>
  );
}

/** A single curriculum domain's topic list, e.g. everything under Deep Learning, in learning order. */
export function LearnDomain() {
  const { domainSlug } = useParams<{ domainSlug: string }>();
  const domainsState = useApi(getCurriculumDomains);
  const categoriesState = useApi(getCurriculumCategories);
  const explainersState = useApi(getExplainers);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const loading = domainsState.status === "loading" || categoriesState.status === "loading" || explainersState.status === "loading";
  const errored = domainsState.status === "error" || categoriesState.status === "error" || explainersState.status === "error";

  if (loading) {
    return (
      <PageShell wide>
        <LoadingState />
      </PageShell>
    );
  }

  if (errored || domainsState.status !== "success" || categoriesState.status !== "success" || explainersState.status !== "success") {
    return (
      <PageShell wide>
        <ErrorState />
      </PageShell>
    );
  }

  const domain = domainsState.data.find((entry) => entry.slug === domainSlug);
  if (!domain) {
    return (
      <PageShell wide>
        <h1 className="font-serif text-3xl">Domain not found</h1>
        <p className="mt-3 text-[var(--color-text-muted)]">
          That subject area does not exist.{" "}
          <Link to="/learn" className="text-[var(--color-query)] underline">
            Back to Learn
          </Link>
          .
        </p>
      </PageShell>
    );
  }

  const categories = categoriesState.data
    .filter((category) => category.domain === domainSlug)
    .sort((a, b) => a.order - b.order);

  const selectedCategory = activeCategory ?? categories[0]?.slug ?? null;

  const topics = explainersState.data
    .filter((explainer) => explainer.domain === domainSlug)
    .filter((explainer) => (categories.length === 0 ? true : explainer.category === selectedCategory))
    .sort((a, b) => (a.order ?? 0) - (b.order ?? 0));

  return (
    <PageShell wide>
      <Link to="/learn" className="font-mono text-xs text-[var(--color-text-muted)] hover:text-[var(--color-text)]">
        &lt; Learn
      </Link>
      <h1 className="mt-3 font-serif text-3xl">{domain.title}</h1>
      <p className="mt-3 max-w-2xl text-[var(--color-text-muted)]">{domain.summary}</p>

      {categories.length > 0 && (
        <div className="mt-8 flex flex-wrap gap-2">
          {categories.map((category) => (
            <button
              key={category.slug}
              type="button"
              onClick={() => setActiveCategory(category.slug)}
              className={`rounded-full border px-4 py-1.5 font-mono text-sm transition-colors ${
                selectedCategory === category.slug
                  ? "border-[var(--color-text)] text-[var(--color-text)]"
                  : "border-[var(--color-border)] text-[var(--color-text-muted)] hover:text-[var(--color-text)]"
              }`}
            >
              {category.title}
            </button>
          ))}
        </div>
      )}

      <div className="mt-8">
        <TopicGrid topics={topics} />
      </div>
    </PageShell>
  );
}
