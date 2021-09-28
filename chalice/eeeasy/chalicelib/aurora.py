import traceback
import boto3
from botocore.exceptions import ClientError
import pymysql
import os
import logging

logger = logging.getLogger()

# "CREATE Table Users ( UserId int NOT NULL AUTO_INCREMENT, Name VARCHAR(255) NOT NULL, Gender VARCHAR(20) NOT NULL, Age TINYINT NOT NULL, Job VARCHAR(20) NOT NULL, PRIMARY KEY (UserId))"
# 環境変数に設定されたバケット名で、S3バケットを作成する
def connect_RDS():
    DB_USER = os.environ["USER"]
    DB_PASSWORD = os.environ["PASSWORD"]
    DB_HOST = os.environ["PROXY_END_POINT"]
    DB_NAME = os.environ["DB_NAME"]
    try:
        conn = pymysql.connect(host=DB_HOST, user=DB_USER, passwd=DB_PASSWORD, db=DB_NAME, connect_timeout=5)
        return conn
    except Exception as e:
        logger.warn(e)
        return e
    
def create_table(query):
    conn = connect_RDS()
    ret = ""
    if conn == type(str):
      return "error"
    with conn.cursor() as cur:
        cur.execute(query)
        conn.commit()
        ret = "success"
    conn.close()
    return ret

def create_user(profile):
    """
    '{"name":"test1","gender":"女","age":"22","job":"会社員"}'
    """
    name = profile["name"]
    gender = profile["gender"]
    age = int(profile["age"])
    job = profile["job"]	
    query = f"INSERT INTO Users(Name, Gender, Age, Job) VALUES({name}, {gender}, {age}, {job})"
    conn = connect_RDS()
    ret = ""
    if conn == type(str):
      return "error"
    # with conn.cursor() as cur:
    #     cur.execute(query)
    #     conn.commit()
    #     ret = "success"
    conn.close()
    return ret

def edit_profile(profile):
    name = profile["name"]
    job = profile["job"]	
    query = f"UPDATE Users SET Job={job} WHERE Name={name}"
    conn = connect_RDS()
    conn.close()
