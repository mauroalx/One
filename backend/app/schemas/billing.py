from pydantic import BaseModel, constr
from typing import Optional, Literal
from datetime import datetime


class BillingCreate(BaseModel):
    customer_service_id: int
    billing_account_id: int

    value: float
    due_date: datetime

    external_id: Optional[str] = None
    barcode: Optional[str] = None
    pdf_url: Optional[str] = None

    status: Literal["pending", "paid", "canceled", "failed"] = "pending"

    model_config = {"extra": "forbid"}
    


class BillingOut(BaseModel):
    id: int
    customer_service_id: int
    billing_account_id: int

    value: float
    due_date: datetime
    paid_at: Optional[datetime]

    status: str

    external_id: Optional[str]
    barcode: Optional[str]
    pdf_url: Optional[str]

    created_at: datetime
    updated_at: datetime

    model_config = {"from_attributes": True}
