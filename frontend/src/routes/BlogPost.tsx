import { Link, useParams } from "react-router-dom";
import { PageShell } from "../components/layout/PageShell";
import { LoadingState } from "../components/common/LoadingState";
import { ErrorState } from "../components/common/ErrorState";
import { Tag } from "../components/common/Tag";
import { BlogPostBody } from "../features/blog/BlogPostBody";
import { getBlogPost } from "../lib/api";
import { useApi } from "../lib/useApi";

/** A single blog post page. */
export function BlogPost() {
  const { slug } = useParams<{ slug: string }>();
  const state = useApi(() => getBlogPost(slug!), [slug]);

  return (
    <PageShell>
      <Link to="/blog" className="text-sm text-[var(--color-text-muted)] hover:text-[var(--color-text)]">
        Back to the blog
      </Link>

      <div className="mt-6">
        {state.status === "loading" && <LoadingState />}
        {state.status === "error" && <ErrorState message="This post could not be found." />}
        {state.status === "success" && (
          <>
            <span className="font-mono text-xs text-[var(--color-text-muted)]">
              {state.data.date}
            </span>
            <h1 className="mt-2 font-serif text-3xl">{state.data.title}</h1>
            <div className="mt-3 flex flex-wrap gap-2">
              {state.data.tags.map((tag) => (
                <Tag key={tag} label={tag} />
              ))}
            </div>
            <div className="mt-8">
              <BlogPostBody markdown={state.data.body_markdown} />
            </div>
          </>
        )}
      </div>
    </PageShell>
  );
}
