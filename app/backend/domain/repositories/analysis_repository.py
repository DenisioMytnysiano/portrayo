from typing import Optional, List, Protocol
from domain.entities.analysis import Analysis, AnalysisStatus

class AnalysisRepository(Protocol):
    
    def create_analysis(self, analysis: Analysis) -> None:
        pass

    def get_analysis(self, user_id: str, analysis_id: str) -> Optional[Analysis]:
        pass

    def get_all_analyses(self, user_id: str) -> List[Analysis]:
        pass

    def update_analysis(self, analysis: Analysis) -> None:
        pass

    def delete_analysis(self, user_id: str, analysis_id: str) -> None:
        pass

    def update_analysis_status(self, analysis_id: str, status: AnalysisStatus) -> None:
        pass