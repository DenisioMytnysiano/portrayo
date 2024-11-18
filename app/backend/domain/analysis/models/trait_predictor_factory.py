from domain.analysis.models.big_five.openai_big_five_trait_predictor import OpenAiBigFiveTraitPredictor
from domain.analysis.models.big_five.openai_big_five_trait_predictor_config import OpenAiBigFiveTraitPredictorConfig
from domain.analysis.models.mbti.openai_mbti_trait_predictor import OpenAiMbtiTraitPredictor
from domain.analysis.models.mbti.openai_mbti_trait_predictor_config import OpenAiMbtiTraitPredictorConfig
from domain.analysis.models.trait_predictor import TraitPredictor
from domain.entities.analysis import Analysis
from domain.entities.portrait_type import PortraitType


class TraitPredictorFactory:

    @staticmethod
    def create(analysis: Analysis) -> TraitPredictor:
        if analysis.type == PortraitType.MBTI:
            return OpenAiMbtiTraitPredictor(OpenAiMbtiTraitPredictorConfig())
        if analysis.type == PortraitType.BIG_FIVE:
            return OpenAiBigFiveTraitPredictor(OpenAiBigFiveTraitPredictorConfig())
        raise ValueError(f"Analysis type '{analysis.type}' is not supported.")
