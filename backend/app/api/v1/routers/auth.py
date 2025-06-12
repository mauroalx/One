from fastapi import APIRouter, Depends, HTTPException
from fastapi.encoders import jsonable_encoder
from fastapi.responses import JSONResponse
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from sqlalchemy.orm import selectinload
from sqlalchemy.exc import IntegrityError
from app.core.db import get_db
from app.models import User, UserStatus, Role
from app.core.security import create_token
from app.core.decorators import require_auth
from app.schemas.role import RoleIn, RoleOut
from app.schemas.response import ErrorResponse
from typing import List
from pydantic import BaseModel
import bcrypt
import logging

router = APIRouter()


class LoginRequest(BaseModel):
    email: str
    password: str


@router.get("/confirm")
async def confirm(user=Depends(require_auth)):
    """
    Returns the authenticated user's information extracted from the JWT token.

    - Requires valid JWT token.
    - Used to validate active sessions.
    """
    return {
        "id": user["id"],
        "email": user["email"],
        "name": user["name"],
    }


@router.post("/login")
async def login(data: LoginRequest, db: AsyncSession = Depends(get_db)):
    """
    Authenticates the user and returns a JWT token and user data.

    - Returns 401 for invalid credentials.
    - Returns 403 if the user account is disabled.
    """
    result = await db.execute(
        select(User)
        .where(User.email == data.email)
        .options(selectinload(User.role))
    )

    user = result.scalars().first()

    if not user or not bcrypt.checkpw(data.password.encode(), user.password.encode()):
        raise HTTPException(status_code=401, detail="Invalid credentials")

    if user.status != UserStatus.enabled:
        raise HTTPException(status_code=403, detail="User is disabled")

    token = create_token({
        "id": user.id,
        "email": user.email,
        "role": jsonable_encoder(user.role),
        "name": user.name
    })

    return {
        "access_token": token,
        "user": {
            "id": user.id,
            "email": user.email,
            "name": user.name,
        }
    }


@router.get("/roles", responses={200: {"description": "List of roles"}})
async def list_roles(user=Depends(require_auth), db: AsyncSession = Depends(get_db)):
    """
    Returns a list of all roles in the system.

    - Requires authentication.
    - Returns 200 with a list of role objects.
    """
    result = await db.execute(select(Role))
    roles = result.scalars().all()

    return JSONResponse(
        status_code=200,
        content={
            "detail": "List of roles retrieved successfully",
            "data": [RoleOut.from_orm(r).dict() for r in roles]
        }
    )


@router.get("/roles/{role_id}", responses={
    404: {"model": ErrorResponse, "description": "Role not found"},
    403: {"model": ErrorResponse, "description": "Access denied"}
})
async def get_role(role_id: int, user=Depends(require_auth), db: AsyncSession = Depends(get_db)):
    """
    Retrieves a specific role by its ID.

    - Requires authentication.
    - Returns 404 if the role does not exist.
    """
    role = await db.get(Role, role_id)
    if not role:
        raise HTTPException(status_code=404, detail="Role not found")

    return JSONResponse(
        status_code=200,
        content={"detail": "Role found", "data": RoleOut.from_orm(role).dict()}
    )


@router.post("/roles/create", responses={
    201: {"description": "Role successfully created"},
    400: {"model": ErrorResponse, "description": "Validation or duplicate error"}
})
async def create_role(role_data: RoleIn, user=Depends(require_auth), db: AsyncSession = Depends(get_db)):
    """
    Creates a new role.

    - Requires authentication.
    - Returns 400 if a role with the same name already exists.
    """
    role = Role(**role_data.dict())
    db.add(role)

    try:
        await db.commit()
        await db.refresh(role)
    except IntegrityError:
        await db.rollback()
        return JSONResponse(status_code=400, content={"detail": "Role name already exists"})

    return JSONResponse(
        status_code=201,
        content={"detail": "Role successfully created", "data": RoleOut.from_orm(role).dict()}
    )


@router.put("/roles/{role_id}", responses={
    200: {"description": "Role successfully updated"},
    404: {"model": ErrorResponse, "description": "Role not found"},
    400: {"model": ErrorResponse, "description": "Validation or duplicate error"}
})
async def update_role(role_id: int, role_data: RoleIn, user=Depends(require_auth), db: AsyncSession = Depends(get_db)):
    """
    Updates an existing role by ID.

    - Requires authentication.
    - Returns 404 if role does not exist.
    - Returns 400 if the new name is already used.
    """
    role = await db.get(Role, role_id)
    if not role:
        raise HTTPException(status_code=404, detail="Role not found")

    for field, value in role_data.dict(exclude_unset=True).items():
        setattr(role, field, value)

    try:
        await db.commit()
        await db.refresh(role)
    except IntegrityError:
        await db.rollback()
        return JSONResponse(status_code=400, content={"detail": "Role name already in use"})

    return JSONResponse(
        status_code=200,
        content={"detail": "Role successfully updated", "data": RoleOut.from_orm(role).dict()}
    )


@router.delete("/roles/{role_id}", responses={
    200: {"description": "Role successfully deleted"},
    404: {"model": ErrorResponse, "description": "Role not found"},
    400: {"model": ErrorResponse, "description": "Role is in use by users"}
})
async def delete_role(role_id: int, user=Depends(require_auth), db: AsyncSession = Depends(get_db)):
    """
    Deletes a role by ID if it's not associated with users.

    - Requires authentication.
    - Returns 404 if the role does not exist.
    - Returns 400 if the role is linked to users.
    """
    role = await db.get(Role, role_id)
    if not role:
        raise HTTPException(status_code=404, detail="Role not found")

    await db.delete(role)
    try:
        await db.commit()
    except IntegrityError:
        await db.rollback()
        return JSONResponse(
            status_code=400,
            content={"detail": "Role is associated with users and cannot be deleted"}
        )

    return JSONResponse(
        status_code=200,
        content={"detail": "Role successfully deleted", "data": {"id": role_id}}
    )
