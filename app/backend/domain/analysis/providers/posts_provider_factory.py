import re
from typing import Callable, Dict, List
from domain.analysis.providers.composite_posts_provider import CompositePostsProvider
from domain.analysis.providers.linkedin.config import LinkedInConfig
from domain.analysis.providers.linkedin.linkedin_posts_provider import LinkedInPostsProvider
from domain.analysis.providers.posts_provider import PostsProvider
from domain.analysis.providers.telegram.config import TelegramConfig
from domain.analysis.providers.telegram.telegram_posts_provider import TelegramPostsProvider
from domain.entities.analysis import PostSource


class PostsProviderFactory:

    regex_mapping: Dict[str, Callable[[str], PostsProvider]] = {
        r"(?:https?:)?(?:\/\/)?(?:t\.me|telegram\.me)\/([a-zA-Z0-9_]+)(?:\/\d+)?":
            lambda url, limit: TelegramPostsProvider(url, limit, TelegramConfig()),
        r"(?:https?:)?(?:\/\/)?(?:www\.)?linkedin\.com\/(?:in|company)\/([a-zA-Z0-9\-]+)(?:\/posts\/\d+)?":
            lambda url, limit: LinkedInPostsProvider(url, limit, LinkedInConfig())
    }

    @staticmethod
    def create(sources: List[PostSource]) -> PostsProvider:
        providers = [PostsProviderFactory.resolve_provider(source) for source in sources]
        return CompositePostsProvider(providers)

    @staticmethod
    def resolve_provider(source: PostSource) -> PostsProvider:
        for pattern, provider_factory in PostsProviderFactory.regex_mapping.items():
            if re.match(pattern, source.url):
                return provider_factory(source.url, source.limit)

        raise ValueError(f"No provider found for URL: {source.url}")
