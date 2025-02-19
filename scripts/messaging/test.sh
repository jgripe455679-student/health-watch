#!/bin/bash

VENV_PATH="venv/bin/activate"

SCRIPT1="count_patient_visit_consumer.py"
SCRIPT2="aggregate_blood_pressure_trends_consumer.py"
SCRIPT3="bmi_analysis_consumer.py"
SCRIPT4="calculate_department_usage_consumer.py"
SCRIPT5="patient_demographics_analysis_consumer.py"

# Open the first terminal window
gnome-terminal -- bash -c "
cd dev/projects/health-watch/scripts &&
source $VENV_PATH &&
cd messaging &&
python $SCRIPT1;
exec bash"


# Open the second terminal window
gnome-terminal -- bash -c "
cd dev/projects/health-watch/scripts &&
source $VENV_PATH &&
cd messaging &&
python $SCRIPT2;
exec bash"

# Open the third terminal window
gnome-terminal -- bash -c "
cd dev/projects/health-watch/scripts &&
source $VENV_PATH &&
cd messaging &&
python $SCRIPT3;
exec bash"

# Open the fourth terminal window
gnome-terminal -- bash -c "
cd dev/projects/health-watch/scripts &&
source $VENV_PATH &&
cd messaging &&
python $SCRIPT4;
exec bash"

# Open the fifth terminal window
gnome-terminal -- bash -c "
cd dev/projects/health-watch/scripts &&
source $VENV_PATH &&
cd messaging &&
python $SCRIPT5;
exec bash"