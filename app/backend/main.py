import uvicorn
import logging
from fastapi import FastAPI
from api.v1.api import api_router
from dotenv import load_dotenv
from contextlib import asynccontextmanager
from infrastructure.db.mongo.setup import setup_mongo

load_dotenv()
logging.getLogger("httpx").setLevel(logging.WARNING)

@asynccontextmanager
async def lifespan(_: FastAPI):
    await setup_mongo()
    yield
    
app = FastAPI(lifespan=lifespan)

app.include_router(api_router)

if __name__ == "__main__":
    uvicorn.run("main:app", host="127.0.0.1", port=8080, reload=True)
