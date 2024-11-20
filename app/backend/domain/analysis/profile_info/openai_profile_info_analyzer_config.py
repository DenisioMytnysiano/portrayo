from dataclasses import dataclass
import os


@dataclass
class OpenAiProfileInfoAnalyzerConfig:
    OPENAI_API_KEY: str = os.getenv("PROFILE_ANALYZER_OPENAI_API_KEY", "")
    OPENAI_MODEL: str = os.getenv("PROFILE_ANALYZER_OPENAI_MODEL", "gpt-4o")
