from dataclasses import dataclass
from datetime import datetime
from enum import Enum

from domain.entities.portrait_type import PortraitType


class AnalysisStatus(str, Enum):
    CREATED = "Created"
    IN_PROGRESS = "In Progress"
    COMPLETED = "Completed"
    FAILED = "Failed"


@dataclass
class PostSource:
    url: str
    limit: int

@dataclass
class Analysis:
    id: str
    name: str
    sources: list[PostSource]
    type: PortraitType
    created_by: str
    created_at: datetime
    status: AnalysisStatus
