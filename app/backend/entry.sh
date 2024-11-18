#!/bin/bash
if [ "$APP_MODE" = "backend" ]; then
    echo "Starting FastAPI application..."
    exec python main.py
elif [ "$APP_MODE" = "worker" ]; then
    echo "Starting Celery worker..."
    exec celery -A infrastructure.celery.app  worker --loglevel=INFO -Q run-analysis,update-analysis-status,analyze-profile,aggregate-scores
elif [ "$APP_MODE" = "model" ]; then
    echo "Starting Celery model..."
    exec celery -A infrastructure.celery.app  worker --loglevel=INFO -Q analyze-post
else
    echo "Invalid APP_MODE. Please set APP_MODE to 'backend', 'worker' or 'model'."
    exit 1
fi