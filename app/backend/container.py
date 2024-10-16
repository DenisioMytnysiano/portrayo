from dependency_injector import containers, providers
from infrastructure.db.mongo import database
from infrastructure.security.jwt_config import JWTConfig
from infrastructure.repositories.mongo_user_repository import MongoUserRepository
from infrastructure.security.password_hasher import PasswordHasher
from infrastructure.security.token_service import TokenService

class Container(containers.DeclarativeContainer):
    wiring_config = containers.WiringConfiguration(modules=["api.v1"])

    password_hasher = providers.Singleton(PasswordHasher)
    jwt_config = providers.Singleton(JWTConfig)
    token_service = providers.Singleton(TokenService, config=jwt_config)

    user_repository = providers.Factory(
        MongoUserRepository,
        database=database,
        password_hasher=password_hasher
    )