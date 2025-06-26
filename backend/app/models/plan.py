from sqlalchemy import Column, Integer, String, Float, Enum, ForeignKey, TIMESTAMP
from sqlalchemy.orm import relationship
from datetime import datetime
from app.models.base import Base
from app.models.billing_account import BillingAccount
import enum

class PlanStatus(str, enum.Enum):
    active = "active"
    inactive = "inactive"

class Plan(Base):
    __tablename__ = "plans"

    id = Column(Integer, primary_key=True)
    billing_account_id = Column(Integer, ForeignKey("billing_accounts.id"), nullable=False)

    name = Column(String, nullable=False)
    description = Column(String)

    price = Column(Float, nullable=False)
    download_speed = Column(Integer, nullable=False)  # Mbps
    upload_speed = Column(Integer, nullable=False)    # Mbps
    auto_block = Column(Integer, default=0)  # 0 = não bloqueia, 1 = bloqueia em atraso

    status = Column(Enum(PlanStatus), default=PlanStatus.active, nullable=False)

    created_at = Column(TIMESTAMP, default=datetime.utcnow)
    updated_at = Column(TIMESTAMP, default=datetime.utcnow, onupdate=datetime.utcnow)

    billing_account = relationship("BillingAccount", backref="plans")
