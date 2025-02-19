import pika # type: ignore
from profiles_callback import demographics_analysis
from time_utils import get_timestamp
from custom_logger import setup_logger
from config import RABBITMQ_HOST, RABBITMQ_PORT, RABBITMQ_DEFAULT_USER, RABBITMQ_DEFAULT_PASSWORD
import time

logger = setup_logger("DEMOGRAPHICS ANALYSIS")

def main():
    def create_connection(retries=5, delay=5):
        host = RABBITMQ_HOST
        port = RABBITMQ_PORT
        user = RABBITMQ_DEFAULT_USER
        password = RABBITMQ_DEFAULT_PASSWORD
        credentials = pika.PlainCredentials(user, password)
        parameters = pika.ConnectionParameters(host=host, port=port, credentials=credentials)
        
        for attempt in range(retries):
            try:
                connection = pika.BlockingConnection(parameters)
                return connection
            except pika.exceptions.AMQPConnectionError as e:
                print(f"Attempt {attempt + 1} failed: {e}. Retrying in {delay} seconds.")
                time.sleep(delay)
        raise Exception("Could not connect to RabbitMQ after several attempts.")
    
    connection = create_connection()
    channel = connection.channel()

    channel.exchange_declare(exchange="raw_profiles_exchange", exchange_type="direct", durable=True)
    channel.queue_declare(queue="profile_demographics_analysis_queue", durable=True)
    channel.queue_declare(queue="profile_demographics_analysis_result_queue", durable=True)
    channel.queue_bind(exchange="raw_profiles_exchange", queue="profile_demographics_analysis_queue", routing_key="profile_demographics_analysis_routing_key")
    channel.queue_bind(exchange="raw_profiles_exchange", queue="profile_demographics_analysis_result_queue", routing_key="profile_demographics_analysis_result_routing_key")

    channel.basic_consume(queue="profile_demographics_analysis_queue", on_message_callback=demographics_analysis)

    logger.info("Waiting for messages. To exit press CTRL+C")
    channel.start_consuming()

if __name__ == "__main__":
    main()
