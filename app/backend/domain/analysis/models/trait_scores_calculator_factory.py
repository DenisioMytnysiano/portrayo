from domain.analysis.models.big_five.big_five_trait_scores_calculator import (
    BigFiveTraitScoresCalculator,
)
from domain.analysis.models.mbti.mbti_trait_scores_calculator import (
    MbtiTraitScoresCalculator,
)
from domain.analysis.models.trait_scores_calculator import TraitScoresCalculator
from domain.entities.analysis import Analysis
from domain.entities.portrait_type import PortraitType


class TraitScoresCalculatorFactory:

    @staticmethod
    def create(analysis: Analysis) -> TraitScoresCalculator:
        if analysis.type == PortraitType.MBTI:
            return MbtiTraitScoresCalculator()
        if analysis.type == PortraitType.BIG_FIVE:
            return BigFiveTraitScoresCalculator()
        raise ValueError(f"Analysis type '{analysis.type}' is not supported.")
