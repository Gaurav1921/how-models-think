"""Schemas for blog post content."""

from datetime import date

from pydantic import BaseModel


class BlogPostSummary(BaseModel):
    """Metadata for a blog post shown in the blog index.

    Attributes:
        slug: URL-safe unique identifier for the post.
        title: Display title.
        summary: One or two sentence teaser.
        date: Publication date.
        tags: Topic tags, e.g. "prompt-engineering".
    """

    slug: str
    title: str
    summary: str
    date: date
    tags: list[str]


class BlogPost(BlogPostSummary):
    """A full blog post including its rendered body.

    Attributes:
        body_markdown: The post body as raw markdown.
    """

    body_markdown: str
