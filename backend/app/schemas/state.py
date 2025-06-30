from pydantic import BaseModel

class StateOut(BaseModel):
    id: int
    name: str
    acronym: str

    class Config:
        from_attributes = True