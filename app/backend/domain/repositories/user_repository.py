from abc import abstractmethod
from typing import Optional, Protocol
from domain.entities.user import User

class UserRepository(Protocol):

    async def create_user(self, user: User) -> None:
        pass

    async def get_user(self, username: str) -> Optional[User]:
        pass

    async def update_user(self, user: User) -> None:
        pass

    async def delete_user(self, username: str) -> None:
        pass
