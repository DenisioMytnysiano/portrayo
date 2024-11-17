import os
from dataclasses import dataclass

@dataclass
class LinkedInConfig:
    LINKEDIN_USERNAME: str = os.getenv('LINKEDIN_USERNAME', '')
    LINKEDIN_PASSWORD: str = os.getenv('LINKEDIN_PASSWORD', '')
