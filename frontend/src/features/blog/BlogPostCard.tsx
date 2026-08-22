import { Link } from "react-router-dom";
import { Card } from "../../components/common/Card";
import { Tag } from "../../components/common/Tag";
import type { BlogPostSummary } from "../../lib/types";

interface BlogPostCardProps {
  post: BlogPostSummary;
}

/** A blog post preview card linking to its full post. */
export function BlogPostCard({ post }: BlogPostCardProps) {
  return (
    <Link to={`/blog/${post.slug}`} className="block">
      <Card as="article">
        <span className="font-mono text-xs text-[var(--color-text-muted)]">{post.date}</span>
        <h2 className="mt-1 font-medium">{post.title}</h2>
        <p className="mt-2 text-sm text-[var(--color-text-muted)]">{post.summary}</p>
        <div className="mt-3 flex flex-wrap gap-2">
          {post.tags.map((tag) => (
            <Tag key={tag} label={tag} />
          ))}
        </div>
      </Card>
    </Link>
  );
}
