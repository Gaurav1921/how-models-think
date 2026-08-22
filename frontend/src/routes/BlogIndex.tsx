import { PageShell } from "../components/layout/PageShell";
import { LoadingState } from "../components/common/LoadingState";
import { ErrorState } from "../components/common/ErrorState";
import { BlogPostCard } from "../features/blog/BlogPostCard";
import { getBlogPosts } from "../lib/api";
import { useApi } from "../lib/useApi";

/** Blog index page listing all posts, newest first. */
export function BlogIndex() {
  const state = useApi(getBlogPosts);

  return (
    <PageShell>
      <h1 className="font-serif text-3xl">The AI center</h1>
      <p className="mt-3 text-[var(--color-text-muted)]">
        Writing on prompt engineering, context engineering, harness
        engineering, and agent engineering.
      </p>

      <div className="mt-10 space-y-4">
        {state.status === "loading" && <LoadingState />}
        {state.status === "error" && <ErrorState />}
        {state.status === "success" &&
          state.data.map((post) => <BlogPostCard key={post.slug} post={post} />)}
      </div>
    </PageShell>
  );
}
