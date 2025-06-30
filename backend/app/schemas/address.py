# app/schemas/address.py

from pydantic import BaseModel

class AddressOut(BaseModel):
    id: int
    city_id: int
    neighborhood: str
    street: str
    zipcode: str

    class Config:
        orm_mode = True
