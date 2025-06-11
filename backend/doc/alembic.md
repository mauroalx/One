# Alembic - Migrations no Projeto One

## Criar uma nova revisão
```bash
alembic revision --autogenerate -m "descrição da mudança"

## Aplicar a revisão
```bash
alembic upgrade head

## Adicionar uma nova tabela

Crie o modelo em app/models/nome.py

Importe-o em app/models/__init__.py

Rode o comando de revisão acima