from typing import List
from domain.analysis.models.trait_scores_calculator import TraitScoresCalculator
from domain.entities.post import AnalyzedPost
from domain.entities.trait_scores import TraitScore
from domain.entities.traits import BigFiveTraits


class BigFiveTraitScoresCalculator(TraitScoresCalculator):

    def calculate(self, posts: List[AnalyzedPost]) -> List[TraitScore]:
        result = {
            BigFiveTraits.AGREEABLENESS : 0,
            BigFiveTraits.CONSCIENTIOUSNESS : 0,
            BigFiveTraits.EXTRAVERSION : 0,
            BigFiveTraits.NEUROTICISM : 0,
            BigFiveTraits.OPENNESS: 0
        }
        total_traits = 0
        for post in posts:
            for trait in post.traits:
                result[trait] += 1
                total_traits += 1
        return [TraitScore(trait=trait, score=freq/total_traits) for trait, freq in result.items()]
