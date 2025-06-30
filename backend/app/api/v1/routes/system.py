from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.exc import IntegrityError
from sqlalchemy.orm import joinedload
from sqlalchemy import select, join
from app.core.db import get_db
from app.models import District, Street, City
from app.models import State, City
from app.schemas.state import StateOut
from app.schemas.city import CityOut
from app.schemas.district import DistrictCreate, DistrictUpdate, DistrictOut
from app.schemas.street import StreetCreate, StreetUpdate, StreetOut, StreetJoinedOut
from typing import List, Optional

router = APIRouter()

# --------------------- Bairros ---------------------

@router.post("/districts", response_model=DistrictOut)
async def create_neighborhood(
    data: DistrictCreate,
    db: AsyncSession = Depends(get_db)
):
    neighborhood = District(**data.dict())
    db.add(neighborhood)
    try:
        await db.commit()
        await db.refresh(neighborhood)
        return DistrictOut.from_orm(neighborhood)
    except IntegrityError:
        await db.rollback()
        raise HTTPException(status_code=400, detail="Districts already exists")

@router.get("/districts", response_model=List[DistrictOut])
async def list_neighborhoods(
    city_id: Optional[int] = Query(None),
    db: AsyncSession = Depends(get_db)
):
    query = select(District)
    if city_id:
        query = query.where(District.city_id == city_id)
    result = await db.execute(query)
    return [DistrictOut.from_orm(n) for n in result.scalars().all()]

@router.put("/districts/{district_id}", response_model=DistrictOut)
async def update_neighborhood(
    district_id: int,
    data: DistrictUpdate,
    db: AsyncSession = Depends(get_db)
):
    district = await db.get(District, district_id)
    if not district:
        raise HTTPException(status_code=404, detail="District not found")

    for field, value in data.dict(exclude_unset=True).items():
        setattr(district, field, value)

    try:
        await db.commit()
        await db.refresh(district)
        return DistrictOut.from_orm(district)
    except IntegrityError:
        await db.rollback()
        raise HTTPException(status_code=400, detail="Error updating District")
    
@router.delete("/districts/{district_id}")
async def delete_district(
    district_id: int,
    db: AsyncSession = Depends(get_db)
):
    district = await db.get(District, district_id)
    if not district:
        raise HTTPException(status_code=404, detail="District not found")

    # Opcional: impedir remoção se houver ruas associadas
    streets = await db.execute(
        select(Street).where(Street.district_id == district_id)
    )
    if streets.scalars().all():
        raise HTTPException(status_code=400, detail="Cannot delete district with associated streets")

    await db.delete(district)
    await db.commit()


# --------------------- Ruas ---------------------

@router.post("/streets", response_model=StreetOut)
async def create_street(
    data: StreetCreate,
    db: AsyncSession = Depends(get_db)
):
    street = Street(**data.dict())
    db.add(street)
    try:
        await db.commit()
        await db.refresh(street)
        return StreetOut.from_orm(street)
    except IntegrityError:
        await db.rollback()
        raise HTTPException(status_code=400, detail="Street already exists")
    
@router.get("/streets", response_model=List[StreetJoinedOut])
async def list_streets(
    state_id: Optional[int] = Query(None),
    city_id: Optional[int] = Query(None),
    district_id: Optional[int] = Query(None),
    db: AsyncSession = Depends(get_db),
):
    query = (
        select(Street)
        .join(District)
        .join(City, District.city_id == City.id)
        .join(State, City.state_id == State.id)
        .options(
            joinedload(Street.district).joinedload(District.city).joinedload(City.state)
        )
    )

    if district_id:
        query = query.where(Street.district_id == district_id)
    elif city_id:
        query = query.where(District.city_id == city_id)
    elif state_id:
        query = query.where(City.state_id == state_id)

    result = await db.execute(query)
    streets = result.scalars().all()

    response = []
    for street in streets:
        district = street.district
        city = district.city
        state = city.state

        response.append(StreetJoinedOut(
            id=street.id,
            name=street.name,
            district=district.name,
            district_id=district.id,
            zipcode=district.zipcode,
            city=city.name,
            city_id=city.id,
            state=state.acronym,
            state_id=state.id
        ))

    return response

@router.put("/streets/{street_id}", response_model=StreetOut)
async def update_street(
    street_id: int,
    data: StreetUpdate,
    db: AsyncSession = Depends(get_db)
):
    
    # print("Payload recebido:", data.dict())
    street = await db.get(Street, street_id)
    if not street:
        raise HTTPException(status_code=404, detail="Street not found")

    # Atualiza a rua
    for field, value in data.dict(exclude={"district_name", "zipcode"}, exclude_unset=True).items():
        setattr(street, field, value)

    # Atualiza o bairro, se solicitado
    if data.district_id and (data.district_name or data.zipcode):
        district = await db.get(District, data.district_id)
        if not district:
            raise HTTPException(status_code=404, detail="District not found")

        if data.district_name:
            district.name = data.district_name
        if data.zipcode:
            district.zipcode = data.zipcode

    try:
        await db.commit()
        await db.refresh(street)
        return StreetOut.from_orm(street)
    except IntegrityError:
        await db.rollback()
        raise HTTPException(status_code=400, detail="Error updating street")
# Estados

@router.get("/states", response_model=List[StateOut])
async def list_states(db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(State).order_by(State.name))
    return [StateOut.from_orm(s) for s in result.scalars().all()]

# Cidades

@router.get("/cities", response_model=List[CityOut])
async def list_cities(
    state_id: Optional[int] = Query(None),
    db: AsyncSession = Depends(get_db)
):
    query = select(City)
    if state_id:
        query = query.where(City.state_id == state_id)
    result = await db.execute(query.order_by(City.name))
    return [CityOut.from_orm(c) for c in result.scalars().all()]