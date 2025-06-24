from pydantic import BaseModel
from typing import Optional
from datetime import datetime
import enum

class ContractStatus(str, enum.Enum):
    draft = "draft"
    active = "active"
    archived = "archived"

class ContractType(str, enum.Enum):
    PF = "PF"
    PJ = "PJ"
    custom = "custom"

class ContractCreate(BaseModel):
    name: str
    content: str
    status: ContractStatus
    type: ContractType
    months: int

class ContractUpdate(BaseModel):
    name: Optional[str]
    content: Optional[str]
    status: Optional[ContractStatus]
    type: Optional[ContractType]
    months: Optional[int]

class ContractOut(BaseModel):
    id: int
    name: str
    content: str
    status: ContractStatus
    type: ContractType
    months: int
    created_at: Optional[datetime]
    updated_at: Optional[datetime]

    class Config:
        from_attributes = True
