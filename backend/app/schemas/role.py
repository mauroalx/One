# app/schemas/role.py

from pydantic import BaseModel
from typing import Optional, Dict, Any
from datetime import datetime


class RoleIn(BaseModel):
    name: Optional[str]  # Obrigatório na criação, opcional na atualização
    permissions: Optional[Dict[str, Any]]  # JSON com permissões categorizadas

    model_config = {
        "extra": "forbid"
    }

class RoleOut(BaseModel):
    id: int
    name: str
    permissions: dict

    model_config = {
        "from_attributes": True
    }