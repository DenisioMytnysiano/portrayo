from typing import List
from domain.analysis.providers.posts_provider import PostsProvider
from domain.entities.post import Post


class CompositePostsProvider(PostsProvider):

    def __init__(self, providers: List[PostsProvider]):
        self.providers = providers

    async def get_posts(self) -> List[Post]:
        result = []
        for provider in self.providers:
            result.extend(await provider.get_posts())
        return result
