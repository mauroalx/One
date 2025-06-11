# app/models/user.py

from sqlalchemy import Column, Integer, String, ForeignKey, Enum, DateTime
from sqlalchemy.orm import relationship
from app.models.base import Base
from datetime import datetime
import enum

class UserStatus(enum.Enum):
    enabled = "enabled"
    disabled = "disabled"

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True)
    name = Column(String, nullable=False)
    email = Column(String, nullable=False, unique=True, index=True)
    description = Column(String)
    password = Column(String, nullable=False)  # já espera o hash
    status = Column(Enum(UserStatus), nullable=False, default=UserStatus.enabled)
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    role_id = Column(Integer, ForeignKey("roles.id"))
    role = relationship("Role", back_populates="users")
