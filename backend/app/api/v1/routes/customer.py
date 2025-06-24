from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from sqlalchemy.exc import IntegrityError
from app.core.db import get_db
from app.models import Customer
from app.schemas.customer import CustomerCreate, CustomerOut, CustomerUpdate
from app.schemas.response import ErrorResponse
from app.core.decorators import require_auth
from typing import Optional, List

router = APIRouter()


@router.post("/", response_model=CustomerOut, responses={
    400: {"model": ErrorResponse, "description": "Validation or duplicate error"}
})
async def create_customer(
    customer_data: CustomerCreate, 
    # user=require_auth(), 
    db: AsyncSession = Depends(get_db)
):
    customer = Customer(**customer_data.dict())
    db.add(customer)

    try:
        await db.commit()
        await db.refresh(customer)
    except IntegrityError:
        await db.rollback()
        raise HTTPException(status_code=400, detail="Document or email already exists")

    return CustomerOut.from_orm(customer)


@router.put("/{customer_id}", response_model=CustomerOut, responses={
    404: {"model": ErrorResponse, "description": "Customer not found"},
    400: {"model": ErrorResponse, "description": "Validation or duplicate error"}
})
async def update_customer(
    customer_id: int,
    customer_data: CustomerUpdate,
    user=require_auth(),
    db: AsyncSession = Depends(get_db)
):
    customer = await db.get(Customer, customer_id)
    if not customer:
        raise HTTPException(status_code=404, detail="Customer not found")

    for field, value in customer_data.dict(exclude_unset=True).items():
        setattr(customer, field, value)

    try:
        await db.commit()
        await db.refresh(customer)
    except IntegrityError:
        await db.rollback()
        raise HTTPException(status_code=400, detail="Document or email already in use")

    return CustomerOut.from_orm(customer)


@router.get("/{customer_id}", response_model=CustomerOut, responses={
    404: {"model": ErrorResponse, "description": "Customer not found"}
})
async def get_customer(
    customer_id: int, 
    user=require_auth(),
    db: AsyncSession = Depends(get_db)
):
    customer = await db.get(Customer, customer_id)
    if not customer:
        raise HTTPException(status_code=404, detail="Customer not found")

    return CustomerOut.from_orm(customer)

@router.get("/", response_model=List[CustomerOut])
async def list_customers(
    user=require_auth(),
    db: AsyncSession = Depends(get_db),
    full_name: Optional[str] = Query(None),
    document: Optional[str] = Query(None),
    email: Optional[str] = Query(None),
    limit: int = Query(50, ge=1, le=200)  # <= limite de segurança
):
    query = select(Customer)

    if full_name:
        query = query.where(Customer.full_name.ilike(f"%{full_name}%"))
    if document:
        query = query.where(Customer.document == document)
    if email:
        query = query.where(Customer.email.ilike(f"%{email}%"))

    query = query.limit(limit)

    result = await db.execute(query)
    customers = result.scalars().all()

    return [CustomerOut.from_orm(c) for c in customers]
