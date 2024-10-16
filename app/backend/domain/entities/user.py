from dataclasses import dataclass
from typing import Optional

@dataclass
class User:
    username: str
    email: str
    hashed_password: str
