import pika # type: ignore
import logging
from records_callback import count_patient_visit_by_department
from records_callback import aggregate_health_metrics
# from profiles_callback import process_profiles

logging.basicConfig(level=logging.INFO)

connection = pika.BlockingConnection(pika.ConnectionParameters("localhost"))
channel = connection.channel()

channel.exchange_declare(exchange="record_analytics_exchange", exchange_type="direct", durable=True)

channel.queue_declare(queue="record_analytics_queue", durable=True)
channel.queue_declare(queue="department_record_count_result_queue", durable=True)
channel.queue_declare(queue="aggregate_health_metrics_result_queue", durable=True)
# channel.queue_declare(queue="profiles_queue", durable=True)

channel.queue_bind(exchange="record_analytics_exchange", queue="record_analytics_queue", routing_key="record_analytics_routing_key")
channel.queue_bind(exchange="record_analytics_exchange", queue="department_record_count_result_queue", routing_key="department_record_count_result_routing_key")
channel.queue_bind(exchange="record_analytics_exchange", queue="aggregate_health_metrics_result_queue", routing_key="aggregate_health_metrics_result_routing_key")

channel.basic_qos(prefetch_count=1)

channel.basic_consume(queue="record_analytics_queue", on_message_callback=count_patient_visit_by_department)
channel.basic_consume(queue="record_analytics_queue", on_message_callback=aggregate_health_metrics)
# channel.basic_consume(queue="profiles_queue", on_message_callback=process_profiles)

logging.info("Waiting for messages. To exit press CTRL+C")
channel.start_consuming()