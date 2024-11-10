from dataclasses import dataclass

@dataclass
class User:
    id: str
    username: str
    email: str
    hashed_password: str
