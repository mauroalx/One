import hashlib
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from datetime import datetime
from app.models import (
    BillingAccount, Plan, CustomerService, Billing,
    BillingAccountStatus, PlanStatus, CustomerServiceStatus, BillingStatus,
    Customer, Contract, ContractType, ContractStatus, CustomerContract
)
import random
from faker import Faker

faker = Faker('pt_BR')  # importante usar o locale do Brasil

async def run_seeders(db: AsyncSession):
    print("🌱 Rodando seeders (dados de desenvolvimento)...")

    # Seed de Contracts
    result = await db.execute(select(Contract))
    contracts = result.scalars().first()

    if not contracts:
        print("➕ Inserindo contratos de exemplo")
        for i in range(3):
            contract = Contract(
                name=f"Contrato Base {i+1}",
                type=random.choice(list(ContractType)),
                months=random.choice([12, 24, 36]),
                content=f"<p>{faker.text(max_nb_chars=100)}</p>",
                status=ContractStatus.draft,
                created_at=datetime.utcnow(),
                updated_at=datetime.utcnow()
            )
            db.add(contract)
        await db.commit()

    # Seed de Customers
    result = await db.execute(select(Customer))
    customers = result.scalars().first()

    if not customers:
        print("➕ Inserindo clientes de exemplo")
        for _ in range(5):
            customer = Customer(
                type="company",
                full_name=faker.company(),
                trade_name=faker.company_suffix(),
                legal_name=f"{faker.company()} {faker.company_suffix()}",
                document=faker.cnpj(),
                email=faker.company_email(),
                phone=faker.phone_number(),
                mobile1=faker.cellphone_number(),
                mobile2=faker.cellphone_number(),
                fax=faker.phone_number(),
                address_street=faker.street_name(),
                address_number=str(faker.building_number()),
                address_complement=f"Sala {random.randint(1, 10)}",
                address_neighborhood=faker.bairro(),
                address_city=faker.city(),
                address_state=faker.estado_sigla(),
                address_zipcode=faker.postcode().replace("-", ""),
                created_at=datetime.utcnow(),
                updated_at=datetime.utcnow()
            )
            db.add(customer)
        await db.commit()


    # Seed de BillingAccounts
    result = await db.execute(select(BillingAccount))
    billing_accounts = result.scalars().all()

    if not billing_accounts:
        print("➕ Inserindo contas de cobrança de exemplo")
        for name in ["Asaas Principal", "Gerencianet Teste"]:
            ba = BillingAccount(
                name=name,
                provider="asaas" if "Asaas" in name else "gerencianet",
                fine_percent=2.0,
                fine_type="daily",
                interest_percent=1.0,
                interest_type="monthly",
                status=BillingAccountStatus.active,
                created_at=datetime.utcnow(),
                updated_at=datetime.utcnow()
            )
            db.add(ba)
        await db.commit()

    # Seed de Plans
    result = await db.execute(select(Plan))
    plans = result.scalars().all()

    if not plans:
        print("➕ Inserindo planos de exemplo")
        result = await db.execute(select(BillingAccount))
        billing_accounts = result.scalars().all()
        for i in range(3):
            plan = Plan(
                billing_account_id=random.choice(billing_accounts).id,
                name=f"Plano {i+1} - Fibra {200 + i*100} Mbps",
                description=faker.sentence(nb_words=6),
                price=99.90 + i * 20,
                download_speed=200 + i*100,
                upload_speed=100 + i*50,
                auto_block=1,
                status=PlanStatus.active,
                created_at=datetime.utcnow(),
                updated_at=datetime.utcnow()
            )
            db.add(plan)
        await db.commit()

    # Seed de CustomerServices
    result = await db.execute(select(CustomerService))
    services = result.scalars().all()

    if not services:
        print("➕ Inserindo serviços para clientes")
        result = await db.execute(select(Customer))
        customers = result.scalars().all()
        result = await db.execute(select(Plan))
        plans = result.scalars().all()

        for customer in customers:
            for i in range(1, 3):  # Cada cliente com 1 ou 2 serviços
                service = CustomerService(
                    customer_id=customer.id,
                    plan_id=random.choice(plans).id,
                    login_pppoe=f"{customer.id}user{i}",
                    password_pppoe="senha123",
                    subscriber_password="central123",
                    description=f"Serviço {i} para {customer.full_name}",
                    status=CustomerServiceStatus.active,
                    created_at=datetime.utcnow(),
                    updated_at=datetime.utcnow()
                )
                db.add(service)
        await db.commit()

    # Seed de Billings
    result = await db.execute(select(Billing))
    billings = result.scalars().all()

    if not billings:
        print("➕ Inserindo faturas de exemplo")
        result = await db.execute(select(CustomerService))
        services = result.scalars().all()
        result = await db.execute(select(BillingAccount))
        billing_accounts = result.scalars().all()

        for service in services:
            for m in range(1, 4):  # 3 faturas por serviço
                billing = Billing(
                    customer_service_id=service.id,
                    billing_account_id=random.choice(billing_accounts).id,
                    value=129.90,
                    due_date=datetime.utcnow().replace(day=1).replace(month=m),
                    paid_at=None,
                    status=BillingStatus.pending,
                    external_id=faker.uuid4(),
                    barcode=faker.ean(length=13),
                    pdf_url=f"https://example.com/boleto/{faker.uuid4()}",
                    created_at=datetime.utcnow(),
                    updated_at=datetime.utcnow()
                )
                db.add(billing)
        await db.commit()

    # Seed de CustomerContracts
    result = await db.execute(select(CustomerContract))
    existing_contract = result.scalars().first()

    if not existing_contract:
        print("➕ Inserindo contratos assinados de clientes")
        result = await db.execute(select(CustomerService))
        services = result.scalars().all()

        for service in services:
            final_text = f"Contrato de prestação de serviço para {service.login_pppoe} gerado em {datetime.utcnow().date()}"
            contract = CustomerContract(
                customer_service_id=service.id,
                final_text=final_text,
                text_hash=hashlib.sha256(final_text.encode()).hexdigest(),
                signed_at=datetime.utcnow(),
                created_at=datetime.utcnow(),
                updated_at=datetime.utcnow()
            )
            db.add(contract)
        await db.commit()    

    print("✅ Seeders concluído")
