from sqlalchemy import Column, Integer, String, TIMESTAMP, func
from app.models.base import Base

class RadPostAuth(Base):
    __tablename__ = "radpostauth"

    id = Column(Integer, primary_key=True)
    username = Column(String(64), nullable=False)
    pass_field = Column("pass", String(64), nullable=False)  # 'pass' é palavra reservada em Python
    reply = Column(String(32), nullable=False)
    authdate = Column(TIMESTAMP, nullable=False, server_default=func.now())
