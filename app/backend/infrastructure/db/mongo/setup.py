import pymongo
from infrastructure.db.mongo.database import database


def setup_mongo():
    analysis_collection = database.get_collection("analyses")
    analysis_collection.create_index([("created_by", pymongo.ASCENDING), ("id", pymongo.ASCENDING)])

    users_collection = database.get_collection("users")
    users_collection.create_index([("username", pymongo.ASCENDING)])

    posts_collection = database.get_collection("posts")
    posts_collection.create_index([("analysis_id", pymongo.ASCENDING)])

    scores_collection = database.get_collection("scores")
    scores_collection.create_index([("analysis_id", pymongo.ASCENDING)])
