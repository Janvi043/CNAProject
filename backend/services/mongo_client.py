import os
from pymongo import MongoClient


def get_mongodb_uri():
    return os.environ.get("MONGODB_URI", "mongodb://127.0.0.1:27017")


def get_database():
    uri = get_mongodb_uri()
    client = MongoClient(uri, serverSelectionTimeoutMS=5000)
    db_name = os.environ.get("MONGODB_DB", "genomics_detector")
    return client[db_name]
