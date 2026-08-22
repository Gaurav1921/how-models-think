"""Liveness check endpoint."""

from fastapi import APIRouter

router = APIRouter()


@router.get("/health")
def get_health() -> dict[str, str]:
    """Reports that the API process is up.

    Returns:
        A status payload indicating the service is healthy.
    """
    return {"status": "ok"}
