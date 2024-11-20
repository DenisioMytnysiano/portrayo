import json
from typing import List
import openai
from domain.analysis.profile_info.openai_profile_info_analyzer_config import OpenAiProfileInfoAnalyzerConfig
from domain.analysis.profile_info.profile_info_analyzer import ProfileInfoAnalyzer
from domain.entities.profile_info import AnalyzedProfileInfo, ProfileInfo


PROMPT = """
You are a social media data analyst. Given profile information from various social media platforms for the same individual, analyze and extract key personal details.
Consolidate the information into a structured JSON format. If certain details are not explicitly mentioned or cannot be inferred, return null for those fields.

### Input:
{profile_infos}

### Task:
1. Unify information across the provided inputs.
2. Handle variations in data representation (e.g., abbreviations, synonyms).
3. Return the output in this JSON format:

* name: <Extracted or inferred full name, or null>
* surname: <Extracted or inferred surname, or null>
* age: <Extracted or inferred age, or null>
* location: <Extracted or inferred location, or null>
* occupation: <Extracted or inferred occupation, or null>
"""

class OpenAiProfileInfoAnalyzer(ProfileInfoAnalyzer):
    def __init__(self, config: OpenAiProfileInfoAnalyzerConfig):
        self.client = openai.OpenAI(api_key=config.OPENAI_API_KEY)
        self.model = config.OPENAI_MODEL

    def analyze(self, analysis_id: str, profiles: List[ProfileInfo]) -> dict[str, str]:
        profile_infos = "\n".join([f"{info.media}\n{info.text}" for info in profiles])
        formatted_prompt = PROMPT.format(profile_infos=profile_infos)
        response = self.client.chat.completions.create(
            model=self.model,
            messages=[{"role": "user", "content": formatted_prompt}],
            temperature=0,
            timeout=60,
            max_tokens=200
        )
        data = response.choices[0].message.content.strip()
        data = data[7:-3]
        obj = json.loads(data)
        return AnalyzedProfileInfo(
            analysis_id=analysis_id,
            name=obj.get("name"),
            surname=obj.get("surname"),
            age=obj.get("age"),
            location=obj.get("location"),
            occupation=obj.get("occupation")
        )
