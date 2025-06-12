import pika # type: ignore
from custom_logger import setup_logger
from config import RABBITMQ_HOST, RABBITMQ_PORT, RABBITMQ_DEFAULT_USER, RABBITMQ_DEFAULT_PASSWORD
import time
from records_callback import calculate_service_usage

logger = setup_logger("SERVICE USAGE")

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

    channel.queue_declare(queue="calculate_service_usage_queue", durable=True)
    channel.queue_declare(queue="calculate_service_usage_result_queue", durable=True)
    
    channel.basic_consume(queue="calculate_service_usage_queue", on_message_callback=calculate_service_usage)
    
    logger.info("Waiting for messages. To exit press CTRL+C")
    channel.start_consuming()

if __name__ == "__main__":
    main()