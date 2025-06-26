# backend/app/main.py
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.middlewares.extract_user import ExtractUserMiddleware
from app.api import api_router
from app.core.db import get_db
from app.core.bootstrap import bootstrap
from app.core.seeders import run_seeders   
from app.core.config import settings  # seu settings já lê do .env
import asyncio

app = FastAPI(title="One ERP")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # ou ["http://localhost:3000", "http://172.26.49.83:3000"]
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
app.add_middleware(ExtractUserMiddleware)
app.include_router(api_router)



@app.on_event("startup")
async def on_startup():
    async for db in get_db():
        await bootstrap(db)
        
        if settings.AUTO_POPULATE:
            await run_seeders(db)
        break