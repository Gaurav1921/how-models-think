"""Tests for content_loader's handling of malformed content files."""

import pytest

from app.core.config import settings
from app.services import content_loader

_CACHED_LOADERS = [
    content_loader._load_blog_posts,
    content_loader._load_timeline_events,
    content_loader._load_explainers,
    content_loader._load_glossary_terms,
    content_loader._load_curriculum_domains,
    content_loader._load_curriculum_categories,
]


@pytest.fixture(autouse=True)
def _clear_content_caches():
    for loader in _CACHED_LOADERS:
        loader.cache_clear()
    yield
    for loader in _CACHED_LOADERS:
        loader.cache_clear()


def test_missing_timeline_file_raises_runtime_error(tmp_path, monkeypatch):
    monkeypatch.setattr(settings, "content_dir", tmp_path)
    with pytest.raises(RuntimeError, match="not found"):
        content_loader.list_timeline_events()


def test_malformed_json_raises_runtime_error(tmp_path, monkeypatch):
    timeline_dir = tmp_path / "timeline"
    timeline_dir.mkdir()
    (timeline_dir / "events.json").write_text("{not valid json", encoding="utf-8")
    monkeypatch.setattr(settings, "content_dir", tmp_path)
    with pytest.raises(RuntimeError, match="not valid JSON"):
        content_loader.list_timeline_events()


def test_invalid_entry_raises_runtime_error(tmp_path, monkeypatch):
    timeline_dir = tmp_path / "timeline"
    timeline_dir.mkdir()
    (timeline_dir / "events.json").write_text(
        '[{"id": "missing-required-fields"}]', encoding="utf-8"
    )
    monkeypatch.setattr(settings, "content_dir", tmp_path)
    with pytest.raises(RuntimeError, match="failed validation"):
        content_loader.list_timeline_events()


def _write_blog_post(blog_dir, filename, slug):
    (blog_dir / filename).write_text(
        "---\n"
        f"slug: {slug}\n"
        "title: Test post\n"
        "summary: A test post.\n"
        "date: 2026-01-01\n"
        "tags: [test]\n"
        "---\n"
        "Body text.\n",
        encoding="utf-8",
    )


def test_duplicate_blog_slug_raises_runtime_error(tmp_path, monkeypatch):
    blog_dir = tmp_path / "blog"
    blog_dir.mkdir()
    _write_blog_post(blog_dir, "a-post.md", "same-slug")
    _write_blog_post(blog_dir, "b-post.md", "same-slug")
    monkeypatch.setattr(settings, "content_dir", tmp_path)
    with pytest.raises(RuntimeError, match="Duplicate blog post slug"):
        content_loader.list_blog_posts()


def test_blog_post_missing_frontmatter_raises_runtime_error(tmp_path, monkeypatch):
    blog_dir = tmp_path / "blog"
    blog_dir.mkdir()
    (blog_dir / "no-frontmatter.md").write_text(
        "Just a body, no frontmatter block.", encoding="utf-8"
    )
    monkeypatch.setattr(settings, "content_dir", tmp_path)
    with pytest.raises(RuntimeError, match="Failed to load blog post"):
        content_loader.list_blog_posts()
