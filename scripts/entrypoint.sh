#!/bin/bash

set -e

python count_patient_visit_consumer.py &
python aggregate_health_condition_occurrence_consumer.py &
python calculate_service_usage_consumer.py &
python patient_demographics_analysis_consumer.py &
python record_count_descriptive_analytics_consumer.py &

wait