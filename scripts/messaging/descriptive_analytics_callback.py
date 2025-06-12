import json
import logging
import pandas as pd # type: ignore
from datetime import datetime
import pika # type: ignore
import numpy as np # type: ignore
from typing import Union
# from scipy.signal import find_peaks # type: ignore
from nlg_components import NLGTemplate
from dataclasses import dataclass, asdict

@dataclass
class DescriptiveAnalytics:
    analytics: list
    description: str

def get_percentages(df: pd.DataFrame, column: str) -> pd.DataFrame:
    if df is None:
        raise ValueError(f"Unsupported pd.DataFrame: {df}")
    if column is None:
        raise ValueError(f"Unsupported str: {column}")
    aggregated = (
        df
        .groupby(column, as_index=False)
        ["recordCount"]
        .sum()
        .sort_values(by="recordCount", ascending=False)
        )
    aggregated.reset_index(drop=True, inplace=True)
    total = aggregated["recordCount"].sum()
    aggregated = compute_percentage(aggregated, total)
    return aggregated

def append_growth_rates(raw_df: pd.DataFrame, agg_df: pd.DataFrame, column: str) -> pd.DataFrame:
    rows = len(agg_df)
    for i in range(0, rows):
        temp = raw_df[raw_df[column] == agg_df.loc[i, column]]
        start_date, end_date = extract_dates(temp)
        category = classify_category(start_date, end_date)
        result = compute_growth_rate(temp, category)
        agg_df.loc[i, "rateOfChange"] = result.iloc[-1]["rateOfChange"]
    return agg_df

def classify_category(start_period: datetime.date, end_period: datetime.date) -> str:
    span = (end_period - start_period).days
            
    DEFAULT_SHORT = 90
    DEFAULT_MEDIUM = 365
            
    short_thresh, med_thresh = DEFAULT_SHORT, DEFAULT_MEDIUM
            
    if span <= short_thresh:
        return "short"
    elif span <= med_thresh:
        return "medium"
    else:
        return "long"

def compute_growth_rate(df: pd.DataFrame, category: str, na_fill: float = 0.0) -> pd.DataFrame:
    df.set_index("recordDate", inplace=True)
    df.sort_index(inplace=True)
    
    if category == "long":
        agg = df["recordCount"].resample("W-MON").sum(min_count=1)
        smooth = agg.rolling(window=3, min_periods=1).mean()
        roc = (
            smooth
            .pct_change(periods=4)
            .multiply(100)
            .round(1)
            .to_frame(name="rateOfChange")
            )
        roc["rateOfChange"] = roc["rateOfChange"].fillna(na_fill)
        roc = (
            roc
            .rename_axis("recordDate")
            .reset_index()
            )
        roc["recordDate"] = roc["recordDate"].dt.strftime("%Y-%m-%d")
        return roc
    elif category == "medium":
        agg = df["recordCount"].resample("D").sum(min_count=1)
        smooth = agg.rolling(window=2, min_periods=1).mean()
        snapshot = smooth.resample("W-MON").last()
    else:
        agg = df["recordCount"]
        smooth = agg.rolling(window=2, min_periods=1).mean()
        snapshot = smooth
        
    roc = (
        snapshot
        .pct_change()
        .multiply(100)
        .round(1)
        .to_frame(name="rateOfChange")
        )
    roc["rateOfChange"] = roc["rateOfChange"].fillna(na_fill)
    roc = (
        roc
        .rename_axis("recordDate")
        .reset_index()
        )
    roc["recordDate"] = roc["recordDate"].dt.strftime("%Y-%m-%d")    
    return roc
        
def compute_percentage(df: pd.DataFrame, total: int) -> pd.DataFrame:
    df["percentage"] = (df["recordCount"] / total) * 100
    df["percentage"] = df["percentage"].map(lambda x: f"{x:.2f}")
    return df

def extract_dates(df: pd.DataFrame) -> tuple[pd.to_datetime, pd.to_datetime]:
    if df is None:
        raise ValueError(f"Unsupported pd.DataFrame: {df}")
    df = df.sort_values("recordDate").reset_index(drop=True)
    return df.loc[0, "recordDate"], df.loc[df.index[-1], "recordDate"]

