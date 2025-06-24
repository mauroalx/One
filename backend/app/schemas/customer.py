from pydantic import BaseModel, EmailStr, constr
from typing import Optional
from datetime import datetime
from enum import Enum

class CustomerType(str, Enum):
    individual = "individual"
    company = "company"

# Schema de criação
class CustomerCreate(BaseModel):
    type: CustomerType = CustomerType.individual

    full_name: constr(min_length=1)
    trade_name: Optional[str] = None
    legal_name: Optional[str] = None
    document: constr(min_length=11, max_length=18)

    rg: Optional[str] = None
    mother_name: Optional[str] = None
    father_name: Optional[str] = None

    email: EmailStr
    phone: Optional[str] = None
    mobile1: Optional[str] = None
    mobile2: Optional[str] = None
    fax: Optional[str] = None

    address_street: constr(min_length=1)
    address_number: constr(min_length=1)
    address_complement: Optional[str] = None
    address_neighborhood: constr(min_length=1)
    address_city: constr(min_length=1)
    address_state: constr(min_length=2, max_length=2)
    address_zipcode: constr(min_length=8, max_length=10)

    model_config = {
        "extra": "forbid"
    }

# Schema de atualização
class CustomerUpdate(BaseModel):
    type: Optional[CustomerType] = None
    full_name: Optional[constr(min_length=1)] = None
    trade_name: Optional[str] = None
    legal_name: Optional[str] = None
    document: Optional[constr(min_length=11, max_length=18)] = None
    rg: Optional[str] = None
    mother_name: Optional[str] = None
    father_name: Optional[str] = None
    email: Optional[EmailStr] = None
    phone: Optional[str] = None
    mobile1: Optional[str] = None
    mobile2: Optional[str] = None
    fax: Optional[str] = None
    address_street: Optional[constr(min_length=1)] = None
    address_number: Optional[constr(min_length=1)] = None
    address_complement: Optional[str] = None
    address_neighborhood: Optional[constr(min_length=1)] = None
    address_city: Optional[constr(min_length=1)] = None
    address_state: Optional[constr(min_length=2, max_length=2)] = None
    address_zipcode: Optional[constr(min_length=8, max_length=10)] = None

    model_config = {
        "extra": "forbid"
    }

# Schema de retorno
class CustomerOut(BaseModel):
    id: int
    type: CustomerType

    full_name: str
    trade_name: Optional[str]
    legal_name: Optional[str]
    document: str

    rg: Optional[str]
    mother_name: Optional[str]
    father_name: Optional[str]

    email: str
    phone: Optional[str]
    mobile1: Optional[str]
    mobile2: Optional[str]
    fax: Optional[str]

    address_street: str
    address_number: str
    address_complement: Optional[str]
    address_neighborhood: str
    address_city: str
    address_state: str
    address_zipcode: str

    created_at: datetime
    updated_at: datetime

    model_config = {
        "from_attributes": True
    }
