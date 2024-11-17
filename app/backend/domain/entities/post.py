from dataclasses import dataclass
from datetime import datetime
from typing import List

from domain.entities.social_media import SocialMedia
from domain.entities.traits import BigFiveTraits, MBTITraits


@dataclass
class Post:
    text: str
    media: SocialMedia
    created_by: str
    created_at: datetime

@dataclass
class AnalyzedPost:
    analysis_id: str
    text: str
    media: SocialMedia
    created_by: str
    created_at: datetime
    traits: List[BigFiveTraits] | List[MBTITraits]
