import re
from typing import Callable, Dict, List
from domain.analysis.providers.composite_posts_provider import CompositePostsProvider
from domain.analysis.providers.linkedin.config import LinkedInConfig
from domain.analysis.providers.linkedin.linkedin_posts_provider import LinkedInPostsProvider
from domain.analysis.providers.posts_provider import PostsProvider
from domain.analysis.providers.telegram.config import TelegramConfig
from domain.analysis.providers.telegram.telegram_posts_provider import TelegramPostsProvider


class PostsProviderFactory:

    regex_mapping: Dict[str, Callable[[str], PostsProvider]] = {
        r"(?:https?:)?(?:\/\/)?(?:t\.me|telegram\.me)\/([a-zA-Z0-9_]+)(?:\/\d+)?":
            lambda url: TelegramPostsProvider(url, TelegramConfig()),
        r"(?:https?:)?(?:\/\/)?(?:www\.)?linkedin\.com\/(?:in|company)\/([a-zA-Z0-9\-]+)(?:\/posts\/\d+)?":
            lambda url: LinkedInPostsProvider(url, LinkedInConfig())
    }

    @staticmethod
    def create(urls: List[str]) -> PostsProvider:
        providers = [PostsProviderFactory.resolve_provider(url) for url in urls]
        return CompositePostsProvider(providers)

    @staticmethod
    def resolve_provider(url: str) -> PostsProvider:
        for pattern, provider_factory in PostsProviderFactory.regex_mapping.items():
            if re.match(pattern, url):
                return provider_factory(url)

        raise ValueError(f"No provider found for URL: {url}")