def load_dataframe(data: pd.DataFrame) -> pd.DataFrame:
    df = pd.DataFrame(data)
    df["recordDate"] = pd.to_datetime(df["recordDate"], format="%Y-%m-%d")
    df["recordCount"] = pd.to_numeric(df["recordCount"])
    return df

def record_count_descriptive_analytics(ch, method, properties, body):        
    def analyze_data(records: list) -> DescriptiveAnalytics:
        df = load_dataframe(records)
        start_date, end_date = extract_dates(df)
        category = classify_category(start_date, end_date)
        df = compute_growth_rate(df, category)
        growth_rate = df.iloc[-1]["rateOfChange"]
        
        start_str = start_date.date().strftime("%Y-%m-%d")
        end_str = end_date.date().strftime("%Y-%m-%d")
        
        templates = [
            "From {start_period} to {end_period}, {metric} {verb} by {growth_rate}%.",
            "Between {start_period} and {end_period}, {metric} {verb} by {growth_rate}%.",
            "During the period from {start_period} to {end_period}, {metric} {verb} by {growth_rate}%.",
            "From {start_period} through {end_period}, {metric} {verb} by {growth_rate}%.",
            "In the timeframe spanning {start_period} to {end_period}, {metric} {verb} by {growth_rate}%."
        ]
        
        tmpl = NLGTemplate(templates=templates)
        description = tmpl.generate_record_count_descriptive_analytics("patient visits", growth_rate, start_str, end_str)
        analytics = df.to_dict(orient="records")
        
        return DescriptiveAnalytics(analytics=analytics, description=description)
    
    try:    
        record_list = json.loads(body)
        analyzed_data = analyze_data(record_list)
        json_string = asdict(analyzed_data)
        response = json.dumps(json_string)
        ch.basic_publish(
            exchange="",
            routing_key="record_count_descriptive_analytics_result_queue",
            body=response,
            properties=pika.BasicProperties(
                content_type="application/json",
                delivery_mode=2
            )
        )
        ch.basic_ack(delivery_tag=method.delivery_tag)
        
    except Exception as e:
        logging.error("Error processing record_count descriptive analytics: %s" % e)
        ch.basic_nack(delivery_tag=method.delivery_tag, requeue=False)

def service_usage_descriptive_analytics(ch, method, properties, body):
    def extract_top_result(df: pd.DataFrame) -> tuple[str, float]:
        if df is None:
            raise ValueError(f"Unsupported pd.DataFrame: {df}")
        return df.loc[0, "service"], df.loc[0, "percentage"]
    
    def analyze_data(records: list) -> DescriptiveAnalytics:
        df = load_dataframe(records)
        start_date, end_date = extract_dates(df)
        df = get_percentages(df, column="service")
        service_name, highest_percentage =  extract_top_result(df)
        
        templates = ["{service} {verb} {percentage}% of {metric} from {start_period} to {end_period}.",
                     "In the timeframe spanning {start_period} to {end_period}, {service} {verb} {percentage}% of {metric}.",
                     "From {start_period} through {end_period}, {service} {verb} {percentage}% of {metric}.",
                     "Between {start_period} and {end_period}, {service} {verb} {percentage}% of {metric}."]
        
        start_str = start_date.date().strftime("%Y-%m-%d")
        end_str = end_date.date().strftime("%Y-%m-%d")
        
        tmpl = NLGTemplate(templates=templates)
        description = tmpl.generate_service_usage_descriptive_analytics("patient visits", service_name, highest_percentage, start_str, end_str)
        
        analytics = df.to_dict(orient="records")
        
        return DescriptiveAnalytics(analytics=analytics, description=description)
        
    try:
        service_usage = json.loads(body)
        analyzed_data = analyze_data(service_usage)
        json_string = asdict(analyzed_data)
        response = json.dumps(json_string)
        ch.basic_publish(
            exchange="",
            routing_key="service_usage_descriptive_analytics_result_queue",
            body=response,
            properties=pika.BasicProperties(
                content_type="application/json",
                delivery_mode=2
            )
        )
        ch.basic_ack(delivery_tag=method.delivery_tag)
        
    except Exception as e:
        logging.error("Error processing service_usage descriptive analytics: %s" % e)
        ch.basic_nack(delivery_tag=method.delivery_tag, requeue=False)

