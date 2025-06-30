# app/models/state.py
from sqlalchemy import Column, Integer, String
from app.models.base import Base

class State(Base):
    __tablename__ = "states"

    id = Column(Integer, primary_key=True)
    name = Column(String, nullable=False, unique=True)
    acronym = Column(String(2), nullable=False, unique=True)  # ex: "CE", "SP"
