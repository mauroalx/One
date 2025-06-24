from typing import Optional
from pydantic import BaseModel
from datetime import datetime

class CustomerContractCreate(BaseModel):
    customer_service_id: int
    final_text: str
    text_hash: str
    signed_at: Optional[datetime] = None
    

    model_config = {"extra": "forbid"}

class CustomerContractOut(BaseModel):
    id: int
    customer_service_id: int
    final_text: str
    text_hash: str
    signed_at: datetime | None
    created_at: datetime
    updated_at: datetime

    model_config = {"from_attributes": True}

class CustomerContractUpdateSignedAt(BaseModel):
    signed_at: datetime

    model_config = {
        "extra": "forbid"
    }