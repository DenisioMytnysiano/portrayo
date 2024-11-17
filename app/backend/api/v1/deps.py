from typing import Annotated
from fastapi import Depends, Request
from domain.repositories.analysis_repository import AnalysisRepository
from domain.repositories.results_repository import ResultsRepository
from domain.repositories.user_repository import UserRepository
from infrastructure.repositories.mongo_analysis_repository import MongoAnalysisRepository
from infrastructure.repositories.mongo_results_repository import MongoResultsRepository
from infrastructure.repositories.mongo_user_repository import MongoUserRepository
from infrastructure.security.jwt_config import JWTConfig
from infrastructure.security.password_hasher import PasswordHasher
from infrastructure.security.token_service import TokenService
from infrastructure.db.mongo.database import database

def get_jwt_config():
    return JWTConfig()

def get_password_hasher():
    return PasswordHasher()

def get_token_service(
    jwt_config: Annotated[JWTConfig, Depends(get_jwt_config)]
) -> TokenService:
    return TokenService(jwt_config)

def get_user_repository() -> UserRepository:
    return MongoUserRepository(database)

def get_analysis_repository() -> AnalysisRepository:
    return MongoAnalysisRepository(database)

def get_results_repository() -> ResultsRepository:
    return MongoResultsRepository(database)

async def get_current_user(
    request: Request,
    token_service: Annotated[TokenService, Depends(get_token_service)],
    user_repository: Annotated[MongoUserRepository, Depends(get_user_repository)]
):
    auth_header = request.headers.get("Authorization")
    if not auth_header or not auth_header.startswith("Bearer "):
        return None
    
    token = auth_header.split(" ")[1]
    user_id = token_service.verify_token(token)
    return await user_repository.get_user(user_id)