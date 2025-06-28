import tempfile
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from sqlalchemy.exc import IntegrityError
from fastapi.responses import FileResponse
from app.core.db import get_db
from app.models.contract import Contract
from app.models.customer_contract import CustomerContract
from app.models.customer_service import CustomerService
from app.models.plan import Plan
from app.schemas.contract import (
    ContractCreate, ContractUpdate, ContractOut
)
from app.schemas.customer_contract import (
    CustomerContractCreate, CustomerContractOut, CustomerContractUpdateSignedAt, CustomerContractFullOut
)
from typing import List

router = APIRouter()

# CRUD - Contratos Modelos
@router.post("/", response_model=ContractOut)
async def create_contract(contract_data: ContractCreate, db: AsyncSession = Depends(get_db)):
    contract = Contract(**contract_data.dict())
    db.add(contract)
    try:
        await db.commit()
        await db.refresh(contract)
    except IntegrityError:
        await db.rollback()
        raise HTTPException(status_code=400, detail="Error creating contract")
    return ContractOut.from_orm(contract)

@router.get("/", response_model=List[ContractOut])
async def list_contracts(db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(Contract))
    contracts = result.scalars().all()
    return [ContractOut.from_orm(c) for c in contracts]

@router.get("/{contract_id}", response_model=ContractOut)
async def get_contract(contract_id: int, db: AsyncSession = Depends(get_db)):
    contract = await db.get(Contract, contract_id)
    if not contract:
        raise HTTPException(status_code=404, detail="Contract not found")
    return ContractOut.from_orm(contract)

@router.put("/{contract_id}", response_model=ContractOut)
async def update_contract(contract_id: int, contract_data: ContractUpdate, db: AsyncSession = Depends(get_db)):
    contract = await db.get(Contract, contract_id)
    if not contract:
        raise HTTPException(status_code=404, detail="Contract not found")

    for field, value in contract_data.dict(exclude_unset=True).items():
        setattr(contract, field, value)

    try:
        await db.commit()
        await db.refresh(contract)
    except IntegrityError:
        await db.rollback()
        raise HTTPException(status_code=400, detail="Error updating contract")
    return ContractOut.from_orm(contract)

# CRUD - Customer Contracts (imutável)
@router.post("/customer/", response_model=CustomerContractOut)
async def create_customer_contract(contract_data: CustomerContractCreate, db: AsyncSession = Depends(get_db)):
    contract = CustomerContract(**contract_data.dict())
    db.add(contract)
    try:
        await db.commit()
        await db.refresh(contract)
    except IntegrityError:
        await db.rollback()
        raise HTTPException(status_code=400, detail="Error creating customer contract")
    return CustomerContractOut.from_orm(contract)

@router.get("/customer/{customer_id}", response_model=List[CustomerContractFullOut])
async def list_contracts_by_customer(
    customer_id: int,
    db: AsyncSession = Depends(get_db)
):
    stmt = (
        select(
            CustomerContract,
            CustomerService.login_pppoe,
            Plan.name.label("plan_name")
        )
        .join(CustomerService, CustomerContract.customer_service_id == CustomerService.id)
        .join(Plan, CustomerService.plan_id == Plan.id)
        .where(CustomerService.customer_id == customer_id)
    )

    result = await db.execute(stmt)
    rows = result.all()

    return [
        CustomerContractFullOut(
            **row[0].__dict__,  # CustomerContract fields
            login_pppoe=row.login_pppoe,
            plan_name=row.plan_name,
        )
        for row in rows
    ]

@router.get("/customer/{contract_id}", response_model=CustomerContractOut)
async def get_customer_contract(contract_id: int, db: AsyncSession = Depends(get_db)):
    contract = await db.get(CustomerContract, contract_id)
    if not contract:
        raise HTTPException(status_code=404, detail="Customer contract not found")
    return CustomerContractOut.from_orm(contract)

@router.patch("/customer/{contract_id}/sign", response_model=CustomerContractOut)
async def sign_customer_contract(
    contract_id: int,
    data: CustomerContractUpdateSignedAt,
    db: AsyncSession = Depends(get_db)
):
    contract = await db.get(CustomerContract, contract_id)
    if not contract:
        raise HTTPException(status_code=404, detail="Customer contract not found")

    contract.signed_at = data.signed_at

    await db.commit()
    await db.refresh(contract)
    return CustomerContractOut.from_orm(contract)

# Download customer contract
@router.get("/{contract_id}/download")
async def download_contract(contract_id: int, db: AsyncSession = Depends(get_db)):
    contract = await db.get(CustomerContract, contract_id)
    if not contract:
        raise HTTPException(status_code=404, detail="Contrato não encontrado")

    # Criar arquivo temporário em diretório do sistema
    with tempfile.NamedTemporaryFile("w", delete=False, suffix=".docx") as tmp:
        tmp.write(contract.final_text)
        tmp_path = tmp.name  # caminho completo do arquivo criado

    return FileResponse(
        tmp_path,
        filename=f"Contrato_{contract_id}.docx",
        media_type="application/vnd.openxmlformats-officedocument.wordprocessingml.document"
    )