from chalice import Chalice
import boto3
import base64
from botocore.exceptions import ClientError
import os
import pymysql
import chalicelib.s3 as s3
import chalicelib.aurora as aurora

app = Chalice(app_name='eeeasy')
app.debug = True
DB_USER = os.environ["USER"]
DB_PASSWORD = os.environ["PASSWORD"]
DB_HOST = os.environ["PROXY_END_POINT"]
# DB_HOST = os.environ["WRITER_DB_END_POINT"]
DB_NAME = os.environ["DB_NAME"]
#rds settings
 
@app.route('/')
def index():
    test = "error"
    try:
        conn = pymysql.connect(host=DB_HOST, user=DB_USER, passwd=DB_PASSWORD, db=DB_NAME, connect_timeout=5)
        conn.close()
        test = "success"
        return {'hello': test}

    except Exception  as e:
        print("Fail connecting to RDS mysql instance")
        print(e)
        return {"error":"error"}

@app.route('/save', methods=['POST'], content_types=['application/json'],cors=True)
def save():
    data = app.current_request.json_body
    if 'key' not in data:
        return {'error': 'please input key'}
    responce = s3.create_bucket(data)
    return responce
    
@app.route('/create-table', methods=['POST'], content_types=['application/json'],cors=True)
def create_table():
    query = "CREATE Table Users ( UserId int NOT NULL AUTO_INCREMENT, Name VARCHAR(255) NOT NULL, Gender VARCHAR(20) NOT NULL, Age TINYINT NOT NULL, Job VARCHAR(20) NOT NULL, PRIMARY KEY (UserId))"
    responce = aurora.create_table(query)
    return {"status":responce}

@app.route('/create-user', methods=['POST'], content_types=['application/json'],cors=True)
def create_user():
    data = app.current_request.json_body
    responce = aurora.create_user(data)
    return {"status":responce}

