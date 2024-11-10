from datetime import datetime
from typing import List

from pydantic import BaseModel

from domain.entities.analysis import AnalysisStatus
from domain.entities.portrait_type import PortraitType


class CreateAnalysisRequest(BaseModel):
    name: str
    urls: List[str]
    type: PortraitType


class UpdateAnalysisRequest(BaseModel):
    name: str
    urls: List[str]


class AnalysisResponse(BaseModel):
    id: str
    name: str
    urls: List[str]
    status: AnalysisStatus
    created_at: datetime
