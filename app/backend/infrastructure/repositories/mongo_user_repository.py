from typing import Optional
from domain.entities.user import User
from domain.repositories.user_repository import UserRepository

class MongoUserRepository(UserRepository):
    def __init__(self, database):
        self.collection = database.get_collection("users")

    def create_user(self, user: User) -> None:
        user_dict = user.__dict__
        self.collection.insert_one(user_dict)

    def get_user(self, username: str) -> Optional[User]:
        user_data = self.collection.find_one({"username": username}, {"_id": 0})
        if user_data:
            return User(**user_data)
        return None

    def update_user(self, user: User) -> None:
        user_dict = user.__dict__
        self.collection.update_one({"username": user.username}, {"$set": user_dict})

    def delete_user(self, username: str) -> None:
        self.collection.delete_one({"username": username})
