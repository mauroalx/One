from sqlalchemy import Column, Integer, String
from app.models.base import Base

class RadCheck(Base):
    __tablename__ = "radcheck"

    id = Column(Integer, primary_key=True)
    username = Column(String(64), nullable=False)
    attribute = Column(String(64), nullable=False, default='Cleartext-Password')
    op = Column(String(2), nullable=False, default=':=')
    value = Column(String(253), nullable=False)
