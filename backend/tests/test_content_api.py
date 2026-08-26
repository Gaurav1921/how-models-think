from fastapi.testclient import TestClient

from app.main import app

client = TestClient(app)


def test_list_blog_posts_returns_seed_post():
    response = client.get("/api/blog/posts")
    assert response.status_code == 200
    slugs = [post["slug"] for post in response.json()]
    assert "prompt-engineering-basics" in slugs


def test_get_blog_post_by_slug():
    response = client.get("/api/blog/posts/prompt-engineering-basics")
    assert response.status_code == 200
    body = response.json()
    assert body["title"].startswith("What we mean by")
    assert "body_markdown" in body


def test_get_unknown_blog_post_returns_404():
    response = client.get("/api/blog/posts/does-not-exist")
    assert response.status_code == 404


def test_list_timeline_events_returns_entries():
    response = client.get("/api/timeline/events")
    assert response.status_code == 200
    events = response.json()
    assert len(events) >= 8
    assert any(event["id"] == "transformer-2017" for event in events)


def test_list_explainers_includes_transformers():
    response = client.get("/api/explainers")
    assert response.status_code == 200
    slugs = [item["slug"] for item in response.json()]
    assert "transformers" in slugs


def test_list_glossary_terms_includes_self_attention():
    response = client.get("/api/glossary/terms")
    assert response.status_code == 200
    slugs = [item["slug"] for item in response.json()]
    assert "self-attention" in slugs


def test_list_curriculum_domains_includes_deep_learning():
    response = client.get("/api/curriculum/domains")
    assert response.status_code == 200
    slugs = [item["slug"] for item in response.json()]
    assert "deep-learning" in slugs


def test_list_curriculum_categories_includes_ann():
    response = client.get("/api/curriculum/categories")
    assert response.status_code == 200
    slugs = [item["slug"] for item in response.json()]
    assert "ann" in slugs


def test_list_explainers_includes_activation_and_loss_functions():
    response = client.get("/api/explainers")
    assert response.status_code == 200
    slugs = [item["slug"] for item in response.json()]
    assert "activation-functions" in slugs
    assert "loss-functions" in slugs
