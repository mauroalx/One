# backend/app/api/__init__.py
from fastapi import APIRouter
from app.api import v1

api_router = APIRouter()
api_router.include_router(v1.router, prefix="/v1", tags=["v1"])
# This file initializes the API router and includes the version 1 of the API.
# It allows for versioning of the API endpoints, making it easier to manage changes and updates in the future.