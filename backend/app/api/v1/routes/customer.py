from fastapi import APIRouter, Depends, HTTPException, Query
import traceback
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from sqlalchemy.exc import IntegrityError
from sqlalchemy.orm import selectinload
from datetime import datetime
import hashlib
from app.core.db import get_db
from app.models import Customer, CustomerService, CustomerContract, Contract
from app.schemas.customer import CustomerCreate, CustomerOut, CustomerUpdate
from app.schemas.customer_service import CustomerServiceCreate, CustomerServiceOut
from app.schemas.response import ErrorResponse
from app.core.decorators import require_auth
from typing import Optional, List


router = APIRouter()

# --------------------- Clientes ---------------------

@router.post("/", response_model=CustomerOut, responses={
    400: {"model": ErrorResponse, "description": "Validation or duplicate error"}
})
async def create_customer(
    customer_data: CustomerCreate, 
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
    limit: int = Query(50, ge=1, le=200)
):
    query = select(Customer)
    if full_name:
        query = query.where(Customer.full_name.ilike(f"%{full_name}%"))
    if document:
        query = query.where(Customer.document == document)
    if email:
        query = query.where(Customer.email.ilike(f"%{email}%"))
    result = await db.execute(query.limit(limit))
    return [CustomerOut.from_orm(c) for c in result.scalars().all()]

# --------------------- Serviços do Cliente ---------------------

@router.post("/services", response_model=CustomerServiceOut)
async def create_customer_service(
    data: CustomerServiceCreate,
    db: AsyncSession = Depends(get_db)
):
    try:
        # 1. Criar serviço do cliente
        service = CustomerService(**data.dict(exclude={"contract_id"}))
        db.add(service)
        await db.flush()  # Garante que `service.id` estará disponível

        # 2. Buscar contrato base
        contract = await db.get(Contract, data.contract_id)
        if not contract:
            raise HTTPException(status_code=404, detail="Contrato base não encontrado")

        # 3. Gerar hash e salvar CustomerContract
        final_text = contract.content  # Pode gerar dinamicamente com dados do cliente
        text_hash = hashlib.sha256(final_text.encode()).hexdigest()

        customer_contract = CustomerContract(
            customer_service_id=service.id,
            final_text=final_text,
            text_hash=text_hash,
            signed_at=None,
            created_at=datetime.utcnow(),
            updated_at=datetime.utcnow()
        )
        db.add(customer_contract)

        # 4. Finalizar
        await db.commit()
        await db.refresh(service)

        return CustomerServiceOut.from_orm(service)

    except IntegrityError:
        await db.rollback()
        raise HTTPException(status_code=400, detail="Erro ao criar serviço do cliente")

    except Exception as e:
        await db.rollback()
        raise HTTPException(status_code=500, detail=str(e))



@router.get("/{customer_id}/services", response_model=List[CustomerServiceOut])
async def list_customer_services_by_customer(
    customer_id: int,
    db: AsyncSession = Depends(get_db)
):
    stmt = select(CustomerService).options(
        selectinload(CustomerService.plan),
        selectinload(CustomerService.contracts),
    )
    if customer_id:
        stmt = stmt.where(CustomerService.customer_id == customer_id)
    result = await db.execute(stmt)
    return [CustomerServiceOut.from_orm(s) for s in result.scalars().all()]

@router.get("/services/{service_id}", response_model=CustomerServiceOut)
async def get_customer_service(
    service_id: int,
    db: AsyncSession = Depends(get_db)
):
    service = await db.get(CustomerService, service_id)
    if not service:
        raise HTTPException(status_code=404, detail="Customer service not found")
    return CustomerServiceOut.from_orm(service)
