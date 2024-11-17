from typing import List, Protocol

from domain.entities.post import AnalyzedPost
from domain.entities.trait_scores import TraitScore


class TraitScoresCalculator(Protocol):

    def calculate(self, posts: List[AnalyzedPost]) -> List[TraitScore]:
        pass
