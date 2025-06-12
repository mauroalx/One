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
async def confirm(user = require_auth()):
    return {
        "id": user["id"],
        "email": user["email"],
        "name": user["name"],
        # ou qualquer outro campo que você tenha colocado no token
    }

@router.post("/login")
async def login(data: LoginRequest, db: AsyncSession = Depends(get_db)):
    
    result = await db.execute(
        select(User)
        .where(User.email == data.email)
        .options(selectinload(User.role))
    )

    user = result.scalars().first()

    if not user or not bcrypt.checkpw(data.password.encode(), user.password.encode()):
        raise HTTPException(status_code=401, detail="Credenciais inválidas")

    if user.status != UserStatus.enabled:
        raise HTTPException(status_code=403, detail="Usuário desativado")

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


# @router.get("/roles")
# async def get_roles(user = require_auth(), db: AsyncSession = Depends(get_db)):
#     result = await db.execute(select(Role))
#     roles = result.scalars().all()
#     return {"roles": roles}


# Listar todas as roles
@router.get("/roles", responses={200: {"description": "Lista de roles"}})
async def list_roles(user=Depends(require_auth), db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(Role))
    roles = result.scalars().all()

    return JSONResponse(
        status_code=200,
        content={
            "detail": "Lista de roles retornada com sucesso",
            "data": [RoleOut.from_orm(r).dict() for r in roles]
        }
    )


@router.get("/{role_id}", responses={
    404: {"model": ErrorResponse, "description": "Role não encontrada"},
    403: {"model": ErrorResponse, "description": "Acesso negado"}
})
async def get_role(role_id: int, user=Depends(require_auth), db: AsyncSession = Depends(get_db)):
    role = await db.get(Role, role_id)
    if not role:
        raise HTTPException(status_code=404, detail="Role não encontrada")

    return JSONResponse(
        status_code=200,
        content={"detail": "Role encontrada", "data": RoleOut.from_orm(role).dict()}
    )


@router.post("/", responses={
    201: {"description": "Role criada com sucesso"},
    400: {"model": ErrorResponse, "description": "Erro de validação ou duplicidade"}
})
async def create_role(role_data: RoleIn, user=Depends(require_auth), db: AsyncSession = Depends(get_db)):
    # if not role_data.name or not role_data.permissions:
    #     return JSONResponse(status_code=400, content={"detail": "Campos obrigatórios ausentes"})

    role = Role(**role_data.dict())
    db.add(role)

    try:
        await db.commit()
        await db.refresh(role)
    except IntegrityError:
        await db.rollback()
        return JSONResponse(status_code=400, content={"detail": "Já existe uma role com esse nome"})

    return JSONResponse(
        status_code=201,
        content={"detail": "Role criada com sucesso", "data": RoleOut.from_orm(role).dict()}
    )


@router.put("/roles/{role_id}", responses={
    200: {"description": "Role atualizada com sucesso"},
    404: {"model": ErrorResponse, "description": "Role não encontrada"},
    400: {"model": ErrorResponse, "description": "Erro de validação ou duplicidade"}
})
async def update_role(role_id: int, role_data: RoleIn, user=Depends(require_auth), db: AsyncSession = Depends(get_db)):
    role = await db.get(Role, role_id)
    if not role:
        raise HTTPException(status_code=404, detail="Role não encontrada")

    for field, value in role_data.dict(exclude_unset=True).items():
        setattr(role, field, value)

    try:
        await db.commit()
        await db.refresh(role)
    except IntegrityError:
        await db.rollback()
        return JSONResponse(status_code=400, content={"detail": "Nome de role já em uso"})

    return JSONResponse(
        status_code=200,
        content={"detail": "Role atualizada com sucesso", "data": RoleOut.from_orm(role).dict()}
    )


@router.delete("/roles/{role_id}", responses={
    200: {"description": "Role deletada com sucesso"},
    404: {"model": ErrorResponse, "description": "Role não encontrada"},
    400: {"model": ErrorResponse, "description": "Role em uso por usuários"}
})
async def delete_role(role_id: int, user=Depends(require_auth), db: AsyncSession = Depends(get_db)):
    role = await db.get(Role, role_id)
    if not role:
        raise HTTPException(status_code=404, detail="Role não encontrada")

    await db.delete(role)
    try:
        await db.commit()
    except IntegrityError:
        await db.rollback()
        return JSONResponse(
            status_code=400,
            content={"detail": "Role está associada a usuários e não pode ser deletada"}
        )

    return JSONResponse(
        status_code=200,
        content={"detail": "Role deletada com sucesso", "data": {"id": role_id}}
    )