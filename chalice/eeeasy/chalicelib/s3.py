import traceback
import boto3
from botocore.exceptions import ClientError
import chalicelib.env as env
import os
import json
import logging

logger = logging.getLogger()
S3_BUCKET_NAME = os.environ["S3_BUCKET_NAME"]

def create_bucket(data):
    key = str(data['key'])+'.json'
    env.s3_client.put_object(Bucket=S3_BUCKET_NAME, Key=key,Body=json.dumps(data))
    return {'save': data['key']}

def set_gps(data):
    try:
        key = "test"
        env.s3_client.put_object(Bucket=S3_BUCKET_NAME, Key=key,Body=json.dumps(data))
        return {'save': 'success'}

    except Exception as e:
        logger.warn(e)
        return {'save':'failure'}

def get_gps(data):
    try:
        key = "test.json"
        url = s3.generate_presigned_url(
            'get_object',
            Params={
                'Bucket': S3_BUCKET_NAME,
                'Key': key
            },
            ExpiresIn=60
        )
        return {
            'statusCode':'200',
            'body': url
            }

    except Exception as e:
        logger.warn(e)
        return {
            'statusCode':'400',
            'body':'400 error'
            }

