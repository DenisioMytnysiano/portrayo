from typing import Optional
from domain.entities.user import User
from domain.repositories.user_repository import UserRepository

class MongoUserRepository(UserRepository):
    def __init__(self, database):
        self.collection = database.get_collection("users")

    async def create_user(self, user: User) -> None:
        user_dict = user.__dict__
        await self.collection.insert_one(user_dict)

    async def get_user(self, username: str) -> Optional[User]:
        user_data = await self.collection.find_one({"username": username}, {"_id": 0})
        if user_data:
            return User(**user_data)
        return None

    async def update_user(self, user: User) -> None:
        user_dict = user.__dict__
        await self.collection.update_one({"username": user.username}, {"$set": user_dict})

    async def delete_user(self, username: str) -> None:
        await self.collection.delete_one({"username": username})

