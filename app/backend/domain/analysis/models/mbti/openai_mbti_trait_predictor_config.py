from dataclasses import dataclass
import os


@dataclass
class OpenAiMbtiTraitPredictorConfig:
    OPENAI_API_KEY: str = os.getenv("MBTI_OPENAI_API_KEY", "")
    OPENAI_MODEL: str = os.getenv("MBTI_OPENAI_MODEL", "gpt-4o")
