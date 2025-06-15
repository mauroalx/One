from sqlalchemy import Column, Integer, String
from app.models.base import Base

class Nas(Base):
    __tablename__ = "nas"

    id = Column(Integer, primary_key=True)
    nasname = Column(String(128), nullable=False)  # IP ou hostname do NAS
    shortname = Column(String(32))
    type = Column(String(30), default='other')
    ports = Column(Integer)
    secret = Column(String(60), nullable=False)
    server = Column(String(64))
    community = Column(String(50))
    description = Column(String(200))
