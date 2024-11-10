from typing import Optional
from pydantic import BaseModel


class TokenResponse(BaseModel):
    access_token: str
    refresh_token: str
    token_type: str


class UserCreateRequest(BaseModel):
    username: str
    email: str
    password: str


class RefreshTokenRequest(BaseModel):
    refresh_token: str
