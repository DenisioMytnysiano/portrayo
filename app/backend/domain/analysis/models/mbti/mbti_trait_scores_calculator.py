from typing import List
from domain.analysis.models.trait_scores_calculator import TraitScoresCalculator
from domain.entities.post import AnalyzedPost


class MbtiTraitScoresCalculator(TraitScoresCalculator):

    def calculate(self, posts: List[AnalyzedPost]) -> dict[str, float]:
        return super().calculate(posts)