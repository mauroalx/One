from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from sqlalchemy.orm import selectinload
from sqlalchemy.exc import IntegrityError
from app.core.db import get_db
from app.models import User, UserStatus, Role
from app.core.security import create_token
from app.core.decorators import require_auth
from app.schemas.role import RoleCreate, RoleUpdate, RoleOut
from app.schemas.response import ErrorResponse
from pydantic import BaseModel
import bcrypt

router = APIRouter()


class LoginRequest(BaseModel):
    email: str
    password: str


@router.get("/confirm")
async def confirm(user=require_auth()):
    """
    Returns the authenticated user's information extracted from the JWT token.
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
        "role": RoleOut.from_orm(user.role).dict(),  # Aqui pode usar .dict() já que não tem datetime
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


@router.get("/roles", response_model=list[RoleOut])
async def list_roles(user=require_auth(), db: AsyncSession = Depends(get_db)):
    """
    Returns a list of all roles.
    """
    result = await db.execute(select(Role))
    roles = result.scalars().all()
    return [RoleOut.from_orm(r) for r in roles]


@router.get("/roles/{role_id}", response_model=RoleOut, responses={
    404: {"model": ErrorResponse, "description": "Role not found"}
})
async def get_role(role_id: int, user=require_auth(), db: AsyncSession = Depends(get_db)):
    """
    Retrieves a specific role by ID.
    """
    role = await db.get(Role, role_id)
    if not role:
        raise HTTPException(status_code=404, detail="Role not found")

    return RoleOut.from_orm(role)


@router.post("/roles/create", response_model=RoleOut, responses={
    400: {"model": ErrorResponse, "description": "Validation or duplicate error"}
})
async def create_role(role_data: RoleCreate, user=require_auth(), db: AsyncSession = Depends(get_db)):
    """
    Creates a new role.
    """
    role = Role(**role_data.dict())
    db.add(role)

    try:
        await db.commit()
        await db.refresh(role)
    except IntegrityError:
        await db.rollback()
        raise HTTPException(status_code=400, detail="Role name already exists")

    return RoleOut.from_orm(role)


@router.put("/roles/{role_id}", response_model=RoleOut, responses={
    404: {"model": ErrorResponse, "description": "Role not found"},
    400: {"model": ErrorResponse, "description": "Validation or duplicate error"}
})
async def update_role(role_id: int, role_data: RoleUpdate, user=require_auth(), db: AsyncSession = Depends(get_db)):
    """
    Updates an existing role by ID.
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
        raise HTTPException(status_code=400, detail="Role name already in use")

    return RoleOut.from_orm(role)


@router.delete("/roles/{role_id}", responses={
    200: {"description": "Role successfully deleted"},
    404: {"model": ErrorResponse, "description": "Role not found"},
    400: {"model": ErrorResponse, "description": "Role is in use by users"}
})
async def delete_role(role_id: int, user=require_auth(), db: AsyncSession = Depends(get_db)):
    """
    Deletes a role by ID if it's not associated with users.
    """
    role = await db.get(Role, role_id)
    if not role:
        raise HTTPException(status_code=404, detail="Role not found")

    await db.delete(role)
    try:
        await db.commit()
    except IntegrityError:
        await db.rollback()
        raise HTTPException(status_code=400, detail="Role is associated with users and cannot be deleted")

    return {"detail": "Role successfully deleted", "id": role_id}
