from chalice import Chalice
import boto3
import json

BUCKET_NAME = 'eeeasy-s3'
s3 = boto3.client('s3')
app = Chalice(app_name='eeeasy')
app.debug = True

@app.route('/')
def index():
    return {'hello': 'world'}

@app.route('/save', methods=['POST'], content_types=['application/json'],cors=True)
def save():
    data = app.current_request.json_body
    if 'key' not in data:
        return {'error': 'please input key'}
    key = str(data['key'])+'.json'
    s3.put_object(Bucket=BUCKET_NAME, Key=key,
                  Body=json.dumps(data))
    return {'save': data['key']}


# The view function above will return {"hello": "world"}
# whenever you make an HTTP GET request to '/'.
#
# Here are a few more examples:
#
# @app.route('/hello/{name}')
# def hello_name(name):
#    # '/hello/james' -> {"hello": "james"}
#    return {'hello': name}
#
# @app.route('/users', methods=['POST'])
# def create_user():
#     # This is the JSON body the user sent in their POST request.
#     user_as_json = app.current_request.json_body
#     # We'll echo the json body back to the user in a 'user' key.
#     return {'user': user_as_json}
#
# See the README documentation for more examples.
#
