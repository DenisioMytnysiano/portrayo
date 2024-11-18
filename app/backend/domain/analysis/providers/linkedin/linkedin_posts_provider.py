from datetime import datetime
from typing import List
from domain.analysis.providers.linkedin.config import LinkedInConfig
from domain.analysis.providers.linkedin.utils import get_date_from_linkedin_activity
from domain.analysis.providers.posts_provider import PostsProvider
from domain.entities.post import Post
from linkedin_api import Linkedin

from domain.entities.social_media import SocialMedia


class LinkedInPostsProvider(PostsProvider):
    def __init__(self, user_profile_url: str, limit: int, config: LinkedInConfig):
        self.api = Linkedin(config.LINKEDIN_USERNAME, config.LINKEDIN_PASSWORD)
        self.user_id = self._extract_user_id_from_url(user_profile_url)
        self.limit = limit

    def _extract_user_id_from_url(self, user_profile_url: str) -> str:
        return user_profile_url.rstrip("/").split("/")[-1]

    async def get_posts(self) -> List[Post]:
        linkedin_posts = self.api.get_profile_posts(self.user_id, post_count=self.limit)
        return [
            Post(
                text=post["commentary"]["text"]["text"],
                media=SocialMedia.LINKEDIN,
                created_by=post["actor"]["name"]["text"],
                created_at=get_date_from_linkedin_activity(post["dashEntityUrn"]),
            )
            for post in linkedin_posts
        ]
