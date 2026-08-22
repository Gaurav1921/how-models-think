"""Schemas for glossary term content."""

from pydantic import BaseModel


class GlossaryTerm(BaseModel):
    """A short, reusable definition for a term used across explainer pages.

    Attributes:
        slug: Stable unique identifier, used to look the term up from
            inline references in explainer copy.
        term: Display name of the term.
        short_definition: A one or two sentence, self-contained
            explanation, written to make sense with no other context.
        read_more_href: Path to a page that covers the term in depth, or
            None if no such page exists yet.
    """

    slug: str
    term: str
    short_definition: str
    read_more_href: str | None = None
