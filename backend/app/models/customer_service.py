from sqlalchemy import Column, Integer, String, Enum, ForeignKey, TIMESTAMP
from sqlalchemy.orm import relationship
from datetime import datetime
from app.models.base import Base
import enum

class CustomerServiceStatus(str, enum.Enum):
    active = "active"
    suspended = "suspended"
    canceled = "canceled"

class CustomerService(Base):
    __tablename__ = "customer_services"

    id = Column(Integer, primary_key=True)
    customer_id = Column(Integer, ForeignKey("customers.id"), nullable=False)
    plan_id = Column(Integer, ForeignKey("plans.id"), nullable=False)

    login_pppoe = Column(String, unique=True, nullable=False)
    password_pppoe = Column(String, nullable=False)
    subscriber_password = Column(String, nullable=False)
    description = Column(String)

    status = Column(Enum(CustomerServiceStatus), default=CustomerServiceStatus.active, nullable=False)

    created_at = Column(TIMESTAMP, default=datetime.utcnow)
    updated_at = Column(TIMESTAMP, default=datetime.utcnow, onupdate=datetime.utcnow)

    # Relationships
    customer = relationship("Customer", back_populates="services")
    plan = relationship("Plan", backref="customer_services")
    contracts = relationship("CustomerContract", back_populates="customer_service")
    billings = relationship("Billing", back_populates="customer_service")
    address = relationship("CustomerAddress", back_populates="customer_service", uselist=False, cascade="all, delete")