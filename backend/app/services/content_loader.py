"""Loads blog, timeline, and explainer content from the content directory.

Content is parsed once and cached in memory, since it only changes via a
redeploy in this version of the site (no admin UI, no database).
"""

import json
from functools import lru_cache
from pathlib import Path

import yaml
from fastapi import HTTPException

from app.core.config import settings
from app.models.blog import BlogPost, BlogPostSummary
from app.models.explainer import ExplainerMeta
from app.models.glossary import GlossaryTerm
from app.models.timeline import TimelineEvent

FRONTMATTER_DELIMITER = "---"


def _parse_markdown_with_frontmatter(text: str) -> tuple[dict, str]:
    """Splits a markdown file into its YAML frontmatter and body.

    Args:
        text: Raw file contents starting with a "---" delimited YAML block.

    Returns:
        A tuple of (frontmatter fields, body markdown).

    Raises:
        ValueError: If the file does not start with a frontmatter block.
    """
    parts = text.split(FRONTMATTER_DELIMITER, 2)
    if len(parts) < 3:
        raise ValueError("Blog post is missing a --- frontmatter block")
    frontmatter = yaml.safe_load(parts[1]) or {}
    body = parts[2].strip()
    return frontmatter, body


@lru_cache
def _load_blog_posts() -> dict[str, BlogPost]:
    posts: dict[str, BlogPost] = {}
    blog_dir = settings.content_dir / "blog"
    for path in sorted(blog_dir.glob("*.md")):
        frontmatter, body = _parse_markdown_with_frontmatter(path.read_text(encoding="utf-8"))
        post = BlogPost(body_markdown=body, **frontmatter)
        posts[post.slug] = post
    return posts


@lru_cache
def _load_timeline_events() -> list[TimelineEvent]:
    path = settings.content_dir / "timeline" / "events.json"
    raw = json.loads(path.read_text(encoding="utf-8"))
    return [TimelineEvent(**entry) for entry in raw]


@lru_cache
def _load_explainers() -> list[ExplainerMeta]:
    path = settings.content_dir / "explainers" / "index.json"
    raw = json.loads(path.read_text(encoding="utf-8"))
    return [ExplainerMeta(**entry) for entry in raw]


@lru_cache
def _load_glossary_terms() -> list[GlossaryTerm]:
    path = settings.content_dir / "glossary" / "terms.json"
    raw = json.loads(path.read_text(encoding="utf-8"))
    return [GlossaryTerm(**entry) for entry in raw]


def list_blog_posts() -> list[BlogPostSummary]:
    """Returns summaries for every blog post, newest first.

    Returns:
        Blog post summaries sorted by publication date descending.
    """
    posts = _load_blog_posts().values()
    return sorted(
        (BlogPostSummary(**post.model_dump(exclude={"body_markdown"})) for post in posts),
        key=lambda summary: summary.date,
        reverse=True,
    )


def get_blog_post(slug: str) -> BlogPost:
    """Returns a single blog post by slug.

    Args:
        slug: The post's URL-safe identifier.

    Returns:
        The full blog post including its body.

    Raises:
        HTTPException: 404 if no post has the given slug.
    """
    posts = _load_blog_posts()
    if slug not in posts:
        raise HTTPException(status_code=404, detail=f"No blog post with slug '{slug}'")
    return posts[slug]


def list_timeline_events() -> list[TimelineEvent]:
    """Returns all timeline events in file order.

    Returns:
        The full list of timeline events.
    """
    return _load_timeline_events()


def list_explainers() -> list[ExplainerMeta]:
    """Returns index metadata for every explainer page.

    Returns:
        The full list of explainer metadata entries.
    """
    return _load_explainers()


def list_glossary_terms() -> list[GlossaryTerm]:
    """Returns every glossary term.

    Returns:
        All glossary terms, in file order.
    """
    return _load_glossary_terms()


def content_dir_exists() -> bool:
    """Checks whether the configured content directory is present.

    Returns:
        True if the content directory exists on disk.
    """
    return Path(settings.content_dir).exists()
