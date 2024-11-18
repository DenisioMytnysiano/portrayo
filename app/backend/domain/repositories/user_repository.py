from typing import Optional, Protocol
from domain.entities.user import User

class UserRepository(Protocol):

    def create_user(self, user: User) -> None:
        pass

    def get_user(self, username: str) -> Optional[User]:
        pass

    def update_user(self, user: User) -> None:
        pass

    def delete_user(self, username: str) -> None:
        pass
