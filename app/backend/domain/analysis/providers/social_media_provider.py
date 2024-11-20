from typing import List, Protocol
from domain.entities.post import Post
from domain.entities.profile_info import ProfileInfo


class SocialMediaProvider(Protocol):

    async def get_profile_info(self) -> List[ProfileInfo]:
        pass

    async def get_posts(self) -> List[Post]:
        pass