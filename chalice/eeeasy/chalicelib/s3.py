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

def set_image(data):
    
    FILE_NAME = str(uuid.uuid4())
    
    client = boto3.client('sts')

    # AssumeRoleで一時的なCredential情報を発行
    response = client.assume_role(RoleArn=IAM_ROLE_ARN,
                                  RoleSessionName=FILE_NAME,
                                  DurationSeconds=DURATION_SECONDS)

    print(response)
    
    session = Session(aws_access_key_id=response['Credentials']['AccessKeyId'],
                      aws_secret_access_key=response['Credentials']['SecretAccessKey'],
                      aws_session_token=response['Credentials']['SessionToken'],
                      region_name=REGION_NAME)

    s3 = session.client('s3', config=Config(signature_version='s3v4'))
    
    url = s3.generate_presigned_url(ClientMethod = 'put_object', 
                                    Params = {'Bucket' : S3_BUCKET_NAME, 'Key' : FILE_NAME}, 
                                    ExpiresIn = DURATION_SECONDS, 
                                    HttpMethod = 'PUT')

    print(url)

    return {
       'statusCode': 200,
       'statusDescription': '200 OK',
       'isBase64Encoded': False,
       'headers': {
           'Content-Type': 'text/html; charset=utf-8'
        },
        'body': '{}\n'.format(url)
    }