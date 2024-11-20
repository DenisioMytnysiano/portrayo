from typing import List, Protocol
from domain.entities.profile_info import ProfileInfo


class ProfileInfoAnalyzer(Protocol):

    def analyze(self, analysis_id: str, profiles: List[ProfileInfo]) -> dict[str, str]:
        pass