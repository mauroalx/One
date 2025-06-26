from sqlalchemy import Column, Integer, Float, String, TIMESTAMP, ForeignKey, Enum
from sqlalchemy.orm import relationship
from datetime import datetime
from app.models.base import Base
import enum

class BillingStatus(str, enum.Enum):
    pending = "pending"
    paid = "paid"
    canceled = "canceled"
    failed = "failed"

class Billing(Base):
    __tablename__ = "billings"

    id = Column(Integer, primary_key=True)

    customer_service_id = Column(Integer, ForeignKey("customer_services.id"), nullable=False)
    billing_account_id = Column(Integer, ForeignKey("billing_accounts.id"), nullable=False)

    value = Column(Float, nullable=False)
    due_date = Column(TIMESTAMP, nullable=False)
    paid_at = Column(TIMESTAMP, nullable=True)

    status = Column(Enum(BillingStatus), default=BillingStatus.pending, nullable=False)

    external_id = Column(String, nullable=True)
    barcode = Column(String, nullable=True)
    pdf_url = Column(String, nullable=True)

    created_at = Column(TIMESTAMP, default=datetime.utcnow)
    updated_at = Column(TIMESTAMP, default=datetime.utcnow, onupdate=datetime.utcnow)

    customer_service = relationship("CustomerService", back_populates="billings")
    billing_account = relationship("BillingAccount", backref="billings")
