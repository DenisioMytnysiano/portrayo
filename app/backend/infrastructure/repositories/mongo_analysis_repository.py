from typing import Optional, List
from domain.entities.analysis import Analysis, AnalysisStatus
from domain.repositories.analysis_repository import AnalysisRepository


class MongoAnalysisRepository(AnalysisRepository):
    def __init__(self, database):
        self.collection = database.get_collection("analyses")

    async def create_analysis(self, analysis: Analysis) -> None:
        analysis_dict = analysis.__dict__
        await self.collection.insert_one(analysis_dict)

    async def get_analysis(self, user_id: str, analysis_id: str) -> Optional[Analysis]:
        analysis_data = await self.collection.find_one(
            {"id": analysis_id, "created_by": user_id}, {"_id": 0}
        )
        if analysis_data:
            return Analysis(**analysis_data)
        return None

    async def get_all_analyses(self, user_id: str) -> List[Analysis]:
        analyses_data = await self.collection.find({"created_by": user_id}, {"_id": 0}).to_list()
        return [Analysis(**analysis_data) for analysis_data in analyses_data]

    async def update_analysis(self, analysis: Analysis) -> None:
        analysis_dict = analysis.__dict__
        await self.collection.update_one({"id": analysis.id}, {"$set": analysis_dict})

    async def delete_analysis(self, user_id: str, analysis_id: str) -> None:
        await self.collection.delete_one({"id": analysis_id, "created_by": user_id})

    async def update_analysis_status(self, analysis_id: str, status: AnalysisStatus) -> None:
        await self.collection.update_one({"id": analysis_id}, {"$set": {"status": status}})
