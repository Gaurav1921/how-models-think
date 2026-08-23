"""Read-only content endpoints for blog, timeline, and explainer pages."""

from fastapi import APIRouter

from app.models.blog import BlogPost, BlogPostSummary
from app.models.curriculum import CurriculumCategory, CurriculumDomain
from app.models.explainer import ExplainerMeta
from app.models.glossary import GlossaryTerm
from app.models.timeline import TimelineEvent
from app.services import content_loader

router = APIRouter()


@router.get("/blog/posts", response_model=list[BlogPostSummary])
def get_blog_posts() -> list[BlogPostSummary]:
    """Lists all blog posts for the blog index page.

    Returns:
        Blog post summaries, newest first.
    """
    return content_loader.list_blog_posts()


@router.get("/blog/posts/{slug}", response_model=BlogPost)
def get_blog_post(slug: str) -> BlogPost:
    """Retrieves a single blog post by slug.

    Args:
        slug: The post's URL-safe identifier.

    Returns:
        The full blog post including its markdown body.

    Raises:
        HTTPException: 404 if the slug is unknown.
    """
    return content_loader.get_blog_post(slug)


@router.get("/timeline/events", response_model=list[TimelineEvent])
def get_timeline_events() -> list[TimelineEvent]:
    """Lists all AI/ML evolution timeline events.

    Returns:
        Timeline events in chronological file order.
    """
    return content_loader.list_timeline_events()


@router.get("/explainers", response_model=list[ExplainerMeta])
def get_explainers() -> list[ExplainerMeta]:
    """Lists index metadata for every explainer page.

    Returns:
        Explainer metadata entries for nav and home page cards.
    """
    return content_loader.list_explainers()


@router.get("/glossary/terms", response_model=list[GlossaryTerm])
def get_glossary_terms() -> list[GlossaryTerm]:
    """Lists every glossary term.

    Returns:
        All glossary terms, used to power inline definitions across
        explainer pages.
    """
    return content_loader.list_glossary_terms()


@router.get("/curriculum/domains", response_model=list[CurriculumDomain])
def get_curriculum_domains() -> list[CurriculumDomain]:
    """Lists every curriculum domain for the Learn hub.

    Returns:
        All curriculum domains, in file order.
    """
    return content_loader.list_curriculum_domains()


@router.get("/curriculum/categories", response_model=list[CurriculumCategory])
def get_curriculum_categories() -> list[CurriculumCategory]:
    """Lists every curriculum category for the Learn hub.

    Returns:
        All curriculum categories, in file order.
    """
    return content_loader.list_curriculum_categories()
