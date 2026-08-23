"""Schemas for the Learn hub's domain/topic curriculum structure."""

from pydantic import BaseModel


class CurriculumDomain(BaseModel):
    """A top-level subject area on the Learn hub, e.g. "Deep Learning".

    Attributes:
        slug: Route path for the domain, e.g. "deep-learning".
        title: Display title.
        summary: One or two sentence description of what the domain covers.
        status: Either "live" or "coming-soon".
        order: Position among all domains on the Learn hub, in the order a
            learner should tackle them, lower first.
    """

    slug: str
    title: str
    summary: str
    status: str
    order: int


class CurriculumCategory(BaseModel):
    """A tab within a domain grouping its topics, e.g. "ANN" within Deep Learning.

    A domain with no categories renders its topics as one flat list; a
    domain with categories renders them as tabs, each filtering the topic
    grid below it.

    Attributes:
        slug: Identifier for the category, e.g. "ann".
        domain: Slug of the parent CurriculumDomain.
        title: Display title, e.g. "ANN".
        order: Position among this domain's category tabs, lower first.
    """

    slug: str
    domain: str
    title: str
    order: int
