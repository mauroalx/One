# app/models/district.py
from sqlalchemy import Column, Integer, String, ForeignKey, UniqueConstraint
from sqlalchemy.orm import relationship
from app.models.base import Base

class District(Base):
    __tablename__ = "districts"

    id = Column(Integer, primary_key=True)
    state_id = Column(Integer, ForeignKey("states.id"), nullable=False)
    city_id = Column(Integer, ForeignKey("cities.id"), nullable=False)
    name = Column(String, nullable=False)
    zipcode = Column(String, nullable=False)

    city = relationship("City", backref="districts")
    state = relationship("State", backref="districts")

    __table_args__ = (
        UniqueConstraint("city_id", "name", name="uq_district_city_name"),
    )
