from datetime import datetime
from typing import List

from pydantic import BaseModel

from domain.entities.portrait_type import PortraitType


class ScoresResponse(BaseModel):
    name: str
    urls: List[str]
    type: PortraitType
