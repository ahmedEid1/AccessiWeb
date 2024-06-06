#!/bin/bash

# Wait for the database to be ready
while ! nc -z db 5432; do
  echo "Waiting for PostgreSQL to start..."
  sleep 1
done

# Check if the migration directory exists, if not run flask db init
if [ ! -d "migrations" ]; then
  echo "No migrations directory found. Initializing migrations..."
  flask db init
fi

# Always generate a new migration script to capture any model changes
echo "Generating new migration..."
flask db migrate -m "Automated migration"

# Run database migrations
echo "Applying migrations..."
flask db upgrade

# Ensure the MinIO bucket exists
echo "Ensuring MinIO bucket exists..."
python << END
import boto3
from botocore.client import Config
from flask import current_app

minio_client = boto3.client(
    's3',
    endpoint_url='http://minio:9000',
    aws_access_key_id='minio',
    aws_secret_access_key='minio123',
    config=Config(signature_version='s3v4')
)

bucket_name = 'accessiweb-bucket'
buckets = [bucket['Name'] for bucket in minio_client.list_buckets()['Buckets']]
if bucket_name not in buckets:
    minio_client.create_bucket(Bucket=bucket_name)
    print(f"Bucket {bucket_name} created.")
else:
    print(f"Bucket {bucket_name} already exists.")
END

# Start the Flask application
exec flask run --host=0.0.0.0
