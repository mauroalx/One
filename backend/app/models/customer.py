from sqlalchemy import Column, Integer, String, DateTime, Enum
from sqlalchemy.orm import relationship
from datetime import datetime
from app.models.base import Base
import enum

class CustomerType(enum.Enum):
    individual = "individual"  # Pessoa Física
    company = "company"        # Pessoa Jurídica

class Customer(Base):
    __tablename__ = "customers"

    id = Column(Integer, primary_key=True)

    type = Column(Enum(CustomerType), nullable=False, default=CustomerType.individual)

    full_name = Column(String, nullable=False)
    trade_name = Column(String)
    legal_name = Column(String)
    document = Column(String, nullable=False, unique=True, index=True)

    rg = Column(String)
    mother_name = Column(String)
    father_name = Column(String)

    email = Column(String, nullable=False)
    phone = Column(String)
    mobile1 = Column(String)
    mobile2 = Column(String)
    fax = Column(String)

    address_street = Column(String, nullable=False)
    address_number = Column(String, nullable=False)
    address_complement = Column(String)
    address_neighborhood = Column(String, nullable=False)
    address_city = Column(String, nullable=False)
    address_state = Column(String, nullable=False)
    address_zipcode = Column(String, nullable=False)

    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    services = relationship("CustomerService", back_populates="customer")