# models/radgroupcheck.py
from sqlalchemy import Column, Integer, String
from app.models.base import Base

class RadGroupCheck(Base):
    __tablename__ = "radgroupcheck"

    id = Column(Integer, primary_key=True)
    groupname = Column(String(64), nullable=False)
    attribute = Column(String(64), nullable=False)
    op = Column(String(2), nullable=False, default="==")
    value = Column(String(253), nullable=False)
