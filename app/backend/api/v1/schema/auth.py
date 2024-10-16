from typing import Optional
from pydantic import BaseModel


class TokenResponse(BaseModel):
    access_token: str
    refresh_token: str
    token_type: str


class UserCreateRequest(BaseModel):
    username: str
    email: Optional[str] = None
    password: str
    full_name: Optional[str] = None
