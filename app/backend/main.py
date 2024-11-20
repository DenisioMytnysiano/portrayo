import uvicorn
import logging
from fastapi import FastAPI
from api.v1.api import api_router
from dotenv import load_dotenv
from contextlib import asynccontextmanager
from infrastructure.db.mongo.setup import setup_mongo
from fastapi.middleware.cors import CORSMiddleware

load_dotenv()
logging.getLogger("httpx").setLevel(logging.WARNING)


@asynccontextmanager
async def lifespan(_: FastAPI):
    setup_mongo()
    yield


app = FastAPI(lifespan=lifespan)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], 
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)
app.include_router(api_router)

if __name__ == "__main__":
    uvicorn.run("main:app", host="localhost", port=8080)
