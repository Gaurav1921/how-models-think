"""FastAPI application entry point: creates the app and mounts routers."""

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.api import content, health
from app.core.config import settings

app = FastAPI(title="Transformers Explainer API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.cors_origins,
    allow_methods=["GET"],
    allow_headers=["*"],
)

app.include_router(health.router, prefix="/api")
app.include_router(content.router, prefix="/api")
