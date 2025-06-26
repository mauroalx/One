from sqlalchemy import Column, Integer, Text, TIMESTAMP, ForeignKey
from sqlalchemy.orm import relationship
from datetime import datetime
from app.models.base import Base

class CustomerContract(Base):
    __tablename__ = "customer_contracts"

    id = Column(Integer, primary_key=True, index=True)
    customer_service_id = Column(Integer, ForeignKey("customer_services.id"), nullable=False)

    final_text = Column(Text, nullable=False)
    text_hash = Column(Text, nullable=False)
    signed_at = Column(TIMESTAMP(timezone=True), nullable=True)

    created_at = Column(TIMESTAMP, default=datetime.utcnow)
    updated_at = Column(TIMESTAMP, default=datetime.utcnow, onupdate=datetime.utcnow)

    customer_service = relationship("CustomerService", back_populates="contracts")
