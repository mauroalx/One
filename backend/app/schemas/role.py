from pydantic import BaseModel
from typing import Optional, Dict, Any

# Schema de criação
class RoleCreate(BaseModel):
    name: str
    permissions: Dict[str, Any]

    model_config = {
        "extra": "forbid"
    }

# Schema de atualização
class RoleUpdate(BaseModel):
    name: Optional[str] = None
    permissions: Optional[Dict[str, Any]] = None

    model_config = {
        "extra": "forbid"
    }

# Schema de retorno
class RoleOut(BaseModel):
    id: int
    name: str
    permissions: dict

    model_config = {
        "from_attributes": True
    }
