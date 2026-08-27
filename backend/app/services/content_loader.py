"""Loads blog, timeline, and explainer content from the content directory.

Content is parsed once and cached in memory, since it only changes via a
redeploy in this version of the site (no admin UI, no database).
"""

import json
import logging
from functools import lru_cache
from pathlib import Path
from typing import TypeVar

import yaml
from fastapi import HTTPException
from pydantic import BaseModel, ValidationError

from app.core.config import settings
from app.models.blog import BlogPost, BlogPostSummary
from app.models.curriculum import CurriculumCategory, CurriculumDomain
from app.models.explainer import ExplainerMeta
from app.models.glossary import GlossaryTerm
from app.models.timeline import TimelineEvent

FRONTMATTER_DELIMITER = "---"

logger = logging.getLogger(__name__)

ModelT = TypeVar("ModelT", bound=BaseModel)


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
    if len(parts) < 3 or parts[0].strip():
        raise ValueError("Blog post is missing a --- frontmatter block")
    frontmatter = yaml.safe_load(parts[1]) or {}
    body = parts[2].strip()
    return frontmatter, body


def _load_json_list(relative_path: str, model: type[ModelT]) -> list[ModelT]:
    """Loads a JSON array file and validates each entry against a model.

    Args:
        relative_path: Path to the JSON file, relative to the content directory.
        model: Pydantic model each array entry is parsed into.

    Returns:
        The parsed entries, in file order.

    Raises:
        RuntimeError: If the file is missing, is not valid JSON, or an entry
            fails to validate against the model.
    """
    path = settings.content_dir / relative_path
    try:
        raw = json.loads(path.read_text(encoding="utf-8"))
    except FileNotFoundError as exc:
        logger.error("Content file not found: %s", path)
        raise RuntimeError(f"Content file not found: {path}") from exc
    except json.JSONDecodeError as exc:
        logger.error("Content file is not valid JSON: %s", path)
        raise RuntimeError(f"Content file is not valid JSON: {path}") from exc

    try:
        return [model(**entry) for entry in raw]
    except ValidationError as exc:
        logger.error("Content file failed validation: %s", path)
        raise RuntimeError(f"Content file failed validation: {path}") from exc


@lru_cache
def _load_blog_posts() -> dict[str, BlogPost]:
    """Loads and parses every blog post markdown file.

    Returns:
        Blog posts keyed by slug.

    Raises:
        RuntimeError: If a post is missing its frontmatter, fails validation,
            or duplicates another post's slug.
    """
    posts: dict[str, BlogPost] = {}
    paths_by_slug: dict[str, Path] = {}
    blog_dir = settings.content_dir / "blog"
    for path in sorted(blog_dir.glob("*.md")):
        try:
            frontmatter, body = _parse_markdown_with_frontmatter(path.read_text(encoding="utf-8"))
            post = BlogPost(body_markdown=body, **frontmatter)
        except (ValueError, ValidationError) as exc:
            logger.error("Failed to load blog post: %s", path)
            raise RuntimeError(f"Failed to load blog post: {path}") from exc
        if post.slug in posts:
            other_path = paths_by_slug[post.slug]
            logger.error("Duplicate blog post slug '%s' in %s and %s", post.slug, path, other_path)
            raise RuntimeError(f"Duplicate blog post slug '{post.slug}' in {path} and {other_path}")
        posts[post.slug] = post
        paths_by_slug[post.slug] = path
    return posts


@lru_cache
def _load_timeline_events() -> list[TimelineEvent]:
    return _load_json_list("timeline/events.json", TimelineEvent)


@lru_cache
def _load_explainers() -> list[ExplainerMeta]:
    return _load_json_list("explainers/index.json", ExplainerMeta)


@lru_cache
def _load_glossary_terms() -> list[GlossaryTerm]:
    return _load_json_list("glossary/terms.json", GlossaryTerm)


@lru_cache
def _load_curriculum_domains() -> list[CurriculumDomain]:
    return _load_json_list("curriculum/domains.json", CurriculumDomain)


@lru_cache
def _load_curriculum_categories() -> list[CurriculumCategory]:
    return _load_json_list("curriculum/categories.json", CurriculumCategory)


def list_blog_posts() -> list[BlogPostSummary]:
    """Returns summaries for every blog post, newest first.

    Returns:
        Blog post summaries sorted by publication date descending.

    Raises:
        RuntimeError: If the blog content fails to load.
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
        RuntimeError: If the blog content fails to load.
    """
    posts = _load_blog_posts()
    if slug not in posts:
        raise HTTPException(status_code=404, detail=f"No blog post with slug '{slug}'")
    return posts[slug]


def list_timeline_events() -> list[TimelineEvent]:
    """Returns all timeline events in file order.

    Returns:
        The full list of timeline events.

    Raises:
        RuntimeError: If the timeline content fails to load.
    """
    return _load_timeline_events()


def list_explainers() -> list[ExplainerMeta]:
    """Returns index metadata for every explainer page.

    Returns:
        The full list of explainer metadata entries.

    Raises:
        RuntimeError: If the explainer content fails to load.
    """
    return _load_explainers()


def list_glossary_terms() -> list[GlossaryTerm]:
    """Returns every glossary term.

    Returns:
        All glossary terms, in file order.

    Raises:
        RuntimeError: If the glossary content fails to load.
    """
    return _load_glossary_terms()


def list_curriculum_domains() -> list[CurriculumDomain]:
    """Returns every curriculum domain for the Learn hub.

    Returns:
        All curriculum domains, in file order.

    Raises:
        RuntimeError: If the curriculum content fails to load.
    """
    return _load_curriculum_domains()


def list_curriculum_categories() -> list[CurriculumCategory]:
    """Returns every curriculum category for the Learn hub.

    Returns:
        All curriculum categories, in file order.

    Raises:
        RuntimeError: If the curriculum content fails to load.
    """
    return _load_curriculum_categories()


def content_dir_exists() -> bool:
    """Checks whether the configured content directory is present.

    Returns:
        True if the content directory exists on disk.
    """
    return Path(settings.content_dir).exists()
