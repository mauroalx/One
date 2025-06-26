from pydantic import BaseModel, constr
from typing import Optional, Literal
from datetime import datetime


class PlanCreate(BaseModel):
    billing_account_id: int

    name: constr(min_length=1)
    description: Optional[str] = None

    price: float
    download_speed: int
    upload_speed: int

    auto_block: int = 0
    status: Literal["active", "inactive"] = "active"

    model_config = {"extra": "forbid"}


class PlanUpdate(BaseModel):
    billing_account_id: Optional[int] = None
    name: Optional[constr(min_length=1)] = None
    description: Optional[str] = None

    price: Optional[float] = None
    download_speed: Optional[int] = None
    upload_speed: Optional[int] = None

    auto_block: Optional[int] = None
    status: Optional[Literal["active", "inactive"]] = None

    model_config = {"extra": "forbid"}


class PlanOut(BaseModel):
    id: int
    billing_account_id: int

    name: str
    description: Optional[str]

    price: float
    download_speed: int
    upload_speed: int

    auto_block: int
    status: str

    created_at: datetime
    updated_at: datetime

    model_config = {"from_attributes": True}
