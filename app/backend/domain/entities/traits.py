from enum import Enum


class BigFiveTraits(str, Enum):
    OPENNESS = "Openness"
    CONSCIENTIOUSNESS = "Conscientiousness"
    EXTRAVERSION = "Extraversion"
    AGREEABLENESS = "Agreeableness"
    NEUROTICISM = "Neuroticism"


class MBTITraits(str, Enum):
    EXTRAVERSION = "E"
    INTROVERSION = "I"
    SENSING = "S"
    INTUITION = "N"
    THINKING = "T"
    FEELING = "F"
    JUDGING = "J"
    PERCEIVING = "P"
