from pydantic import BaseModel


class CustomerAddressCreate(BaseModel):
    state: str
    city: str
    neighborhood: str
    street: str
    zipcode: str
    number: str
    complement: str | None = None
    reference: str | None = None


class CustomerAddressOut(BaseModel):
    id: int
    customer_service_id: int
    state: str
    city: str
    neighborhood: str
    street: str
    zipcode: str
    number: str
    complement: str | None
    reference: str | None

    class Config:
        orm_mode = True
