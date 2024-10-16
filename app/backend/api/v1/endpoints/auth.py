from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordRequestForm
from jose import JWTError

from api.v1.schema.auth import TokenResponse, UserCreateRequest
from domain.entities.user import User
from domain.repositories.user_repository import UserRepository
from infrastructure.repositories.mongo_user_repository import MongoUserRepository
from infrastructure.security.password_hasher import PasswordHasher
from dependency_injector.wiring import inject, Provide
from container import Container
from infrastructure.security.token_service import TokenService

router = APIRouter()

@router.post("/login", response_model=TokenResponse)
@inject
def login(
    form_data: OAuth2PasswordRequestForm = Depends(),
    user_repository: UserRepository = Depends(Provide[Container.user_repository]),
    token_service: TokenService = Depends(Provide[Container.token_service])):

    user = user_repository.get_user(form_data.username, form_data.password)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    access_token = token_service.create_access_token(data={"sub": user.username})
    refresh_token = token_service.create_refresh_token(data={"sub": user.username})
    return {"access_token": access_token, "refresh_token": refresh_token, "token_type": "bearer"}

@router.post("/refresh", response_model=TokenResponse)
@inject
def refresh(
    refresh_token: str,
    token_service: TokenService = Depends(Provide[Container.token_service])
):
    try:
        user = token_service.verify_token(refresh_token)
        if user is None:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Invalid refresh token",
            )
        access_token = token_service.create_access_token(data={"sub": user})
        return {"access_token": access_token, "refresh_token": refresh_token, "token_type": "bearer"}
    except JWTError:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid refresh token",
        )

@router.post("/register", status_code=status.HTTP_201_CREATED)
@inject
def register(
    user: UserCreateRequest,
    user_repository: UserRepository = Depends(Provide[Container.user_repository])
):
    existing_user = user_repository.get_user(user.username)
    if existing_user:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Username already registered"
        )
    new_user = User(
        username=user.username,
        email=user.email,
        full_name=user.full_name,
        hashed_password=user.password
    )
    user_repository.create_user(new_user)
