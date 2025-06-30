from pydantic import BaseModel, constr
from typing import Optional


class StreetBase(BaseModel):
    district_id: int
    name: constr(strip_whitespace=True, min_length=1)


class StreetCreate(StreetBase):
    pass


class StreetUpdate(BaseModel):
    name: Optional[str]
    district_id: Optional[int]
    district_name: Optional[str]
    zipcode: Optional[str]


class StreetOut(StreetBase):
    id: int

    class Config:
        from_attributes = True

    
class StreetJoinedOut(BaseModel):
    id: int
    name: str
    district: str
    district_id: int
    zipcode: str
    city: str
    city_id: int
    state: str
    state_id: int

    class Config:
        orm_mode = True