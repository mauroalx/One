from sqlalchemy import Column, Integer, String
from app.models.base import Base

class RadUserGroup(Base):
    __tablename__ = "radusergroup"

    id = Column(Integer, primary_key=True)
    username = Column(String(64), nullable=False)
    groupname = Column(String(64), nullable=False)
    priority = Column(Integer, default=1)
