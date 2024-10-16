from datetime import datetime, timedelta
from jose import jwt, JWTError

from infrastructure.security.exceptions import InvalidCredentialsError
from infrastructure.security.jwt_config import JWTConfig

class TokenService:

    def __init__(self, jwt_config: JWTConfig):
        self.jwt_config = jwt_config

    def create_token(self, data: dict, expires_delta: timedelta) -> str:
        to_encode = data.copy()
        expire = datetime.utcnow() + expires_delta
        to_encode.update({"exp": expire})
        return jwt.encode(to_encode, self.jwt_config.JWT_SECRET_KEY, algorithm=self.jwt_config.JWT_ALGORITHM)

    def create_access_token(self, data: dict) -> str:
        return self.create_token(
            data,
            timedelta(minutes=self.jwt_config.ACCESS_TOKEN_EXPIRE_MINUTES)
        )

    def create_refresh_token(self, data: dict) -> str:
        return self.create_token(
            data,
            timedelta(days=self.jwt_config.REFRESH_TOKEN_EXPIRE_DAYS)
        )

    def verify_token(self, token: str) -> str:
        try:
            payload = jwt.decode(
                token,
                self.jwt_config.JWT_SECRET_KEY,
                algorithms=[self.jwt_config.JWT_ALGORITHM]
            )
            username: str = payload.get("sub")
            if username is None:
                raise InvalidCredentialsError()
            return username
        except JWTError:
            raise InvalidCredentialsError()