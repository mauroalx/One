# models/radgroupreply.py
from sqlalchemy import Column, Integer, String
from app.models.base import Base

class RadGroupReply(Base):
    __tablename__ = "radgroupreply"

    id = Column(Integer, primary_key=True)
    groupname = Column(String(64), nullable=False)
    attribute = Column(String(64), nullable=False)
    op = Column(String(2), nullable=False, default="==")
    value = Column(String(253), nullable=False)
