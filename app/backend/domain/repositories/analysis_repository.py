from typing import Optional, List, Protocol
from domain.entities.analysis import Analysis, AnalysisStatus

class AnalysisRepository(Protocol):
    
    async def create_analysis(self, analysis: Analysis) -> None:
        pass

    async def get_analysis(self, user_id: str, analysis_id: str) -> Optional[Analysis]:
        pass

    async def get_all_analyses(self, user_id: str) -> List[Analysis]:
        pass

    async def update_analysis(self, analysis: Analysis) -> None:
        pass

    async def delete_analysis(self, user_id: str, analysis_id: str) -> None:
        pass

    async def update_analysis_status(self, analysis_id: str, status: AnalysisStatus) -> None:
        pass