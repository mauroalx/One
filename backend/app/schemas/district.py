from pydantic import BaseModel, constr
from typing import Optional


class DistrictBase(BaseModel):
    state_id: int
    city_id: int
    name: constr(strip_whitespace=True, min_length=1)
    zipcode: constr(strip_whitespace=True, min_length=7, max_length=9)


class DistrictCreate(DistrictBase):
    pass


class DistrictUpdate(BaseModel):
    name: Optional[str]
    zipcode: Optional[str]


class DistrictOut(DistrictBase):
    id: int

    class Config:
        from_attributes = True
