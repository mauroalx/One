from logging.config import fileConfig
from sqlalchemy import pool
from sqlalchemy import engine_from_config
from alembic import context

import os
import sys

# Adiciona o diretório raiz à importação para conseguir acessar os módulos
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))

# Importa settings e modelos
from app.core.config import settings
from app.models import Base  # Base = declarative_base()

# Alembic Config object
config = context.config

# Seta a URL dinâmica do banco (substitui asyncpg por psycopg2 para Alembic funcionar)
config.set_main_option(
    "sqlalchemy.url",
    settings.DATABASE_URL.replace("asyncpg", "psycopg2")
)

# Logging
if config.config_file_name is not None:
    fileConfig(config.config_file_name)

# Define os metadados para o autogenerate funcionar
target_metadata = Base.metadata


def run_migrations_offline():
    """Executa as migrações em modo offline."""
    url = config.get_main_option("sqlalchemy.url")
    context.configure(
        url=url,
        target_metadata=target_metadata,
        literal_binds=True,
        dialect_opts={"paramstyle": "named"},
    )

    with context.begin_transaction():
        context.run_migrations()


def run_migrations_online():
    """Executa as migrações em modo online."""
    connectable = engine_from_config(
        config.get_section(config.config_ini_section),
        prefix="sqlalchemy.",
        poolclass=pool.NullPool,
    )

    with connectable.connect() as connection:
        context.configure(
            connection=connection,
            target_metadata=target_metadata,
        )

        with context.begin_transaction():
            context.run_migrations()


if context.is_offline_mode():
    run_migrations_offline()
else:
    run_migrations_online()
