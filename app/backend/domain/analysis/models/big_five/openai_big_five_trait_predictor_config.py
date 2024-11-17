from dataclasses import dataclass
import os


@dataclass
class OpenAiBigFiveTraitPredictorConfig:
    OPENAI_API_KEY: str = os.getenv("BIG_FIVE_OPENAI_API_KEY", "")
    OPENAI_MODEL: str = os.getenv("BIG_FIVE_OPENAI_MODEL", "gpt-4o")
