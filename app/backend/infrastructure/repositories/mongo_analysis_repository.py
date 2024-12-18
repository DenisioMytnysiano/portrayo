from dataclasses import asdict
from typing import Optional, List
from domain.entities.analysis import Analysis, AnalysisStatus, PostSource
from domain.repositories.analysis_repository import AnalysisRepository


class MongoAnalysisRepository(AnalysisRepository):
    def __init__(self, database):
        self.collection = database.get_collection("analyses")

    def create_analysis(self, analysis: Analysis) -> None:
        analysis_dict = asdict(analysis)
        self.collection.insert_one(analysis_dict)

    def get_analysis(self, user_id: str, analysis_id: str) -> Optional[Analysis]:
        doc = self.collection.find_one({"id": analysis_id, "created_by": user_id}, {"_id": 0})
        if doc:
            return self.__doc_to_analysis(doc)
        return None

    def get_all_analyses(self, user_id: str) -> List[Analysis]:
        docs = self.collection.find({"created_by": user_id}, {"_id": 0})
        return [self.__doc_to_analysis(doc) for doc in docs]

    def update_analysis(self, analysis: Analysis) -> None:
        analysis_dict = asdict(analysis)
        self.collection.update_one({"id": analysis.id}, {"$set": analysis_dict})

    def delete_analysis(self, user_id: str, analysis_id: str) -> None:
        self.collection.delete_one({"id": analysis_id, "created_by": user_id})

    def update_analysis_status(self, analysis_id: str, status: AnalysisStatus) -> None:
        self.collection.update_one({"id": analysis_id}, {"$set": {"status": status}})

    def __doc_to_analysis(self, doc: dict) -> Analysis:
        return Analysis(
            id=doc["id"],
            name=doc["name"],
            sources = [PostSource(**source_data) for source_data in doc["sources"]],
            type=doc["type"],
            created_by=doc["created_by"],
            created_at=doc["created_at"],
            status=doc["status"]
        )