from datetime import datetime
from typing import List

from pydantic import BaseModel, PositiveInt

from domain.entities.analysis import AnalysisStatus, PostSource
from domain.entities.portrait_type import PortraitType

class PostSourceDetails(BaseModel):
    url: str
    limit: PositiveInt

    def to_source(self):
        return PostSource(
            url=self.url,
            limit=self.limit
        )


class CreateAnalysisRequest(BaseModel):
    name: str
    sources: List[PostSourceDetails]
    type: PortraitType


class UpdateAnalysisRequest(BaseModel):
    name: str
    sources: List[PostSourceDetails]


class AnalysisResponse(BaseModel):
    id: str
    name: str
    sources: List[PostSourceDetails]
    status: AnalysisStatus
    created_at: datetime
