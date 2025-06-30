from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from app.models import User, Role, UserStatus, State, City
from app.utils.constants import STATES, load_all_cities
from datetime import datetime
import bcrypt

ADMIN_ROLE_NAME = "Admin"
ADMIN_USER_EMAIL = "admin@one.local"

async def bootstrap(db: AsyncSession):
    print("🔧 Bootstrap iniciado")

    # Verifica se a role admin já existe
    print("🔍 Verificando se a role Admin já existe...")
    result = await db.execute(select(Role).where(Role.name == ADMIN_ROLE_NAME))
    role = result.scalars().first()

    if role:
        print("✅ Role Admin já existe:", role.id)
    else:
        print("➕ Criando role Admin...")
        role = Role(
            name=ADMIN_ROLE_NAME,
            description="Administrador do sistema",
            permissions={
                "admin": {"*": True},
            }
        )
        db.add(role)
        await db.commit()
        await db.refresh(role)
        print("✅ Role Admin criada com ID:", role.id)

    # Verifica se o usuário admin já existe
    print("🔍 Verificando se o usuário admin@one.local já existe...")
    result = await db.execute(select(User).where(User.email == ADMIN_USER_EMAIL))
    user = result.scalars().first()

    if user:
        print("✅ Usuário Admin já existe:", user.id)
    else:
        print("➕ Criando usuário Admin...")
        hashed_pw = bcrypt.hashpw("admin123".encode(), bcrypt.gensalt()).decode()
        user = User(
            name="Administrador",
            email=ADMIN_USER_EMAIL,
            description="Usuário master do sistema",
            password=hashed_pw,
            status=UserStatus.enabled,
            created_at=datetime.utcnow(),
            updated_at=datetime.utcnow(),
            role_id=role.id
        )
        db.add(user)
        await db.commit()
        await db.refresh(user)
        print("✅ Usuário Admin criado com ID:", user.id)

    # Estados
    print("🌍 Verificando estados...")
    for state in STATES:
        result = await db.execute(select(State).where(State.acronym == state.acronym))
        existing = result.scalar_one_or_none()
        if not existing:
            db.add(State(name=state.name, acronym=state.acronym))
    await db.commit()
    print("✅ Estados verificados/inseridos.")


    # Cidades
    print("🏙️ Verificando cidades...")
    cities_data = load_all_cities()

    ## Mapeia os estados já inseridos
    result = await db.execute(select(State))
    states = result.scalars().all()
    state_map = {s.acronym: s for s in states}

    ## Verifica se a tabela já tem alguma cidade
    result = await db.execute(select(City.id).limit(1))
    existing_city = result.scalar_one_or_none()

    if existing_city:
        print("✅ Cidades já estão inseridas, ignorando.")
    else:
        insert_count = 0
        for city in cities_data:
            state = state_map.get(city.state_acronym)
            if state:
                # Verifica se já existe cidade com esse nome e estado
                result = await db.execute(
                    select(City)
                    .where(City.name == city.city_name, City.state_id == state.id)
                )
                existing = result.scalar_one_or_none()
                if not existing:
                    db.add(City(name=city.city_name, state_id=state.id))
                    insert_count += 1

        await db.commit()
        print(f"✅ Inseridas {insert_count} cidades com sucesso.")


    print("✅ Bootstrap finalizado com sucesso")
