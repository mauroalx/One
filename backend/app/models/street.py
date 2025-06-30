# app/models/street.py
from sqlalchemy import Column, Integer, String, ForeignKey, UniqueConstraint
from sqlalchemy.orm import relationship
from app.models.base import Base

class Street(Base):
    __tablename__ = "streets"

    id = Column(Integer, primary_key=True)
    district_id = Column(Integer, ForeignKey("districts.id"), nullable=False)
    name = Column(String, nullable=False)

    district = relationship("District", backref="streets")

    __table_args__ = (
        UniqueConstraint("district_id", "name", name="uq_street_district_name"),
    )
