from fastapi import APIRouter, Depends, HTTPException
from fastapi.encoders import jsonable_encoder
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from sqlalchemy.orm import selectinload
from app.core.db import get_db
from app.models import User, UserStatus
from app.core.security import create_token
from app.core.decorators import require_auth
from pydantic import BaseModel
import bcrypt


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
