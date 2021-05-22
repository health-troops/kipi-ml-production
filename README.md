[![Testing](https://github.com/health-troops/kipi-ml-production/actions/workflows/github-actions-test.yml/badge.svg)](https://github.com/health-troops/kipi-ml-production/actions/workflows/github-actions-test.yml)

# HOW TO RUN (Windows)

$TESTDATA="$(pwd)"

docker run -d --rm -p 8501:8501 --mount type=bind,source=$TESTDATA/my_model,target=/models/my_model/1 -e MODEL_NAME=my_model -t tensorflow/serving

npm start

# HOW TO RUN (Linux)

TESTDATA="$(pwd)"

docker run -d --rm -p 8501:8501 --mount type=bind,source=$TESTDATA/my_model,target=/models/my_model/1 -e MODEL_NAME=my_model -t tensorflow/serving

npm start
