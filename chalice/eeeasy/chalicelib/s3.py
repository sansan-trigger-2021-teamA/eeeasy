import traceback
import boto3
from botocore.exceptions import ClientError
import chalicelib.env as env
import os
import json
import logging
import datetime

logger = logging.getLogger()
S3_BUCKET_NAME = os.environ["S3_BUCKET_NAME"]

def create_bucket(data):
    key = str(data['key'])+'.json'
    env.s3_client.put_object(Bucket=S3_BUCKET_NAME, Key=key,Body=json.dumps(data))
    return {'save': data['key']}

def set_gps(data):
    dt_now = datetime.datetime.now(datetime.timezone(datetime.timedelta(hours=9)))
    date = str(dt_now.date())
    time = str(dt_now.time())
    key = "gps/"+date+"/"+data["email"]+time+".json"#subID
    json_data = data["value"]
    try:
        env.s3_client.put_object(Bucket=S3_BUCKET_NAME, Key=key,Body=json.dumps(json_data))
        status = 200
        return {"statusCode":status,"message":"success","filename":key}

    except Exception as e:
        logger.warn(e)
        status = 400
        return {"statusCode":status,"message":e}


def get_gps():
    try:
        key = "test.json"
        url = env.s3_client.generate_presigned_url(
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
            'body':e
            }

