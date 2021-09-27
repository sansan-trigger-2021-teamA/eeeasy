from chalice import Chalice
import boto3
import json
import base64
from botocore.exceptions import ClientError
import os
import pymysql

BUCKET_NAME = 'eeeasy-s3'
s3 = boto3.client('s3')
app = Chalice(app_name='eeeasy')
app.debug = True
 
#rds settings
DB_USER = os.environ["USER"]
DB_PASSWORD = os.environ["PASSWORD"]
DB_HOST = os.environ["PROXY_END_POINT"]
DB_NAME = os.environ["DB_NAME"]
 
@app.route('/')
def index():
    test = "error"
    try:
        conn = pymysql.connect(host=DB_HOST, user=DB_USER, passwd=DB_PASSWORD, db=DB_NAME, connect_timeout=5)
        test = "success"
        return {'hello': test}

    except Exception  as e:
        print("Fail connecting to RDS mysql instance")
        print(e)
        return {'hello': test}


@app.route('/save', methods=['POST'], content_types=['application/json'],cors=True)
def save():
    data = app.current_request.json_body
    if 'key' not in data:
        return {'error': 'please input key'}
    key = str(data['key'])+'.json'
    s3.put_object(Bucket=BUCKET_NAME, Key=key,
                  Body=json.dumps(data))
    return {'save': data['key']}

