from pydantic import BaseModel

class CityOut(BaseModel):
    id: int
    name: str
    state_id: int

    class Config:
        from_attributes = True