from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.exc import IntegrityError
from sqlalchemy import select
from sqlalchemy.orm import selectinload
from sqlalchemy import select
from typing import List, Optional

from app.core.db import get_db
from app.utils.constants import PAYMENT_PROVIDERS
from app.schemas.finance import PaymentProviderOut
from app.models.billing_account import BillingAccount
from app.models.plan import Plan
from app.models.billing import Billing
from app.models import CustomerService
from app.schemas.billing_account import BillingAccountCreate, BillingAccountOut, BillingAccountUpdate
from app.schemas.plan import PlanCreate, PlanUpdate, PlanOut
from app.schemas.billing import BillingCreate, BillingOut


router = APIRouter()

# --------------------- Payment Providers ---------------------

@router.get("/payment_providers", response_model=List[PaymentProviderOut])
async def get_payment_providers():
    return [PaymentProviderOut(id=p.id, label=p.label) for p in PAYMENT_PROVIDERS]

# --------------------- Billing Accounts ---------------------

@router.post("/billing-accounts", response_model=BillingAccountOut)
async def create_billing_account(data: BillingAccountCreate, db: AsyncSession = Depends(get_db)):
    billing_account = BillingAccount(**data.dict())
    db.add(billing_account)
    try:
        await db.commit()
        await db.refresh(billing_account)
    except IntegrityError:
        await db.rollback()
        raise HTTPException(status_code=400, detail="Error creating billing account")
    return BillingAccountOut.from_orm(billing_account)


@router.get("/billing-accounts", response_model=List[BillingAccountOut])
async def list_billing_accounts(db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(BillingAccount))
    return [BillingAccountOut.from_orm(b) for b in result.scalars().all()]


@router.get("/billing-accounts/{billing_account_id}", response_model=BillingAccountOut)
async def get_billing_account(billing_account_id: int, db: AsyncSession = Depends(get_db)):
    billing_account = await db.get(BillingAccount, billing_account_id)
    if not billing_account:
        raise HTTPException(status_code=404, detail="Billing account not found")
    return BillingAccountOut.from_orm(billing_account)


@router.put("/billing-accounts/{billing_account_id}", response_model=BillingAccountOut)
async def update_billing_account(
    billing_account_id: int,
    data: BillingAccountUpdate,  # Agora usa schema de atualização
    db: AsyncSession = Depends(get_db)
):
    billing_account = await db.get(BillingAccount, billing_account_id)
    if not billing_account:
        raise HTTPException(status_code=404, detail="Billing account not found")

    for key, value in data.dict(exclude_unset=True).items():
        setattr(billing_account, key, value)

    try:
        await db.commit()
        await db.refresh(billing_account)
    except IntegrityError:
        await db.rollback()
        raise HTTPException(status_code=400, detail="Error updating billing account")

    return BillingAccountOut.from_orm(billing_account)


@router.patch("/billing-accounts/{billing_account_id}", response_model=BillingAccountOut)
async def update_billing_account_status(
    billing_account_id: int,
    status_payload: dict,  # Alternativa rápida, ou pode criar schema específico
    db: AsyncSession = Depends(get_db)
):
    billing_account = await db.get(BillingAccount, billing_account_id)
    if not billing_account:
        raise HTTPException(status_code=404, detail="Billing account not found")

    new_status = status_payload.get("status")
    if new_status not in ["active", "inactive", "archived"]:
        raise HTTPException(status_code=400, detail="Invalid status value")

    billing_account.status = new_status

    try:
        await db.commit()
        await db.refresh(billing_account)
    except IntegrityError:
        await db.rollback()
        raise HTTPException(status_code=400, detail="Error updating billing account status")

    return BillingAccountOut.from_orm(billing_account)

# --------------------- Plans ---------------------

@router.post("/plans", response_model=PlanOut)
async def create_plan(data: PlanCreate, db: AsyncSession = Depends(get_db)):
    plan = Plan(**data.dict())
    db.add(plan)
    try:
        await db.commit()
        await db.refresh(plan)
    except IntegrityError:
        await db.rollback()
        raise HTTPException(status_code=400, detail="Error creating plan")
    return PlanOut.from_orm(plan)

