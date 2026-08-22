"""Application settings loaded from environment variables."""

from pathlib import Path

from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    """Runtime configuration for the FastAPI application.

    Attributes:
        cors_origins: Origins allowed to call the API from a browser.
        content_dir: Directory containing blog, timeline, and explainer
            content files.
    """

    model_config = SettingsConfigDict(env_file=".env", env_file_encoding="utf-8")

    cors_origins: list[str] = ["http://localhost:5173"]
    content_dir: Path = Path(__file__).resolve().parent.parent.parent / "content"


settings = Settings()
