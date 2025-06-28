from pydantic import BaseModel, constr
from typing import Optional, Literal, List
from datetime import datetime
from .plan import PlanOut
from .customer_contract import CustomerContractOut


class CustomerServiceCreate(BaseModel):
    customer_id: int
    plan_id: int
    contract_id: int  # ⬅️ NOVO

    login_pppoe: constr(min_length=1)
    password_pppoe: constr(min_length=1)
    subscriber_password: constr(min_length=1)

    description: Optional[str] = None
    status: Literal["active", "suspended", "canceled"] = "active"

    model_config = {"extra": "forbid"}

class CustomerServiceOut(BaseModel):
    id: int
    customer_id: int
    plan_id: int
    login_pppoe: str
    password_pppoe: str
    subscriber_password: str
    description: Optional[str]
    status: str
    created_at: datetime
    updated_at: datetime

    model_config = {"from_attributes": True}