@router.get("/plans", response_model=List[PlanOut])
async def list_plans(
    name: Optional[str] = Query(None),
    status: Optional[str] = Query(None),
    min_download: Optional[int] = Query(None),
    max_price: Optional[float] = Query(None),
    db: AsyncSession = Depends(get_db),
):
    query = select(Plan)

    if name:
        query = query.where(Plan.name.ilike(f"%{name}%"))
    if status:
        query = query.where(Plan.status == status)
    if min_download is not None:
        query = query.where(Plan.download_speed >= min_download)
    if max_price is not None:
        query = query.where(Plan.price <= max_price)

    result = await db.execute(query)
    return [PlanOut.from_orm(p) for p in result.scalars().all()]


@router.get("/plans/{plan_id}", response_model=PlanOut)
async def get_plan(plan_id: int, db: AsyncSession = Depends(get_db)):
    plan = await db.get(Plan, plan_id)
    if not plan:
        raise HTTPException(status_code=404, detail="Plan not found")
    return PlanOut.from_orm(plan)

@router.put("/plans/{plan_id}", response_model=PlanOut)
async def update_plan(plan_id: int, data: PlanUpdate, db: AsyncSession = Depends(get_db)):
    plan = await db.get(Plan, plan_id)
    if not plan:
        raise HTTPException(status_code=404, detail="Plan not found")

    for field, value in data.dict(exclude_unset=True).items():
        setattr(plan, field, value)

    try:
        await db.commit()
        await db.refresh(plan)
    except IntegrityError:
        await db.rollback()
        raise HTTPException(status_code=400, detail="Error updating plan")
    return PlanOut.from_orm(plan)

# --------------------- Billings ---------------------

@router.post("/billings", response_model=BillingOut)
async def create_billing(data: BillingCreate, db: AsyncSession = Depends(get_db)):
    billing = Billing(**data.dict())
    db.add(billing)
    try:
        await db.commit()
        await db.refresh(billing)
    except IntegrityError:
        await db.rollback()
        raise HTTPException(status_code=400, detail="Error creating billing")
    return BillingOut.from_orm(billing)

@router.get("/billings", response_model=List[BillingOut])
async def list_billings(db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(Billing))
    return [BillingOut.from_orm(b) for b in result.scalars().all()]

@router.get("/billings/{billing_id}", response_model=BillingOut)
async def get_billing(billing_id: int, db: AsyncSession = Depends(get_db)):
    billing = await db.get(Billing, billing_id)
    if not billing:
        raise HTTPException(status_code=404, detail="Billing not found")
    return BillingOut.from_orm(billing)

@router.get("/debug/full-customer-services")
async def get_full_customer_services(db: AsyncSession = Depends(get_db)):
    query = (
        select(CustomerService)
        .options(
            selectinload(CustomerService.customer),
            selectinload(CustomerService.plan).selectinload(Plan.billing_account),
            selectinload(CustomerService.billings),
            selectinload(CustomerService.contracts),
        )
    )
    result = await db.execute(query)
    services = result.scalars().all()

    return [
        {
            "service_id": s.id,
            "status": s.status,
            "login_pppoe": s.login_pppoe,
            "customer": {
                "id": s.customer.id,
                "full_name": s.customer.full_name,
                "email": s.customer.email,
            },
            "plan": {
                "id": s.plan.id,
                "name": s.plan.name,
                "price": s.plan.price,
                "download_speed": s.plan.download_speed,
                "upload_speed": s.plan.upload_speed,
                "billing_account": {
                    "id": s.plan.billing_account.id,
                    "name": s.plan.billing_account.name,
                    "provider": s.plan.billing_account.provider,
                },
            },
            "billings": [
                {
                    "id": b.id,
                    "value": b.value,
                    "due_date": b.due_date,
                    "status": b.status,
                }
                for b in s.billings
            ],
            "contracts": [
                {
                    "id": c.id,
                    "signed_at": c.signed_at,
                    "text_hash": c.text_hash,
                }
                for c in s.contracts
            ],
        }
        for s in services
    ]