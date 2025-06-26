from sqlalchemy import Column, Integer, String, Enum, Float, TIMESTAMP
from datetime import datetime
from app.models.base import Base
import enum

class BillingAccountStatus(str, enum.Enum):
    active = "active"
    inactive = "inactive"
    archived = "archived"

class FineType(str, enum.Enum):
    daily = "daily"
    monthly = "monthly"

class InterestType(str, enum.Enum):
    daily = "daily"
    monthly = "monthly"

class BillingAccount(Base):
    __tablename__ = "billing_accounts"

    id = Column(Integer, primary_key=True)
    name = Column(String, nullable=False)
    provider = Column(String, nullable=False)  # usará valores fixos do sistema como ASAAS, GERENCIANET

    fine_percent = Column(Float, default=0.0)
    fine_type = Column(Enum(FineType), default=FineType.daily, nullable=False)

    interest_percent = Column(Float, default=0.0)
    interest_type = Column(Enum(InterestType), default=InterestType.daily, nullable=False)

    status = Column(Enum(BillingAccountStatus), default=BillingAccountStatus.active, nullable=False)

    created_at = Column(TIMESTAMP, default=datetime.utcnow)
    updated_at = Column(TIMESTAMP, default=datetime.utcnow, onupdate=datetime.utcnow)
