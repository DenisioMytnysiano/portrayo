from motor.motor_tornado import MotorClient
from infrastructure.db.mongo.config import MongoConfig

client = MotorClient(MongoConfig.URL)
database = client.get_database(MongoConfig.DB_NAME)