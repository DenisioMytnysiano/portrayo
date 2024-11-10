import os
from dataclasses import dataclass

@dataclass
class LinkedInConfig:
    linkedin_username: str = os.getenv('LINKEDIN_USERNAME', '')
    linkedin_password: str = os.getenv('LINKEDIN_PASSWORD', '')
