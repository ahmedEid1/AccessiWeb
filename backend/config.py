import os

class Config:
    SECRET_KEY = os.getenv('SECRET_KEY', 'your_secret_key')
    SQLALCHEMY_DATABASE_URI = os.getenv('DATABASE_URL', 'postgresql://postgres:postgres@db:5432/accessiweb')
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    MINIO_ACCESS_KEY = os.getenv('MINIO_ACCESS_KEY', 'minio')
    MINIO_SECRET_KEY = os.getenv('MINIO_SECRET_KEY', 'minio123')
    MINIO_URL = os.getenv('MINIO_URL', 'http://minio:9000')
    MINIO_BUCKET = os.getenv('MINIO_BUCKET', 'accessiweb-bucket')
