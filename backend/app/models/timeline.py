"""Schemas for AI/ML history timeline content."""

from pydantic import BaseModel


class TimelineEvent(BaseModel):
    """A single entry on the AI/ML evolution timeline.

    Attributes:
        id: Stable unique identifier.
        era: Broad era grouping, e.g. "Classical machine learning".
        year_label: Human-readable year or year range, e.g. "1958".
        title: Short name of the event, model, or paper.
        summary: One or two sentence explanation of why it matters.
        tags: Topic tags for filtering.
        image: Root-relative path to an illustrative image, or None if
            this entry has no image.
        image_credit: Attribution string for the image, required whenever
            image is set.
    """

    id: str
    era: str
    year_label: str
    title: str
    summary: str
    tags: list[str]
    image: str | None = None
    image_credit: str | None = None
