import re
from typing import Callable, Dict, List
from domain.analysis.providers.composite_social_media_provider import CompositeSocialMediaProvider
from domain.analysis.providers.linkedin.config import LinkedInConfig
from domain.analysis.providers.linkedin.linkedin_social_media_provider import LinkedInSocialMediaProvider
from domain.analysis.providers.social_media_provider import SocialMediaProvider
from domain.analysis.providers.telegram.config import TelegramConfig
from domain.analysis.providers.telegram.telegram_posts_provider import TelegramSocialMediaProvider
from domain.entities.analysis import PostSource


class SocialMediaProviderFactory:

    regex_mapping: Dict[str, Callable[[str], SocialMediaProvider]] = {
        r"(?:https?:)?(?:\/\/)?(?:t\.me|telegram\.me)\/([a-zA-Z0-9_]+)(?:\/\d+)?":
            lambda url, limit: TelegramSocialMediaProvider(url, limit, TelegramConfig()),
        r"(?:https?:)?(?:\/\/)?(?:www\.)?linkedin\.com\/(?:in|company)\/([a-zA-Z0-9\-]+)(?:\/posts\/\d+)?":
            lambda url, limit: LinkedInSocialMediaProvider(url, limit, LinkedInConfig())
    }

    @staticmethod
    def create(sources: List[PostSource]) -> SocialMediaProvider:
        providers = [SocialMediaProviderFactory.resolve_provider(source) for source in sources]
        return CompositeSocialMediaProvider(providers)

    @staticmethod
    def resolve_provider(source: PostSource) -> SocialMediaProvider:
        for pattern, provider_factory in SocialMediaProviderFactory.regex_mapping.items():
            if re.match(pattern, source.url):
                return provider_factory(source.url, source.limit)

        raise ValueError(f"No provider found for URL: {source.url}")
