import os
import uuid
import json
# from codecs import decode
import datetime
from datetime import timedelta
from multiprocessing import Process
import traceback
# import bycrypt
from couchbase.auth import PasswordAuthenticator
from couchbase.cluster import Cluster
from couchbase.diagnostics import PingState
from couchbase.exceptions import (
    CouchbaseException,
    DocumentExistsException,
    DocumentNotFoundException,
)
from couchbase.n1ql import N1QLQuery
from couchbase.options import ClusterOptions
from dotenv import load_dotenv
from flask import Flask, jsonify, render_template, request, redirect, url_for
from flask_bcrypt import Bcrypt
from flask_login import LoginManager, UserMixin, login_user, login_required, logout_user, current_user
from flask_cors import CORS
# from flask_restx import Api, Resource, fields

current_time = datetime.datetime.now()
hour = current_time.hour
if 0 <= hour < 11:
    greeting ="Good morning"
elif 12 <= hour < 17:
    greeting ="Good afternoon"
else:
    greeting ="Good evening"

class CouchbaseClient:

    def __init__(self, host, bucket, scope, collection, username, password):
        self.host = host
        self.bucket_name = bucket
        self.scope_name = scope
        self.collection_name = collection
        self.username = username
        self.password = password
        print("Initialization completed successfully")

    def connect(self, **kwargs):
        conn_str = self.host
        auth = PasswordAuthenticator(self.username, self.password)
        cluster_opts = ClusterOptions(auth)
        cluster_opts.apply_profile('wan_development')

        try:
            self._cluster = Cluster(conn_str, cluster_opts)
            self._cluster.wait_until_ready(timedelta(seconds=5))
            self._bucket = self._cluster.bucket(self.bucket_name)
            self._scope = self._bucket.scope(self.scope_name)
            self._collection = self._scope.collection(self.collection_name)
            print("Sucessfully connected to the cluster")
        except CouchbaseException as error:
            print(f"Could not connect to cluster. Error: {error}")
            raise 

    def create_index(self):
        try:
            # create index on collection if it doesn't exist
            createIndexProfile = f"CREATE PRIMARY INDEX default_profile_index ON {self.bucket_name}.{self.scope_name}.{self.collection_name}"
            createIndex = f"CREATE PRIMARY INDEX ON {self.bucket_name}"

            self._cluster.query(createIndexProfile).execute()
            self._cluster.query(createIndex).execute()
        except CouchbaseException as e:
            print("Index already exists")
        except Exception as e:
            print(f"Error: {type(e)}{e}")

    def create_index_on_document(self):
        try:
            # create index on document if it doesn't exist
            n1ql_query = f"CREATE INDEX ix_email ON `{self.bucket_name}`.{self.scope_name}.{self.collection_name}(email);"
            self._cluster.query(n1ql_query).execute()
            print("Index successfully created")
        except CouchbaseException as e:
            #Prints if index already exists
            print("Index already exists")

    def find_document(self, field):
            try:

                n1ql_query = f"""
                                SELECT * FROM `{self.bucket_name}`.{self.scope_name}.{self.collection_name}
                                WHERE email = "{field}";
                                """
                result = self._cluster.query(n1ql_query).execute()
                return result  
            except CouchbaseException as e:
                print("User not found")

    def upsert(self, doc, id):
        try:
            key = id
        except CouchbaseException as e:
            print(e)
        print(f'Sucessfully added {doc["name"]} to {self.collection_name}')
        return self._collection.upsert(key, doc)   


app = Flask(__name__)
###### VERY IMPORTANT!   
CORS(app, origins="http://localhost:3000")  
#Loading environmental variables
load_dotenv()
db_info = {
    "host": os.getenv("DB_HOST"),
    "bucket": os.getenv("BUCKET"),
    "scope": os.getenv("SCOPE_USER"),
    "collection": os.getenv("COLLECTION_USER_CLIENT"),
    "username": os.getenv("USER"),
    "password": os.getenv("PASSWORD"),
}

bcrypt = Bcrypt(app)

##Setting up and configuring LoginManager
app.secret_key = os.getenv("SECRET_KEY")
login_manager = LoginManager()
login_manager.init_app(app)


class User(UserMixin):
    def __init__(self, user_id):
        self.id = user_id
        

@login_manager.user_loader
def load_user(user_id):
    try:
        cb = CouchbaseClient(*db_info.values())
        cb.connect()
        user_data = cb.find_document(user_id)
        if user_data:
            user = User(user_id)
            return user
    except FileNotFoundError:
        return None
    

@app.route('/register', methods=['POST'])
def signup():
    data = request.json 
    fullname = data['fullname']
    email = data['email']
    password = data['password']

    hashed_password = bcrypt.generate_password_hash(password).decode('utf-8')
    #Connect to couchbase 
    cb = CouchbaseClient(*db_info.values())
    cb.connect()
    cb.create_index()
    id = str(uuid.uuid4())
    user_doc = {
        "id": id,
        "name": fullname,
        "email": email,
        "password": hashed_password,
    }
    cb.upsert(user_doc, id)
    response_data = {'message': 'User created successfully, UWU:)'}
    return jsonify(response_data)

@app.route('/login', methods=['POST'])
def login():
    error_message = []
    # Getting values from input fields
    form_email = request.form['email']
    form_password = request.form['password']
    

    cb = CouchbaseClient(*db_info.values())
    cb.connect()
    cb.create_index()
    cb.create_index_on_document()
    result = cb.find_document(form_email)
    if result == []:
        error_message.append(f"Couldn't find the email '{form_email}'")
        return render_template('login.html', err = error_message)
    db_password = result[0]['clients']['password']
    if bcrypt.check_password_hash(db_password, form_password):
        name = result[0]['clients']['name']
        return  render_template('index.html', successMessage="Successfully logged user, UWU :)", name = name, greeting = greeting)
    error_message.append(f"Wrong username or password")
    return render_template('login.html', err = error_message)

    
# Testing
@app.route('/dashboard')
@login_required
def dashboard():
    if current_user.is_authenticated:
        # User is authenticated and logged in
        return "Welcome to the dashboard!"
    else:
        # User is not authenticated
        return "Access denied. Please log in."
    
if __name__ == "__main__":
    app.run(debug=True)

















