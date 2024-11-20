from enum import Enum
from typing import List
import openai
from domain.analysis.models.big_five.openai_big_five_trait_predictor_config import OpenAiBigFiveTraitPredictorConfig
from domain.analysis.models.trait_predictor import TraitPredictor
from domain.entities.post import Post
from domain.entities.traits import BigFiveTraits


PROMPT = """
You are an expert in personality psychology, specializing in the analysis of text-based behavior.  
Your task is to analyze a user's social media posts to extract their Big Five personality traits.  
Based on the user's social media activity, identify and assess the following Big Five personality traits: Openness, Conscientiousness, Extraversion, Agreeableness, and Neuroticism.  
Examine the user's posts for language patterns, emotional expressions, and interaction styles that align with these traits.  

For each post, look for:  
- **Openness**: Signs of creativity, intellectual curiosity, or openness to new experiences.  
- **Conscientiousness**: Indications of responsibility, organization, or a goal-oriented mindset.  
- **Extraversion**: Evidence of social engagement, assertiveness, and talkativeness.  
- **Agreeableness**: Displays of compassion, friendliness, trust, or cooperation.  
- **Neuroticism**: Clues of emotional instability, anxiety, mood swings, or stress.  

**Output Format:**  
- Return the detected personality traits as a comma-delimited set.  
- Do not include any reasoning or arbitrary text in the response.  
- If a trait is not present, exclude it from the response.  

**Example Output:**  
Openness, Neuroticism  

**Post:**
{post}
"""

class OpenAiBigFiveTraitPredictor(TraitPredictor):
    def __init__(self, config: OpenAiBigFiveTraitPredictorConfig):
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
        return [BigFiveTraits[trait.strip().upper()] for trait in traits_text.split(",")]
