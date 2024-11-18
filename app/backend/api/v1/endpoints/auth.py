from uuid import uuid4
from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordRequestForm
from jose import JWTError
from api.v1.deps import get_password_hasher, get_token_service, get_user_repository
from api.v1.schema.auth import RefreshTokenRequest, TokenResponse, UserCreateRequest
from domain.entities.user import User
from domain.repositories.user_repository import UserRepository
from infrastructure.security.password_hasher import PasswordHasher
from infrastructure.security.token_service import TokenService

router = APIRouter()


@router.post("/login", response_model=TokenResponse)
def login(
    form_data: OAuth2PasswordRequestForm = Depends(),
    user_repository: UserRepository = Depends(get_user_repository),
    token_service: TokenService = Depends(get_token_service),
):
    user = user_repository.get_user(form_data.username)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    access_token = token_service.create_access_token(data={"sub": user.username})
    refresh_token = token_service.create_refresh_token(data={"sub": user.username})
    return {
        "access_token": access_token,
        "refresh_token": refresh_token,
        "token_type": "bearer",
    }


@router.post("/refresh", response_model=TokenResponse)
def refresh(
    request: RefreshTokenRequest,
    token_service: TokenService = Depends(get_token_service),
):
    try:
        user = token_service.verify_token(request.refresh_token)
        if user is None:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Invalid refresh token",
            )
        access_token = token_service.create_access_token(data={"sub": user})
        refresh_token = token_service.create_refresh_token(data={"sub": user})
        return {
            "access_token": access_token,
            "refresh_token": refresh_token,
            "token_type": "bearer",
        }
    except JWTError as e:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid refresh token",
        ) from e


@router.post("/register", status_code=status.HTTP_201_CREATED)
def register(
    user: UserCreateRequest,
    user_repository: UserRepository = Depends(get_user_repository),
    hasher: PasswordHasher = Depends(get_password_hasher),
):
    existing_user = user_repository.get_user(user.username)
    if existing_user:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Username already registered",
        )
    new_user = User(
        id=str(uuid4()),
        username=user.username,
        email=user.email,
        hashed_password=hasher.hash_password(user.password),
    )
    user_repository.create_user(new_user)
