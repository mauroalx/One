# app/api/v1/user.py

from fastapi import APIRouter, Depends, Request
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession
from app.core.db import get_db
from app.models.user import User
from app.schemas.user import UserOut
from app.core.decorators import require_auth

router = APIRouter()

@router.get("/", response_model=list[UserOut])
async def list_users(request: Request, db: AsyncSession = Depends(get_db)):
    print(f"Request user: {request.state.user}")  # Debugging line to check the user in request stat
    result = await db.execute(select(User))
    users = result.scalars().all()
    return users
