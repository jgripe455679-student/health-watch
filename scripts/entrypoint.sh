#!/bin/bash

set -e

python count_patient_visit_consumer.py &
python aggregate_blood_pressure_trends_consumer.py &
python bmi_analysis_consumer.py &
python calculate_department_usage_consumer.py &
python patient_demographics_analysis_consumer.py &

wait