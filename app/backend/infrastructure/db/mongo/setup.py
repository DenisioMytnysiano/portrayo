import pymongo
from infrastructure.db.mongo.database import database


async def setup_mongo():
    analysis_collection = database.get_collection("analyses")
    await analysis_collection.create_index([("created_by", pymongo.ASCENDING), ("id", pymongo.ASCENDING)])

    users_collection = database.get_collection("users")
    await users_collection.create_index([("username", pymongo.ASCENDING)])

    posts_collection = database.get_collection("posts")
    await posts_collection.create_index([("analysis_id", pymongo.ASCENDING)])

    scores_collection = database.get_collection("scores")
    await scores_collection.create_index([("analysis_id", pymongo.ASCENDING)])
