from typing import Optional, List, Protocol
from domain.entities.post import AnalyzedPost
from domain.entities.profile_info import AnalyzedProfileInfo
from domain.entities.trait_scores import TraitScores

class ResultsRepository(Protocol):

    def create_profile_info(self, info: AnalyzedProfileInfo) -> None:
        pass

    def get_profile_info(self, analysis_id: str) -> AnalyzedProfileInfo:
        pass

    def delete_profile_info(self, analysis_id: str) -> None:
        pass

    def create_posts(self, posts: List[AnalyzedPost]) -> None:
        pass

    def get_posts(self, analysis_id: str) -> List[AnalyzedPost]:
        pass

    def delete_posts(self, analysis_id: str) -> None:
        pass

    def create_scores(self, scores: TraitScores) -> None:
        pass

    def get_scores(self, analysis_id: str) -> Optional[TraitScores]:
        pass

    def delete_scores(self, analysis_id: str) -> None:
        pass

    def delete_results(self, analysis_id: str) -> None:
        pass