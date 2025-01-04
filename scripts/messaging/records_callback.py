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
        print("Error processing patient visit: %s", e)
        ch.basic_nack(delivery_tag=method.delivery_tag, requeue=False)

def aggregate_health_metrics(ch, method, properties, body):
    def analyze_data(data):
        df = pd.DataFrame(data)
        df.replace("", np.nan, inplace=True)
        df["height"] = pd.to_numeric(df["height"], errors="coerce")
        df["weight"] = pd.to_numeric(df["weight"], errors="coerce")
        df[["systolic", "diastolic"]] = df["bloodPressure"].str.split("/", expand=True)
        df["systolic"] = pd.to_numeric(df["systolic"], errors="coerce")
        df["diastolic"] = pd.to_numeric(df["diastolic"], errors="coerce")
        
        df["height"] = df["height"].fillna(df["height"].mean())
        df["weight"] = df["weight"].fillna(df["weight"].mean())
        df["systolic"] = df["systolic"].fillna(df["systolic"].mean())
        df["diastolic"] = df["diastolic"].fillna(df["diastolic"].mean())
        
        df["recordDate"] = pd.to_datetime(df["recordDate"], format="%Y-%m-%d")
        
        df.set_index("recordDate", inplace=True)
        
        aggregated = df.resample("ME").agg({
            "height": ["mean", "median", "std"],
            "weight": ["mean", "median", "std"],
            "systolic": ["mean", "median", "std"],
            "diastolic": ["mean", "median", "std"]
        }).reset_index()
    
        aggregated.columns = ["_".join(col).strip("_") for col in aggregated.columns]
        return aggregated.to_json()
    try:
        records = json.loads(body)
        analyzed_data = analyze_data(records)
        response = json.dumps(analyzed_data)
        ch.basic_publish(
            exchange="",
            routing_key="aggregate_health_metrics_result_queue",
            body=response,
            properties=pika.BasicProperties(
                content_type="application/json",
                delivery_mode=2
            )
        )
        ch.basic_ack(delivery_tag=method.delivery_tag)
    except Exception as e:
        print("Error processing health metrics: %s", e)
        ch.basic_nack(delivery_tag=method.delivery_tag, requeue=False)
        
def calculate_department_usage(ch, method, properties, body):
    def analyze_data(data):
        df = pd.DataFrame(data)
        df["recordDate"] = pd.to_datetime(df["recordDate"], format="%Y-%m-%d")
        analyzed_data = df.groupby(["department", "recordDate"]).size().reset_index(name="recordCount")
        return analyzed_data.to_json()
    try:
        records = json.loads(body)
        analyzed_data = analyze_data(records)
        response = json.dumps(analyzed_data)
        ch.basic_publish(
            exchange="",
            routing_key="calculate_department_usage_result_queue",
            body=response,
            properties=pika.BasicProperties(
                content_type="application/json",
                delivery_mode=2
            )
        )
        ch.basic_ack(delivery_tag=method.delivery_tag)
    except Exception as e:
         print("Error processing department usage: %s", e)
         ch.basic_nack(delivery_tag=method.delivery_tag, requeue=False)
        