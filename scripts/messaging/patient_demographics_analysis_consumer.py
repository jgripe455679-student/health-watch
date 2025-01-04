import pika # type: ignore
from profiles_callback import demographics_analysis
from time_utils import get_timestamp

connection = pika.BlockingConnection(pika.ConnectionParameters("localhost"))
channel = connection.channel()

channel.exchange_declare(exchange="raw_profiles_exchange", exchange_type="direct", durable=True)
channel.queue_declare(queue="profile_demographics_analysis_queue", durable=True)
channel.queue_declare(queue="profile_demographics_analysis_result_queue", durable=True)
channel.queue_bind(exchange="raw_profiles_exchange", queue="profile_demographics_analysis_queue", routing_key="profile_demographics_analysis_routing_key")
channel.queue_bind(exchange="raw_profiles_exchange", queue="profile_demographics_analysis_result_queue", routing_key="profile_demographics_analysis_result_routing_key")

channel.basic_consume(queue="profile_demographics_analysis_queue", on_message_callback=demographics_analysis)

print(f"[{get_timestamp()}][DEMOGRAPHICS ANALYSIS] Waiting for messages. To exit press CTRL+C")
channel.start_consuming()
