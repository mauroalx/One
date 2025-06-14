# backend/app/api/v1/__init__.py
from fastapi import APIRouter
from app.api.v1.routes import user,auth  # Exemplo de rota

router = APIRouter()
router.include_router(user.router, prefix="/users", tags=["Users"])
router.include_router(auth.router, prefix="/auth", tags=["auth"])

# This file initializes the version 1 of the API and includes the user routes.
# It allows for versioning of the API endpoints, making it easier to manage changes and updates in the future.