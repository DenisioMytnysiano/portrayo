from enum import Enum


class BigFiveTraits(str, Enum):
    OPENNESS = "openness"
    CONSCIENTIOUSNESS = "conscientiousness"
    EXTRAVERSION = "extraversion"
    AGREEABLENESS = "agreeableness"
    NEUROTICISM = "neuroticism"


class MBTITraits(str, Enum):
    EXTRAVERSION = "E"
    INTROVERSION = "I"
    SENSING = "S"
    INTUITION = "N"
    THINKING = "T"
    FEELING = "F"
    JUDGING = "J"
    PERCEIVING = "P"
