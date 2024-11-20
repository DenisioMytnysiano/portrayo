from typing import List
from domain.analysis.providers.social_media_provider import SocialMediaProvider
from domain.entities.post import Post
from domain.entities.profile_info import ProfileInfo


class CompositeSocialMediaProvider(SocialMediaProvider):

    def __init__(self, providers: List[SocialMediaProvider]):
        self.providers = providers

    async def get_profile_info(self) -> List[ProfileInfo]:
        result = []
        for provider in self.providers:
            result.extend(await provider.get_profile_info())
        return result

    async def get_posts(self) -> List[Post]:
        result = []
        for provider in self.providers:
            result.extend(await provider.get_posts())
        return result
