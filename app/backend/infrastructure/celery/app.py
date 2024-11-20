from celery import Celery
from dotenv import load_dotenv
from infrastructure.messaging.rabbitmq.config import RabbitMQConfig
from infrastructure.db.mongo.config import MongoConfig
load_dotenv()

app = Celery('portrayo', include=["infrastructure.celery.tasks"])

app.conf.update(
    broker_url=RabbitMQConfig.URL,
    result_backend=MongoConfig.URL,
    mongodb_backend_settings = {
        "database": MongoConfig.DB_NAME,
        "taskmeta_collection": "celery-task-meta"
    },
    task_serializer='pickle',
    result_serializer='pickle',
    accept_content=['pickle'],
    timezone='UTC',
    worker_prefetch_multiplier=1,
    task_acks_late=True,
)
