import json
from dataclasses import dataclass
from typing import List


CITIES_JSON_PATH = './app/utils/cities.json'


@dataclass(frozen=True)
class PaymentProvider:
    id: str
    label: str

PAYMENT_PROVIDERS: List[PaymentProvider] = [
    PaymentProvider(id="asaas", label="Asaas"),
    PaymentProvider(id="gerencianet", label="Gerencianet"),
]

@dataclass(frozen=True)
class StateInfo:
    name: str
    acronym: str

STATES: List[StateInfo] = [
    StateInfo(name="Acre", acronym="AC"),
    StateInfo(name="Alagoas", acronym="AL"),
    StateInfo(name="Amapá", acronym="AP"),
    StateInfo(name="Amazonas", acronym="AM"),
    StateInfo(name="Bahia", acronym="BA"),
    StateInfo(name="Ceará", acronym="CE"),
    StateInfo(name="Distrito Federal", acronym="DF"),
    StateInfo(name="Espírito Santo", acronym="ES"),
    StateInfo(name="Goiás", acronym="GO"),
    StateInfo(name="Maranhão", acronym="MA"),
    StateInfo(name="Mato Grosso", acronym="MT"),
    StateInfo(name="Mato Grosso do Sul", acronym="MS"),
    StateInfo(name="Minas Gerais", acronym="MG"),
    StateInfo(name="Pará", acronym="PA"),
    StateInfo(name="Paraíba", acronym="PB"),
    StateInfo(name="Paraná", acronym="PR"),
    StateInfo(name="Pernambuco", acronym="PE"),
    StateInfo(name="Piauí", acronym="PI"),
    StateInfo(name="Rio de Janeiro", acronym="RJ"),
    StateInfo(name="Rio Grande do Norte", acronym="RN"),
    StateInfo(name="Rio Grande do Sul", acronym="RS"),
    StateInfo(name="Rondônia", acronym="RO"),
    StateInfo(name="Roraima", acronym="RR"),
    StateInfo(name="Santa Catarina", acronym="SC"),
    StateInfo(name="São Paulo", acronym="SP"),
    StateInfo(name="Sergipe", acronym="SE"),
    StateInfo(name="Tocantins", acronym="TO"),
]

@dataclass(frozen=True)
class CityInfo:
    state_acronym: str
    city_name: str

def load_all_cities() -> List[CityInfo]:
    with open(CITIES_JSON_PATH, "r", encoding="utf-8") as f:
        raw_data = json.load(f)
        return [CityInfo(**item) for item in raw_data]