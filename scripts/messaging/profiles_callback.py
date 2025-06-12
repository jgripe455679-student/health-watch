import json
import logging
import pandas as pd # type: ignore
import numpy as np # type:ignore
import pika # type: ignore

def demographics_analysis(ch, method, properties, body):
    def analyze_data(profiles: list) -> json:
        df = pd.DataFrame(profiles)
        df["age"] = pd.to_numeric(df["age"], errors="coerce")
        bins = [0, 5, 13, 20, 40, 60, np.inf]
        labels = [
            "0-4 years old",
            "5-12 years old",
            "13-19 years old",
            "20-39 years old",
            "40-59 years old",
            "60+ years old"
            ]
        df["ageGroup"] = pd.cut(
            df["age"],
            bins=bins,
            labels=labels,
            right=False,
            include_lowest=True
            )
        age_group_counts = df["ageGroup"].value_counts(normalize=True).sort_index()
        age_group_percentages = age_group_counts * 100
        result = pd.DataFrame({
            "ageGroup": age_group_percentages.index,
            "percentage": age_group_percentages.values
            })
        result = result.sort_values("percentage", ascending=False)
        result["percentage"] = result["percentage"].map(lambda x: f"{x:.2f}")
        result = result.reset_index(drop=True)
        return result.to_json()
    try:
        profiles = json.loads(body)
        analyzed_data = analyze_data(profiles)
        response = json.dumps(analyzed_data)
        ch.basic_publish(
            exchange="raw_profiles_exchange",
            routing_key="profile_demographics_analysis_result_routing_key",
            body=response,
            properties=pika.BasicProperties(
                content_type="application/json",
                delivery_mode=2
                )
            )
        ch.basic_ack(delivery_tag=method.delivery_tag)
    except Exception as e:
        logging.error("Error processing demographics analysis: %s" % e)
        ch.basic_nack(delivery_tag=method.delivery_tag)