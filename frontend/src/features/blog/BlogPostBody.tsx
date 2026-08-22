import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

interface BlogPostBodyProps {
  markdown: string;
}

/** Renders a blog post's markdown body with consistent long-form typography. */
export function BlogPostBody({ markdown }: BlogPostBodyProps) {
  return (
    <div className="markdown-body font-serif text-[var(--color-text)]">
      <ReactMarkdown remarkPlugins={[remarkGfm]}>{markdown}</ReactMarkdown>
    </div>
  );
}
