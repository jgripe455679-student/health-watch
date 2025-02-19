import os
# from dotenv import load_dotenv # type: ignore

### for Local Environment
# load_dotenv("../../.env.development") 

RABBITMQ_HOST = os.getenv("RABBITMQ_HOST", "localhost")
RABBITMQ_PORT = os.getenv("RABBITMQ_PORT", 5672)
RABBITMQ_DEFAULT_USER = os.getenv("RABBITMQ_DEFAULT_USER", "guest")
RABBITMQ_DEFAULT_PASSWORD = os.getenv("RABBITMQ_DEFAULT_PASS", "guest")