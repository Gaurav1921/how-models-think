"""Schemas for the explainer page index."""

from pydantic import BaseModel


class ExplainerMeta(BaseModel):
    """Index metadata for an explainer page, used by nav and home cards.

    Attributes:
        slug: Route path for the explainer, e.g. "transformers".
        title: Display title.
        summary: One or two sentence teaser.
        status: Either "live" or "coming-soon".
    """

    slug: str
    title: str
    summary: str
    status: str
