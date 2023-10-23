import os
import uuid
import json
import datetime
from datetime import timedelta
from multiprocessing import Process
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

login_manager = LoginManager()

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
            # create index if it doesn't exist
            n1ql_query = f"CREATE INDEX ix_email ON `{self.bucket_name}`.{self.scope_name}.{self.collection_name}(email);"
            self._cluster.query(n1ql_query).execute()
            print("Index successfully created")
        except CouchbaseException as e:
            print("Index already exists")
    def is_email_unique(self, email):
        n1ql_query = f"""SELECT COUNT(*) FROM `{self.bucket_name}`.{self.scope_name}.{self.collection_name}
                        WHERE email = "{email}"
                    """
        result = self._cluster.query(n1ql_query).execute()
        count = result[0]['$1']
        return count == 0
    def is_username_unique(self, username):
        n1ql_query = f"""SELECT COUNT(*) FROM `{self.bucket_name}`.{self.scope_name}.{self.collection_name}
                        WHERE name = "{username}"
                    """
        result = self._cluster.query(n1ql_query).execute()
        count = result[0]['$1']
        return count == 0 
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
    def load_user(self, id):
        n1ql_query = f"""
                        SELECT * FROM `{self.bucket_name}`.{self.scope_name}.{self.collection_name}
                        WHERE id = "{id}";
                        """
        result = self._cluster.query(n1ql_query).execute()
        if result==[]:
            return None
        return result[0]
    def upsert(self, doc, id):
        try:
            key = id
        except CouchbaseException as e:
            print(e)
        print(f'Sucessfully added {doc["name"]} to {self.collection_name}')
        return self._collection.upsert(key, doc)   
    def remove(self, key):
        return self._collection.remove(key)  


app = Flask(__name__)
CORS(app, origins="http://localhost:3000")  
app.secret_key = os.getenv("SECRET_KEY")
login_manager.init_app(app)

class User(UserMixin):
    def __init__(self, id):
        self.id = id
    def is_authenticated(self):
        return True 
    def is_active(self):
        return True  
    def is_anonymous(self):
        return False  
    def get_id(self):
        return str(self.id)

@login_manager.user_loader
def load_user(user_id):
    cb = CouchbaseClient(*db_info.values())
    cb.connect()
    foundUser = cb.load_user(user_id)
    return User(foundUser)

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

@app.route('/register', methods=['POST'])
def signup():
    if request.method == 'POST':
        form_data = request.json
        fullname = form_data.get('fullname')
        email = form_data.get('email')
        password = form_data.get('password')
        cb = CouchbaseClient(*db_info.values())
        cb.connect()
        cb.create_index()
        if not cb.is_email_unique(email):
            response_data = "Email is already in use. Please choose another."
            return jsonify(response_data)
        if not cb.is_username_unique(fullname):
            response_data = "Username is already in use. Please choose another."
            return jsonify(response_data)
        hashed_password = bcrypt.generate_password_hash(password).decode('utf-8')
        id = str(uuid.uuid4())
        user_doc = {
            "id": id,
            "name": fullname,
            "email": email,
            "password": hashed_password,
        }
        cb.upsert(user_doc, id)
        user = User(id)
        login_user(user)
        response_data = {'message': 'User created successfully, UWU:)'}
    return jsonify(response_data)

@app.route('/login', methods=['POST'])
def login():
    if request.method == 'POST':
            form_data = request.json
            form_email = form_data.get('email')
            form_password = form_data.get('password')
            cb = CouchbaseClient(*db_info.values())
            cb.connect()
            result = cb.find_document(form_email)
            if result == []:
                response_data = f"Couldn't find the email '{form_email}'"
                return jsonify(response_data)
            db_password = result[0]['clients']['password']
            if bcrypt.check_password_hash(db_password, form_password):
                id = result[0]['clients']['id']
                user = User(id)
                login_user(user)
                response_data = f"Successfully logged user, UWU :)"
                return jsonify(response_data)
                # return redirect(url_for('dashboard'))
            response_data = f"Wrong username or password"
            return jsonify(response_data)

@app.route('/logout')
@login_required
def logout():
    logout_user()
    response_data = f"Sucessfully logged out user"
    # return redirect(url_for('login'))
    return jsonify(response_data)
    

@app.route('/dashboard')
@login_required
def dashboard():
    if current_user.is_authenticated:
        return "Welcome to the dashboard!"
    else:
        return "Access denied. Please log in."
    
if __name__ == "__main__":
    app.run(debug=True)
















