import pika # type: ignore
from records_callback import count_patient_visit
from time_utils import get_timestamp

connection = pika.BlockingConnection(pika.ConnectionParameters("localhost"))
channel = connection.channel()

channel.queue_declare(queue="count_patient_visit_queue", durable=True)
channel.queue_declare(queue="count_patient_visit_result_queue", durable=True)

channel.basic_consume(queue="count_patient_visit_queue", on_message_callback=count_patient_visit)

print(f"[{get_timestamp()}][PATIENT COUNTER] Waiting for messages. To exit press CTRL+C")
channel.start_consuming()