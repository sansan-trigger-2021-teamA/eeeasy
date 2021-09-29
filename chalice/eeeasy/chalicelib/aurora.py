import traceback
import boto3
from botocore.exceptions import ClientError
import pymysql
import os
import logging

logger = logging.getLogger()

# "CREATE Table Users ( UserId int NOT NULL AUTO_INCREMENT, Name VARCHAR(255) NOT NULL,Email TEXT NOT NULL, Gender VARCHAR(20) NOT NULL, Age TINYINT NOT NULL, Job VARCHAR(20) NOT NULL, PRIMARY KEY (UserId))"
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
    
def execute_query(query):
    conn = connect_RDS()
    message = ""
    if conn == type(str):
      return "error"
    with conn.cursor() as cur:
        cur.execute(query)
        conn.commit()
        message = "success"
        status = 200
    conn.close()
    responce = {"statusCode":status,"message":message}

    return responce

def create_user(profile):
    """
    '{"name":"test1","gender":"女","email":"test@mail","age":"22","job":"会社員","sub":"test"}'
    """

    name = profile["name"]
    gender = profile["gender"]
    age = int(profile["age"])
    job = profile["job"]
    email = profile["email"]
    sub = profile["sub"]
    query = "INSERT INTO Users(Name, Email, Gender, Age, Job, Sub) VALUES(%s, %s, %s,%s, %s, %s)"
    conn = connect_RDS()
    message = ""
    if conn == type(str):
      return "error"
    with conn.cursor() as cur:
        cur.execute(query,(name,email,gender,age,job,sub))
        conn.commit()
        status = 200
        message = "success"
    conn.close()
    responce = {"statusCode":status,"message":message}
    return responce

def edit_profile(profile):
    email = profile["email"]
    job = profile["job"]	
    query = f"UPDATE Users SET Job = %s WHERE Email = %s"
    conn = connect_RDS()
    with conn.cursor() as cur:
        cur.execute(query,(job,email))
        conn.commit()
        status = 200
        message = "success"
    conn.close()
    responce = {"statusCode":status,"message":message}
    return responce

def select_user(profile):
    email = profile["email"]
    query = f"SELECT * Users WHERE Email = %s"
    conn = connect_RDS()
    with conn.cursor() as cur:
        cur.execute(query,(email))
        conn.commit()
        status = 200
        message = "success"
    conn.close()
    responce = {"statusCode":status,"message":message}
    return responce
    

def insert_gps(email,filename):
    query = "INSERT INTO Gps(FileName) VALUES(%s)"
    # query = "INSERT INTO Gps(FileName,SubId) VALUES(%s,%s)"
    conn = connect_RDS()

    if conn == type(str):
        return "error"
    with conn.cursor() as cur:
        cur.execute(query,(filename))
        # cur.execute(query,(filename,email,))
        conn.commit()
        status = 200
        message = "success"
    conn.close()
    responce = {"statusCode":status,"message":message}
    return responce

    
