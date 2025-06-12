import json
import pandas as pd # type: ignore
import pika # type: ignore
import numpy as np # type: ignore

def count_patient_visit(ch, method, properties, body):
    def analyze_data(data):
        df = pd.DataFrame(data)
        df["recordDate"] = pd.to_datetime(df["recordDate"], format="%Y-%m-%d")
        analyzed_data = df.groupby(["recordDate"]).size().reset_index(name="recordCount")
        return analyzed_data.to_json()
    try:
        records = json.loads(body)
        analyzed_data = analyze_data(records)
        response = json.dumps(analyzed_data)
        ch.basic_publish(
            exchange="",
            routing_key="count_patient_visit_result_queue",
            body=response,
            properties=pika.BasicProperties(
                content_type="application/json",
                delivery_mode=2
            )
        )
        ch.basic_ack(delivery_tag=method.delivery_tag)
    except Exception as e:
        print("Error processing patient visit: %s" % e)
        ch.basic_nack(delivery_tag=method.delivery_tag, requeue=False)

def aggregate_health_condition_occurrence(ch, method, properties, body):
    def analyze_data(data):
        df = pd.DataFrame(data)        
        df["recordDate"] = pd.to_datetime(df["recordDate"], format="%Y-%m-%d")
        df = (
            df.groupby(["recordDate", "healthCondition"])
            .size()
            .reset_index(name="recordCount")
        )
        return df.to_json()
    try:
        records = json.loads(body)
        analyzed_data = analyze_data(records)
        response = json.dumps(analyzed_data)
        ch.basic_publish(
            exchange="",
            routing_key="aggregate_health_condition_occurrence_result_queue",
            body=response,
            properties=pika.BasicProperties(
                content_type="application/json",
                delivery_mode=2
            )
        )
        ch.basic_ack(delivery_tag=method.delivery_tag)
    except Exception as e:
        print("Error processing health condition occurrence: %s" % e)
        ch.basic_nack(delivery_tag=method.delivery_tag, requeue=False)
        
def calculate_service_usage(ch, method, properties, body):
    def analyze_data(data):
        df = pd.DataFrame(data)
        df["recordDate"] = pd.to_datetime(df["recordDate"], format="%Y-%m-%d")
        analyzed_data = df.groupby(["recordDate", "service"]).size().reset_index(name="recordCount")
        return analyzed_data.to_json()
    try:
        records = json.loads(body)
        analyzed_data = analyze_data(records)
        response = json.dumps(analyzed_data)
        ch.basic_publish(
            exchange="",
            routing_key="calculate_service_usage_result_queue",
            body=response,
            properties=pika.BasicProperties(
                content_type="application/json",
                delivery_mode=2
            )
        )
        ch.basic_ack(delivery_tag=method.delivery_tag)

    except Exception as e:
         print("Error processing service usage: %s" % e)
         ch.basic_nack(delivery_tag=method.delivery_tag, requeue=False)
         
def tally_medical_problem_occurrence(ch, method, properties, body):
    def analyze_data(records: list):
        df = pd.DataFrame(records)
        df["recordDate"] = pd.to_datetime(df["recordDate"], format="%Y-%m-%d")
        analyzed_data = df.groupby(["recordDate", "healthCondition", "medicalProblem"]).size().reset_index(name="recordCount")
        return analyzed_data.to_json()
    try:
        records = json.loads(body)
        analyzed_data = analyze_data(records)
        response = json.dumps(analyzed_data)
        ch.basic_publish(
            exchange="",
            routing_key="tally_medical_problem_occurrence_result_queue",
            body=response,
            properties=pika.BasicProperties(
                content_type="application/json",
                delivery_mode=2
            )
        )
        ch.basic_ack(delivery_tag=method.delivery_tag)
    except Exception as e:
        print("Error processing medical problem occurrence: %s" % e)
        ch.basic_nack(delivery_tag=method.delivery_tag, requeue=False)
        