# app/models/contract.py

from sqlalchemy import Column, Integer, String, TIMESTAMP,Text, Enum as SAEnum
from sqlalchemy.orm import declarative_base
from datetime import datetime
import enum
from app.models.base import Base


class ContractStatus(str, enum.Enum):
    draft = "draft"
    active = "active"
    archived = "archived"

class ContractType(str, enum.Enum):
    PF = "PF"
    PJ = "PJ"
    custom = "custom"

class Contract(Base):
    __tablename__ = "contracts"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(255), nullable=False)
    content = Column(Text, nullable=False)
    status = Column(SAEnum(ContractStatus), default=ContractStatus.draft, nullable=False)
    type = Column(SAEnum(ContractType), nullable=False)
    months = Column(Integer, nullable=False)
    created_at = Column(TIMESTAMP, default=datetime.utcnow)
    updated_at = Column(TIMESTAMP, default=datetime.utcnow, onupdate=datetime.utcnow)
