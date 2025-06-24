# app/models/customer_contract.py

from sqlalchemy import Column, Integer, String, TIMESTAMP,Text, Enum as SAEnum
from datetime import datetime
from app.models.base import Base


class CustomerContract(Base):
    __tablename__ = "customer_contracts"

    id = Column(Integer, primary_key=True, index=True)
    customer_service_id = Column(Integer, nullable=False)  # FK futura (por enquanto solto)
    final_text = Column(Text, nullable=False)
    text_hash = Column(Text, nullable=False)
    signed_at = Column(TIMESTAMP(timezone=True), nullable=True)
    created_at = Column(TIMESTAMP, default=datetime.utcnow)
    updated_at = Column(TIMESTAMP, default=datetime.utcnow, onupdate=datetime.utcnow)
