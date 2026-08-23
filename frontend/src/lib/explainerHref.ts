/** Maps an explainer slug to its route. "transformers" has its own dedicated flagship route; everything else lives under /explainers/:slug. */
export function explainerHref(slug: string): string {
  return slug === "transformers" ? "/transformers" : `/explainers/${slug}`;
}
