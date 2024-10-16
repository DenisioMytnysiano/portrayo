from abc import ABC, abstractmethod
from typing import Optional, Protocol
from domain.entities.user import User

class UserRepository(Protocol):

    @abstractmethod
    def create_user(self, user: User) -> None:
        pass

    @abstractmethod
    def get_user(self, username: str) -> Optional[User]:
        pass

    @abstractmethod
    def update_user(self, user: User) -> None:
        pass

    @abstractmethod
    def delete_user(self, username: str) -> None:
        pass

