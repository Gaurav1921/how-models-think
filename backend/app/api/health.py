"""Liveness and readiness check endpoint."""

from fastapi import APIRouter, Response

from app.services.content_loader import content_dir_exists

router = APIRouter()


@router.get("/health")
def get_health(response: Response) -> dict[str, str]:
    """Reports whether the API process is up and its content is reachable.

    Args:
        response: The outgoing response, used to set a 503 status when the
            content directory is missing.

    Returns:
        A status payload indicating the service is healthy, or degraded if
        the configured content directory cannot be found.
    """
    if not content_dir_exists():
        response.status_code = 503
        return {"status": "degraded", "reason": "content directory not found"}
    return {"status": "ok"}
