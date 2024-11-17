from enum import Enum
from typing import List, Protocol
from domain.entities.post import Post


class TraitPredictor(Protocol):

    async def predict(self, post: Post) -> List[Enum]:
        pass
