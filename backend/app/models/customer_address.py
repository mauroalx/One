# app/models/customer_address.py
from sqlalchemy import Column, Integer, String, ForeignKey
from sqlalchemy.orm import relationship
from app.models.base import Base

class CustomerAddress(Base):
    __tablename__ = "customer_addresses"

    id = Column(Integer, primary_key=True)

    customer_service_id = Column(Integer, ForeignKey("customer_services.id"), nullable=False)

    state = Column(String(2), nullable=False)  # ex: "CE"
    city = Column(String, nullable=False)
    neighborhood = Column(String, nullable=False)
    street = Column(String, nullable=False)
    zipcode = Column(String, nullable=False)
    number = Column(String, nullable=False)
    complement = Column(String)
    reference = Column(String)

    customer_service = relationship("CustomerService", back_populates="address")
