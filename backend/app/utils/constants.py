from dataclasses import dataclass
from typing import List

@dataclass(frozen=True)
class PaymentProvider:
    id: str
    label: str

PAYMENT_PROVIDERS: List[PaymentProvider] = [
    PaymentProvider(id="asaas", label="Asaas"),
    PaymentProvider(id="gerencianet", label="Gerencianet"),
]