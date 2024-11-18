from enum import Enum
from typing import List
import openai
from domain.analysis.models.mbti.openai_mbti_trait_predictor_config import OpenAiMbtiTraitPredictorConfig
from domain.analysis.models.trait_predictor import TraitPredictor
from domain.entities.post import Post
from domain.entities.traits import MBTITraits


PROMPT = """
You are an expert in personality psychology specializing in the Myers-Briggs Type Indicator (MBTI).
Your task is to analyze a user's social media posts and identify the traits from the MBTI framework.
Analyze the user's social media activity to determine their MBTI traits.
Review the posts for behavior, language patterns, emotional tone, and interaction styles to assess the following dimensions:

Extraversion (E) vs. Introversion (I):
-	Extraversion: Signs of energy directed outwardly, frequent social interaction, or excitement from group activities.
-	Introversion: Focus on inner thoughts, solitary activities, or reserved communication style.

Sensing (S) vs. Intuition (N):
-	Sensing: Attention to details, practicality, and focus on concrete information.
-	Intuition: Preference for abstract thinking, ideas, future possibilities, and conceptual discussions.

Thinking (T) vs. Feeling (F):
-	Thinking: Emphasis on logic, objectivity, and analytical decision-making.
-	Feeling: Prioritization of emotions, personal values, and harmonious relationships in decision-making.

Judging (J) vs. Perceiving (P):
-	Judging: Preference for structure, organization, and a planned, decisive approach.
-	Perceiving: Flexibility, spontaneity, and an open-ended approach to tasks or decisions.

Return the identified MBTI traits as a comma-separated list of traits.
If a trait is not present, do not include it in the response.

Post:
{post}
"""


class OpenAiMbtiTraitPredictor(TraitPredictor):

    def __init__(self, config: OpenAiMbtiTraitPredictorConfig):
        self.client = openai.OpenAI(api_key=config.OPENAI_API_KEY)
        self.model = config.OPENAI_MODEL

    def predict(self, post: Post) -> List[Enum]:
        formatted_prompt = PROMPT.format(post=post.text)
        response = self.client.chat.completions.create(
            model=self.model,
            messages=[{"role": "user", "content": formatted_prompt}],
            temperature=0,
            max_tokens=100
        )
        traits_text = response.choices[0].message.content.strip()
        return [MBTITraits[trait.strip().upper()] for trait in traits_text.split(",")]
