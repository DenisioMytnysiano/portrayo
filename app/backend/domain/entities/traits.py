from enum import Enum


class BigFiveTraits(str, Enum):
    OPENNESS = "Openness"
    CONSCIENTIOUSNESS = "Conscientiousness"
    EXTRAVERSION = "Extraversion"
    AGREEABLENESS = "Agreeableness"
    NEUROTICISM = "Neuroticism"


class MBTITraits(str, Enum):
    EXTRAVERSION = "Extraversion"
    INTROVERSION = "Introversion"
    SENSING = "Sensing"
    INTUITION = "Intuition"
    THINKING = "Thinking"
    FEELING = "Feeling"
    JUDGING = "Judjing"
    PERCEIVING = "Perceiving"
