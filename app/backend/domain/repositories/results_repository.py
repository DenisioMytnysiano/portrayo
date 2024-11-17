from typing import Optional, List, Protocol
from domain.entities.post import AnalyzedPost
from domain.entities.trait_scores import TraitScores

class ResultsRepository(Protocol):

    async def create_posts(self, posts: List[AnalyzedPost]) -> None:
        pass

    async def get_posts(self, analysis_id: str) -> List[AnalyzedPost]:
        pass

    async def delete_posts(self, analysis_id: str) -> None:
        pass

    async def create_scores(self, scores: TraitScores) -> None:
        pass

    async def get_scores(self, analysis_id: str) -> Optional[TraitScores]:
        pass

    async def delete_scores(self, analysis_id: str) -> None:
        pass

    async def delete_results(self, analysis_id: str) -> None:
        pass