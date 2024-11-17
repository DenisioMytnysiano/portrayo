from dataclasses import dataclass
from typing import List
from domain.entities.portrait_type import PortraitType
from domain.entities.traits import BigFiveTraits, MBTITraits


@dataclass
class TraitScore:
    trait: BigFiveTraits | MBTITraits
    score: float


@dataclass
class TraitScores:
    analysis_id: str
    type: PortraitType
    scores: List[TraitScore]
