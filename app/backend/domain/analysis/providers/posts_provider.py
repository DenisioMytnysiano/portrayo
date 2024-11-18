from typing import List, Protocol
from domain.entities.post import Post


class PostsProvider(Protocol):

    async def get_posts(self) -> List[Post]:
        pass