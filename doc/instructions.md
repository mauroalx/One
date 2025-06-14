# 📘 Convenções de Desenvolvimento — Backend (One ERP)

Este documento descreve as convenções e o passo a passo padrão para desenvolvimento no backend do projeto **One ERP**, usando **FastAPI**, **SQLAlchemy**, **Alembic** e **PostgreSQL**.

---

## 🧱 Estrutura Padrão

```
app/
├── core/            # Configurações globais, bootstrap
├── models/          # Models do SQLAlchemy
├── schemas/         # Schemas Pydantic (entrada e saída)
├── crud/            # Funções de acesso ao banco
├── api/
│   └── v1/          # Versão 1 das rotas
│       └── routes/  # Rotas organizadas por recurso
├── services/        # Lógica de negócio (opcional)
├── dependencies/    # Depends reutilizáveis
├── utils/           # Funções auxiliares
```

---

## 📦 1. Criando um novo recurso

### 🛠️ 1.1. Model (tabela do banco)

📁 `app/models/<recurso>.py`

```python
from sqlalchemy import Column, Integer, String, ForeignKey
from sqlalchemy.orm import relationship
from app.db.base_class import Base

class Client(Base):
    __tablename__ = "clients"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    owner_id = Column(Integer, ForeignKey("users.id"))

    owner = relationship("User", back_populates="clients")
```

📍 Atualize `app/models/__init__.py`:

```python
from .client import Client
```

---

### 📝 1.2. Schemas Pydantic

📁 `app/schemas/<recurso>.py`

```python
from pydantic import BaseModel

class ClientBase(BaseModel):
    name: str

class ClientCreate(ClientBase):
    pass

class ClientUpdate(ClientBase):
    name: str | None = None

class ClientOut(ClientBase):
    id: int
    class Config:
        orm_mode = True
```

---

### 🔧 1.3. Migration Alembic

1. Após criar/modificar o model:
```bash
alembic revision --autogenerate -m "create clients table"
```

2. Verifique o arquivo gerado em `alembic/versions/`.

3. Aplique com:
```bash
alembic upgrade head
```

---

### 🌐 1.4. Rotas

📁 `app/api/v1/routes/<recurso>.py`

```python
from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.schemas.client import ClientCreate, ClientOut
from app.crud import client as crud
from app.db.session import get_db

router = APIRouter()

@router.post("/", response_model=ClientOut)
def create_client(data: ClientCreate, db: Session = Depends(get_db)):
    return crud.create_client(db, data)
```

📍 Registre no `app/api/v1/api.py`:

```python
from .routes import client
router.include_router(client.router, prefix="/clients", tags=["Clients"])
```

---

### 🧮 1.5. CRUD

📁 `app/crud/<recurso>.py`

```python
from sqlalchemy.orm import Session
from app.models.client import Client
from app.schemas.client import ClientCreate

def create_client(db: Session, obj_in: ClientCreate) -> Client:
    db_obj = Client(**obj_in.dict())
    db.add(db_obj)
    db.commit()
    db.refresh(db_obj)
    return db_obj
```

---

## ✅ Convenções Gerais

| Tipo          | Pasta/Local                    | Nome        | Observações |
|---------------|-------------------------------|-------------|-------------|
| **Model**     | `models/`                      | PascalCase  | Herdar de `Base` |
| **Schema**    | `schemas/`                     | `Base/Create/Update/Out` | `orm_mode = True` |
| **Rota**      | `api/v1/routes/`               | `router`    | Agrupar por entidade |
| **CRUD**      | `crud/`                        | snake_case  | Foco na persistência |
| **Migration** | `alembic revision`             | -           | Revisar antes de aplicar |
| **Importações** | `__init__.py`, `api.py`      | -           | Mantenha tudo registrado |

---

## 🔒 Observações importantes

- **Nunca delete usuários.** Use status (`enabled` / `disabled`) para controle.
- **Roles podem ser deletadas**, mas não se houver usuários vinculados.
- Toda nova entidade deve seguir este fluxo completo: `model → schema → crud → rota → migration`.
- Tenha cuidado ao aplicar `alembic upgrade head` — revise antes!
- **Usuário e role admin** devem ser criados no bootstrap e nunca deletados.

---

## 🚀 Inicializando o Projeto

```bash
git clone https://github.com/<seu-org>/one.git
cd one
docker compose up --build
```