def health_condition_occurrence_descriptive_analytics(ch, method, properties, body):
    def extract_top_result(df: pd.DataFrame) -> tuple[str, float, float]:
        if df is None:
            raise ValueError(f"Unsupported pd.DataFrame: {df}")
        return df.loc[0, "healthCondition"], df.loc[0, "percentage"], df.loc[0, "rateOfChange"]
    
    def analyze_data(records: list) -> DescriptiveAnalytics:
        df = load_dataframe(records)
        start_date, end_date = extract_dates(df)
        agg = get_percentages(df, column="healthCondition")
        agg = append_growth_rates(df, agg, column="healthCondition")
        health_condition, highest_percentage, rate_of_change = extract_top_result(agg)
        
        templates = [
            "From {start_period} to {end_period}, {health_condition} {verb} {percentage}% of all {metric}, {indicator} a {rate_of_change}% {trend} compared to the previous period.",
            "Between {start_period} and {end_period}, {health_condition} {verb} {percentage}% of total {metric}, {indicator} a {rate_of_change}% {trend} relative to the earlier period.",
            "During the period from {start_period} to {end_period}, {health_condition} {verb} {percentage}% of all {metric}, {indicator} a {rate_of_change}% {trend} compared to the preceding period.",
            "From {start_period} through {end_period}, {health_condition} {verb} {percentage}% of {metric}, {indicator} a {rate_of_change}% {trend} relative to the earlier period.",
            "In the timeframe spanning {start_period} to {end_period}, {health_condition} {verb} {percentage}% of all {metric}, {indicator} a {rate_of_change}% {trend} from the preceding period."
            ]
        
        start_str = start_date.date().strftime("%Y-%m-%d")
        end_str = end_date.date().strftime("%Y-%m-%d")
        
        tmpl = NLGTemplate(templates=templates)
        description = tmpl.generate_health_condition_occurrence_descriptive_analytics("health records", health_condition, highest_percentage, rate_of_change, start_str, end_str)
        
        analytics = agg.to_dict(orient="records")
        
        return DescriptiveAnalytics(analytics=analytics, description=description)
            
    try:
        health_condition_occurrence = json.loads(body)
        analyzed_data = analyze_data(health_condition_occurrence)
        json_string = asdict(analyzed_data)
        response = json.dumps(json_string)
        ch.basic_publish(
            exchange="",
            routing_key="health_condition_occurrence_descriptive_analytics_result_queue",
            body=response,
            properties=pika.BasicProperties(
                content_type="application/json",
                delivery_mode=2
            )
        )
        ch.basic_ack(delivery_tag=method.delivery_tag)
        
    except Exception as e:
        logging.error("Error processing health_condition_occurrence descriptive analytics: %s" % e)
        ch.basic_nack(delivery_tag=method.delivery_tag, requeue=False)

