# app/schemas/user.py

from pydantic import BaseModel
from datetime import datetime

class UserOut(BaseModel):
    id: int
    name: str
    email: str
    description: str | None = None
    created_at: datetime
    updated_at: datetime
    status: str
    role_id: int

    class Config:
        orm_mode = True
