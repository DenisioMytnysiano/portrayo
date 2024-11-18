from dataclasses import asdict
from typing import List, Optional
from domain.entities.post import AnalyzedPost
from domain.entities.trait_scores import TraitScores
from domain.repositories.results_repository import ResultsRepository


class MongoResultsRepository(ResultsRepository):
    def __init__(self, database):
        self.posts_collection = database.get_collection("posts")
        self.scores_collection = database.get_collection("scores")

    def create_posts(self, posts: List[AnalyzedPost]) -> None:
        if not posts:
            return
        posts_data = [post.__dict__ for post in posts]
        self.posts_collection.insert_many(posts_data)

    def get_posts(self, analysis_id: str) -> List[AnalyzedPost]:
        posts_data = self.posts_collection.find({"analysis_id": analysis_id}, {"_id": 0})
        return [AnalyzedPost(**post_data) for post_data in posts_data]

    def delete_posts(self, analysis_id: str) -> None:
        self.posts_collection.delete_many({"analysis_id": analysis_id})

    def create_scores(self, scores: TraitScores) -> None:
        scores_dict = asdict(scores)
        self.scores_collection.insert_one(scores_dict)

    def get_scores(self, analysis_id: str) -> Optional[TraitScores]:
        scores_data = self.scores_collection.find_one({"analysis_id": analysis_id}, {"_id": 0})
        if scores_data:
            return TraitScores(**scores_data)
        return None

    def delete_scores(self, analysis_id: str) -> None:
        self.scores_collection.delete_one({"analysis_id": analysis_id})

    def delete_results(self, analysis_id: str) -> None:
        self.delete_posts(analysis_id)
        self.delete_scores(analysis_id)
