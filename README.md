# HOW TO RUN (Windows)

$TESTDATA="$(pwd)"

docker run -d --rm -p 8501:8501 --mount type=bind,source=$TESTDATA/my_model,target=/models/my_model/1 -e MODEL_NAME=my_model -t tensorflow/serving

After that run nodejs on app.js

# HOW TO RUN (Linux *untested)

TESTDATA="$(pwd)"

docker run -d --rm -p 8501:8501 --mount type=bind,source=$TESTDATA/my_model,target=/models/my_model/1 -e MODEL_NAME=my_model -t tensorflow/serving

After that run nodejs on app.js
