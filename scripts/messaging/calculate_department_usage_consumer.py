import pika # type: ignore
from records_callback import calculate_department_usage
from time_utils import get_timestamp

connection = pika.BlockingConnection(pika.ConnectionParameters("localhost"))
channel = connection.channel()

channel.queue_declare(queue="calculate_department_usage_queue", durable=True)
channel.queue_declare(queue="calculate_department_usage_result_queue", durable=True)

channel.basic_consume(queue="calculate_department_usage_queue", on_message_callback=calculate_department_usage)

print(f"[{get_timestamp()}][DEPT USAGE] Waiting for messages. To exit press CTRL+C")
channel.start_consuming()