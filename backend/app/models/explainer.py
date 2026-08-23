"""Schemas for the explainer page index."""

from pydantic import BaseModel


class ExplainerMeta(BaseModel):
    """Index metadata for an explainer page, used by nav and home cards.

    Attributes:
        slug: Route path for the explainer, e.g. "transformers".
        title: Display title.
        summary: One or two sentence teaser.
        status: Either "live" or "coming-soon".
        domain: Slug of the curriculum domain this explainer belongs to,
            e.g. "deep-learning", or None if it isn't part of the Learn
            hub's curriculum (unused today, kept for older entries).
        category: Slug of the curriculum category within that domain, e.g.
            "ann", or None if the domain has no categories (a flat topic
            list) or this entry sits outside any category.
        order: Position within its domain/category's topic list, lower
            first.
    """

    slug: str
    title: str
    summary: str
    status: str
    domain: str | None = None
    category: str | None = None
    order: int | None = None
