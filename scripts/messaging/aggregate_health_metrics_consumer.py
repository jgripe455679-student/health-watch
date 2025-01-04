import pika # type: ignore
from records_callback import aggregate_health_metrics
from time_utils import get_timestamp

connection = pika.BlockingConnection(pika.ConnectionParameters("localhost"))
channel = connection.channel()

channel.queue_declare(queue="aggregate_health_metrics_queue", durable=True)
channel.queue_declare(queue="aggregate_health_metrics_result_queue", durable=True)

channel.basic_consume(queue="aggregate_health_metrics_queue", on_message_callback=aggregate_health_metrics)

print(f"[{get_timestamp()}][HEALTH METRICS] Waiting for messages. To exit press CTRL+C")
channel.start_consuming()