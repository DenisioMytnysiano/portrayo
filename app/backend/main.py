import uvicorn
from fastapi import FastAPI
from api.v1.api import api_router
from dotenv import load_dotenv
load_dotenv()

app = FastAPI()

app.include_router(api_router)

if __name__ == "__main__":
    uvicorn.run(app, host="127.0.0.1", port=8080)
