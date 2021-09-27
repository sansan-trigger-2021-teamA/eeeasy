import traceback
import boto3
from botocore.exceptions import ClientError
import chalicelib.env as env
import os
import json

# 環境変数に設定されたバケット名で、S3バケットを作成する
def create_bucket(data):
    key = str(data['key'])+'.json'
    env.s3_client.put_object(Bucket=os.environ["S3_BUCKET_NAME"], Key=key,
                  Body=json.dumps(data))
    return {'save': data['key']}