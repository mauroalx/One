from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from app.models import User, Role, UserStatus
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
                "geral": {"*": True},
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

    print("✅ Bootstrap finalizado com sucesso")
