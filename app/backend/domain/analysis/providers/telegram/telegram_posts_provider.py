from typing import List
from telethon import TelegramClient
from telethon.tl.types import Channel, Message
from urllib.parse import urlparse
from domain.analysis.providers.telegram.config import TelegramConfig
from domain.entities.post import Post
from domain.analysis.providers.posts_provider import PostsProvider
from domain.entities.social_media import SocialMedia


class TelegramPostsProvider(PostsProvider):
    def __init__(self, url: str, config: TelegramConfig):
        self.channel_username = self._get_username_from_url(url)
        self.config = config
    
    def _get_username_from_url(self, url: str) -> str:
        return urlparse(url).path.strip('/').replace('joinchat/', '')
    
    async def get_posts(self, limit: int = 100) -> List[Post]:
        client = None
        try:
            client = await self._setup_client()
            async with client:
                channel = await client.get_entity(self.channel_username)

                if not isinstance(channel, Channel):
                    raise ValueError("Invalid Telegram channel URL")

                messages = await client.get_messages(channel, limit=limit)
                return [
                    self._create_post(msg, channel)
                    for msg in messages
                    if msg.message
                ]

        finally:
            if client:
                await client.disconnect()

    async def _setup_client(self) -> TelegramClient:
        return TelegramClient(
            self.config.TELEGRAM_SESSION_NAME,
            self.config.TELEGRAM_API_ID,
            self.config.TELEGRAM_API_HASH,
            connection_retries=self.config.TELEGRAM_CONNECTION_RETRIES,
            timeout=self.config.TELEGRAM_CONNECTION_TIMEOUT
        )

    def _create_post(self, message: Message, channel: Channel) -> Post:
        return Post(
            text=message.message,
            media=SocialMedia.TELEGRAM,
            created_by=channel.title,
            created_at=message.date
        )
