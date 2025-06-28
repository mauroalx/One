from pydantic import BaseModel, Field, constr
from typing import Literal, Optional
from datetime import datetime


class BillingAccountCreate(BaseModel):
    name: constr(min_length=1)
    provider: str  # Deve corresponder a um dos PAYMENT_PROVIDERS

    fine_percent: float = 0.0
    fine_type: Literal["daily", "monthly"] = "daily"

    interest_percent: float = 0.0
    interest_type: Literal["daily", "monthly"] = "daily"

    status: Literal["active", "inactive", "archived"] = "active"

    model_config = {"extra": "forbid"}


class BillingAccountUpdate(BaseModel):
    name: Optional[str] = None
    provider: Optional[str] = None
    fine_percent: Optional[float] = None
    fine_type: Optional[Literal["daily", "monthly"]] = None
    interest_percent: Optional[float] = None
    interest_type: Optional[Literal["daily", "monthly"]] = None
    status: Optional[Literal["active", "inactive", "archived"]] = None

    model_config = {"extra": "forbid"}

class BillingAccountOut(BaseModel):
    id: int
    name: str
    provider: str

    fine_percent: float
    fine_type: str

    interest_percent: float
    interest_type: str

    status: str
    created_at: datetime
    updated_at: datetime

    model_config = {"from_attributes": True}