def medical_problem_occurrence_descriptive_analytics(ch, method, properties, body):
    def extract_top_result(df: pd.DataFrame) -> tuple[str, float, float]:
        if df is None:
            raise ValueError(f"Unsupported pd.DataFrame: {df}")
        return df.loc[0, "medicalProblem"], df.loc[0, "percentage"], df.loc[0, "rateOfChange"]
    def extract_health_condition(df: pd.DataFrame) -> str:
        if df is None:
            raise ValueError(f"Unsupported pd.DataFrame: {df}")
        return df.loc[0, "healthCondition"]
    def analyze_data(records: list) -> DescriptiveAnalytics:
        df = load_dataframe(records)
        health_condition = extract_health_condition(df)
        start_date, end_date = extract_dates(df)
        agg = get_percentages(df, column="medicalProblem")
        agg = append_growth_rates(df, agg, column="medicalProblem")
        medical_problem, highest_percentage, rate_of_change = extract_top_result(agg)
        
        templates = [
            "From {start_period} to {end_period}, {medical_problem} {verb} {percentage}% of all {metric} under {health_condition}, {indicator} a {rate_of_change}% {trend} compared to the previous period.",
            "Between {start_period} and {end_period}, {medical_problem} {verb} {percentage}% of total {metric} under {health_condition}, {indicator} a {rate_of_change}% {trend} relative to the earlier period.",
            "During the period from {start_period} to {end_period}, {medical_problem} {verb} {percentage}% of all {metric} under {health_condition}, {indicator} a {rate_of_change}% {trend} compared to the preceding period.",
            "From {start_period} through {end_period}, {medical_problem} {verb} {percentage}% of {metric} under {health_condition}, {indicator} a {rate_of_change}% {trend} relative to the earlier period.",
            "In the timeframe spanning {start_period} to {end_period}, {medical_problem} {verb} {percentage}% of all {metric} under {health_condition}, {indicator} a {rate_of_change}% {trend} from the preceding period."
            ]
        
        start_str = start_date.date().strftime("%Y-%m-%d")
        end_str = end_date.date().strftime("%Y-%m-%d")
        
        tmpl = NLGTemplate(templates=templates)
        description = tmpl.generate_medical_problem_occurrence_descriptive_analytics("health records", health_condition, medical_problem, highest_percentage, rate_of_change, start_str, end_str)

        analytics = agg.to_dict(orient="records")
        
        return DescriptiveAnalytics(analytics, description)
        
    try:
        medical_problem_occurrence = json.loads(body)
        analyzed_data = analyze_data(medical_problem_occurrence)
        json_string = asdict(analyzed_data)
        response = json.dumps(json_string)
        ch.basic_publish(
            exchange="",
            routing_key="medical_problem_occurrence_descriptive_analytics_result_queue",
            body=response,
            properties=pika.BasicProperties(
                content_type="application/json",
                delivery_mode=2
            )
        )
        ch.basic_ack(delivery_tag=method.delivery_tag)
        
    except Exception as e:
        logging.error("Error processing medical_problem_occurrence descriptive analytics: %s" % e)
        ch.basic_nack(delivery_tag=method.delivery_tag, requeue=False)

def demographics_analysis_descriptive_analytics(ch, method, properties, body):
    def extract_top_result(df: pd.DataFrame) -> tuple[str, float]:
        return df.loc[0, "ageGroup"], df.loc[0, "percentage"]
    def analyze_data(analysis: list):
        df = pd.DataFrame(analysis)
        df["percentage"] = pd.to_numeric(df["percentage"])
        age_group, percentage = extract_top_result(df)
        templates = [
            "The {age_group} population {verb} {percentage}% when analyzing all {metric}.",
            "Within the complete {metric}, {percentage}% {verb} {age_group} individuals.",
            "The demographic breakdown showed that {age_group} {verb} {percentage}% of all {metric}.",
            "Across all {metric}, {percentage}% fell within the {age_group} category.",
            "Of all {metric}, {percentage}% were {verb} by {age_group}"
        ]
        tmpl = NLGTemplate(templates=templates)
        description = tmpl.generate_demographics_analysis_descriptive_analytics("patient profiles", age_group, percentage)

        analytics = df.to_dict(orient="records")
        return DescriptiveAnalytics(analytics, description)
        
    try:
        demographics_analysis = json.loads(body)
        analyzed_data = analyze_data(demographics_analysis)
        json_string = asdict(analyzed_data)
        response = json.dumps(json_string)
        ch.basic_publish(
            exchange="",
            routing_key="demographics_analysis_descriptive_analytics_result_queue",
            body=response,
            properties=pika.BasicProperties(
                content_type="application/json",
                delivery_mode=2
            )
        )
        ch.basic_ack(delivery_tag=method.delivery_tag)
        
    except Exception as e:
        logging.error("Error processing demographics_analysis descriptive analytics: %s" % e)
        ch.basic_nack(delivery_tag=method.delivery_tag, requeue=False)