from chalice import Chalice
import boto3
import base64
from botocore.exceptions import ClientError
import os
import pymysql
import chalicelib.s3 as s3
import chalicelib.aurora as aurora
import json
from exponent_server_sdk import (
    DeviceNotRegisteredError,
    PushClient,
    PushMessage,
    PushServerError,
    PushTicketError,
)
from requests.exceptions import ConnectionError, HTTPError

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

"""
s3
"""

@app.route('/save', methods=['POST'], content_types=['application/json'],cors=True)
def save():
    data = app.current_request.json_body
    if 'key' not in data:
        return {'error': 'please input key'}
    responce = s3.create_bucket(data)
    return responce
    
@app.route('/get-gps',methods=['GET'])
def get_gps():
    responce = s3.get_gps()
    return responce


"""
aurora
"""
@app.route('/create-table', methods=['POST'], content_types=['application/json'],cors=True)
def create_table():
    data = app.current_request.json_body
    if 'key' not in data:
        return {'error': 'please input key'}
    query = data["key"]
    
    # '{"key":"CREATE TABLE Gps ( GpsId int NOT NULL AUTO_INCREMENT, FileName VARCHAR(255) NOT NULL, PRIMARY KEY (GpsId))"}'
    # query = "CREATE TABLE Users ( UserId int NOT NULL AUTO_INCREMENT, Name VARCHAR(255) NOT NULL, Email VARCHAR(255) NOT NULL, Sub VARCHAR(255) NOT NULL, PushToken VARCHAR(255), Gender VARCHAR(20) NOT NULL, Age TINYINT NOT NULL, Job VARCHAR(20) NOT NULL, PRIMARY KEY (UserId))"
    responce = aurora.execute_query(query)
    return responce

@app.route('/delete-table', methods=['DELETE'], content_types=['application/json'],cors=True)
def delete_table():
    data = app.current_request.json_body
    if 'key' not in data:
        return {'error': 'please input key'}
    query = data["key"]
    responce = aurora.execute_query(query)
    return responce

@app.route('/create-user', methods=['POST'], content_types=['application/json'],cors=True)
def create_user():
    data = app.current_request.json_body
    responce = aurora.create_user(data)
    return responce

@app.route('/set-gps', methods=['POST'], content_types=['application/json'],cors=True)
def set_gps():
    data = app.current_request.json_body
    responce = s3.set_gps(data)
    # if responce["message"] == "success":
    #     aurora.
    # else:
    #     responce["message"] = "error"
    return responce

@app.route('/update-job', methods=['POST'], content_types=['application/json'],cors=True)
def edit_profile():
    data = app.current_request.json_body
    responce = aurora.edit_profile(data)
    return responce


@app.route('/send-push', methods=['POST'], content_types=['application/json'],cors=True)
def send_push():
    data = app.current_request.json_body
    token = "ExponentPushToken[im3PhvNozRcUbsAKG6tJIF]"
    message = "mes"
    extra = "data"
    headers = {
        'Accept': 'application/json',
    }
    data = '{"to": "ExponentPushToken[im3PhvNozRcUbsAKG6tJIF]","title":"hello","body": "world"}'
    response = requests.post("https://exp.host/--/api/v2/push/send", headers=headers, data=data)
    print(response.text)
# Basic arguments. You should extend this function with the push features you
# want to use, or simply pass in a `PushMessage` object.
    # try:
    #     response = PushClient().publish(
    #         PushMessage(to=token,
    #                     body=message,
    #                     data=extra))
    # except PushServerError as exc:
    #     # Encountered some likely formatting/validation error.
    #     rollbar.report_exc_info(
    #         extra_data={
    #             'token': token,
    #             'message': message,
    #             'extra': extra,
    #             'errors': exc.errors,
    #             'response_data': exc.response_data,
    #         })
    #     raise
    # except (ConnectionError, HTTPError) as exc:
    #     # Encountered some Connection or HTTP error - retry a few times in
    #     # case it is transient.
    #     rollbar.report_exc_info(
    #         extra_data={'token': token, 'message': message, 'extra': extra})
    #     raise self.retry(exc=exc)

    # try:
    #     # We got a response back, but we don't know whether it's an error yet.
    #     # This call raises errors so we can handle them with normal exception
    #     # flows.
    #     response.validate_response()
    # except DeviceNotRegisteredError:
    #     # Mark the push token as inactive
    #     from notifications.models import PushToken
    #     PushToken.objects.filter(token=token).update(active=False)
    # except PushTicketError as exc:
        # Encountered some other per-notification error.
        # rollbar.report_exc_info(
        #     extra_data={
        #         'token': token,
        #         'message': message,
        #         'extra': extra,
        #         'push_response': exc.push_response._asdict(),
        #     })
        # raise self.retry(exc=exc)