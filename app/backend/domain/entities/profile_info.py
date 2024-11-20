from dataclasses import dataclass
from domain.entities.social_media import SocialMedia


@dataclass
class ProfileInfo:
    text: str
    media: SocialMedia


@dataclass
class AnalyzedProfileInfo:
    analysis_id: str
    name: str
    surname: str
    age: int
    location: str
    occupation: str
