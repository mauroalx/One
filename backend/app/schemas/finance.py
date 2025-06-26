from pydantic import BaseModel


class PaymentProviderOut(BaseModel):
    id: str
    label: str

