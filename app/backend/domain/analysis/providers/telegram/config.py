from dataclasses import dataclass
import os


@dataclass
class TelegramConfig:
    TELEGRAM_API_ID: str = os.getenv("TELEGRAM_API_ID", "")
    TELEGRAM_API_HASH: str = os.getenv("TELEGRAM_API_HASH", "")
    TELEGRAM_SESSION_NAME: str = os.getenv("TELEGRAM_SESSION_NAME", "session_name")
    TELEGRAM_CONNECTION_RETRIES: int = int(os.getenv("TELEGRAM_CONNECTION_RETRIES", "3"))
    TELEGRAM_CONNECTION_TIMEOUT: int = int(os.getenv("TELEGRAM_CONNECTION_TIMEOUT", "30"))
