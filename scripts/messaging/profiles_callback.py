import json
import logging
import pandas as pd # type: ignore
import pika # type: ignore

education_levels = [
    "NO FORMAL EDUCATION", "SOME ELEMENTARY", "ELEMENTARY GRADUATE",
    "SOME JUNIOR HIGH SCHOOL", "JUNIOR HIGH SCHOOL GRADUATE",
    "SOME SENIOR HIGH SCHOOL", "SENIOR HIGH SCHOOL GRADUATE",
    "SOME COLLEGE", "COLLEGE GRADUATE", "POSTGRADUATE STUDIES"
]

income_brackets = [
    "POOR", "LOW INCOME (BUT NOT POOR)", "LOWER MIDDLE CLASS",
    "MIDDLE CLASS", "UPPER MIDDLE INCOME", "HIGH INCOME (BUT NOT RICH)",
    "RICH"
]

def demographics_analysis(ch, method, properties, body):
    def determine_socioeconomic_class(educational_background, income_bracket):
        if educational_background in education_levels[:5] and income_bracket in income_brackets[:2]:
            return "Lower Class"
        elif educational_background in education_levels[5:8] and income_bracket in income_brackets[2:4]:
            return "Lower Middle Class"
        elif educational_background in education_levels[8:] and income_bracket in income_brackets[4:6]:
            return "Upper Middle Class"
        elif educational_background in education_levels[8:] and income_bracket == income_brackets[6]:
            return "Upper Class"
        else:
            return "Unclassified"
    def analyze_data(data):
        df = pd.DataFrame(data)
        df["occupation"] = df["occupation"].fillna("Unknown")
        df["educationalBackground"] = df["educationalBackground"].fillna("Unknown")
        df["householdSize"] = df["householdSize"].fillna("Unknown")
        df["incomeBracket"] = df["incomeBracket"].fillna("Unknown")
        df["socioeconomic_class"] = df.apply(
            lambda row: determine_socioeconomic_class(row["educationalBackground"], row["incomeBracket"]),
            axis=1
        )
        class_distribution = df.groupby(["socioeconomic_class"]).size().reset_index(name="profileCount")
        return class_distribution.to_json()
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
        logging.error("Error processing demographics analysis: %s", e)
        ch.basic_nack(delivery_tag=method.delivery_tag)