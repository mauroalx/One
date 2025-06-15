# app/models/radippool.py
from sqlalchemy import Column, Integer, String, DateTime, Boolean
from app.models.base import Base

class RadIpPool(Base):
    __tablename__ = "radippool"

    id = Column(Integer, primary_key=True, index=True)
    pool_name = Column(String(64), nullable=False, index=True)
    framedipaddress = Column(String(15), nullable=False, unique=True)
    nasipaddress = Column(String(15), nullable=True)
    calledstationid = Column(String(30), nullable=True)
    callingstationid = Column(String(30), nullable=True)
    expiry_time = Column(DateTime, nullable=True)
    username = Column(String(64), nullable=True)
    pool_key = Column(String(30), nullable=True)
    alive = Column(Boolean, default=True)
