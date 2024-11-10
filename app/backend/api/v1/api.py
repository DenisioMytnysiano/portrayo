from fastapi import APIRouter
from api.v1.endpoints import auth, analysis, results

api_router = APIRouter(prefix="/api/v1")
api_router.include_router(auth.router, prefix="/auth", tags=["Authentication"])
api_router.include_router(analysis.router, prefix="/analysis", tags=["Analysis"])
api_router.include_router(results.router, prefix="/results", tags=["Results"])
