import katex from "katex";
import "katex/dist/katex.min.css";
import { useMemo } from "react";

interface MathProps {
  tex: string;
  block?: boolean;
}

/** Renders a LaTeX string with KaTeX, with proper superscripts, subscripts, and fractions. */
export function Math({ tex, block = false }: MathProps) {
  const html = useMemo(
    () =>
      katex.renderToString(tex, {
        throwOnError: false,
        displayMode: block,
      }),
    [tex, block],
  );

  return <span dangerouslySetInnerHTML={{ __html: html }} />;
}
