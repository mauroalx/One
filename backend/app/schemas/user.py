from pydantic import BaseModel, EmailStr
from typing import Optional
from datetime import datetime

# Schema de criação
class UserCreate(BaseModel):
    name: str
    email: EmailStr
    password: str  # Espera a senha em texto puro para depois gerar hash
    description: Optional[str] = None
    role_id: int

    model_config = {
        "extra": "forbid"
    }

# Schema de atualização
class UserUpdate(BaseModel):
    name: Optional[str] = None
    email: Optional[EmailStr] = None
    password: Optional[str] = None
    description: Optional[str] = None
    role_id: Optional[int] = None
    status: Optional[str] = None

    model_config = {
        "extra": "forbid"
    }

# Schema de retorno
class UserOut(BaseModel):
    id: int
    name: str
    email: str
    description: Optional[str] = None
    created_at: datetime
    updated_at: datetime
    status: str
    role_id: int

    model_config = {
        "from_attributes": True
    }
