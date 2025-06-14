from pydantic import BaseModel

class ErrorResponse(BaseModel):
    detail: str

    model_config = {
        "from_attributes": True
    }