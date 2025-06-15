from sqlalchemy import Column, Integer, String
from app.models.base import Base

class RadReply(Base):
    __tablename__ = "radreply"

    id = Column(Integer, primary_key=True)
    username = Column(String(64), nullable=False)
    attribute = Column(String(64), nullable=False)
    op = Column(String(2), nullable=False)
    value = Column(String(253), nullable=False)
