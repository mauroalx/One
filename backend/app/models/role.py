# app/models/role.py
from sqlalchemy import Column, Integer, String, JSON
from sqlalchemy.orm import relationship
from app.models.base import Base

class Role(Base):
    __tablename__ = "roles"

    id = Column(Integer, primary_key=True)
    name = Column(String, nullable=False, unique=True)
    description = Column(String)
    permissions = Column(JSON, nullable=False)

    # reverse relation
    users = relationship("User", back_populates="role")
