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
from flask_session import Session
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
    
    def is_companyname_unique(self, companyname):
        n1ql_query = f"""SELECT COUNT(*) FROM `{self.bucket_name}`.{self.scope_name}.{self.collection_name}
                        WHERE companyName = "{companyname}"
                    """
        result = self._cluster.query(n1ql_query).execute()
        count = result[0]['$1']
        return count == 0 

    def find_document_email(self, field):
            try:
                n1ql_query = f"""
                                SELECT * FROM `{self.bucket_name}`.{self.scope_name}.{self.collection_name}
                                WHERE email = "{field}";
                                """
                result = self._cluster.query(n1ql_query).execute()
                return result  
            except CouchbaseException as e:
                print("User not found")

    def find_product_by_id(self, product_id):
            try:
                n1ql_query = f"""
                                SELECT * FROM `{self.bucket_name}`.{self.scope_name}.{self.collection_name}
                                WHERE product_id = '{product_id}';
                                """
                result = self._cluster.query(n1ql_query).execute()
                return result
            except CouchbaseException as e:
                print("User not found")

    def find_product(self, seller_id, product_name):
            try:
                n1ql_query = f"""
                                SELECT * FROM `{self.bucket_name}`.{self.scope_name}.{self.collection_name}
                                WHERE seller_id = "{seller_id}" AND product_name = "{product_name}";
                                """
                result = self._cluster.query(n1ql_query).execute()
                return result
            except CouchbaseException as e:
                print("User not found")

    def get_all_products(self):
            try:
                n1ql_query = f"""
                                SELECT * FROM `{self.bucket_name}`.{self.scope_name}.{self.collection_name};
                                """
                result = self._cluster.query(n1ql_query).execute()
                return result
            except CouchbaseException as e:
                print("User not found")

    def show_seller_product(self, seller_id):
        try:
            n1ql_query = f"""
                             SELECT * FROM `{self.bucket_name}`.{self.scope_name}.{self.collection_name}
                            WHERE seller_id = "{seller_id}";
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
        print(f'Document inserted and updated successfully')
        return self._collection.upsert(key, doc) 
      
    def insert(self, key, doc):
        print("Document inserted successfully")
        return self._collection.insert(key, doc)
    
    def remove(self, key):
        return self._collection.remove(key)  


app = Flask(__name__)  
CORS(app)
app.secret_key = os.getenv("SECRET_KEY")
login_manager.init_app(app)
app.config['SESSION_TYPE'] = 'filesystem' 
Session(app)
bcrypt = Bcrypt(app)

load_dotenv()
client_db_info = {
    "host": os.getenv("DB_HOST"),
    "bucket": os.getenv("BUCKET"),
    "scope": os.getenv("SCOPE_USER"),
    "collection": os.getenv("COLLECTION_USER_CLIENT"),
    "username": os.getenv("USER"),
    "password": os.getenv("PASSWORD"),
}

seller_db_info = {
    "host": os.getenv("DB_HOST"),
    "bucket": os.getenv("BUCKET"),
    "scope": os.getenv("SCOPE_USER"),
    "collection": os.getenv("COLLECTION_SELLER_CLIENT"),
    "username": os.getenv("USER"),
    "password": os.getenv("PASSWORD"),
}

item_db_info = {
    "host": os.getenv("DB_HOST"),
    "bucket": os.getenv("BUCKET"),
    "scope": os.getenv("SCOPE_CART"),
    "collection": os.getenv("COLLECTION_PRODUCT_ITEM"),
    "username": os.getenv("USER"),
    "password": os.getenv("PASSWORD"),
}

product_db_info = {
    "host": os.getenv("DB_HOST"),
    "bucket": os.getenv("BUCKET"),
    "scope": os.getenv("SCOPE_CART"),
    "collection": os.getenv("COLLECTION_PRODUCT_ITEM"),
    "username": os.getenv("USER"),
    "password": os.getenv("PASSWORD"),
}

cb = CouchbaseClient(*client_db_info.values())
cb.connect()
cb.create_index()


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
    foundUser = cb.load_user(user_id)
    return User(foundUser)

@app.route('/register', methods=['POST'])
def signup():
    if request.method == 'POST':
        form_data = request.json
        fullname = form_data.get('fullname')
        email = form_data.get('email')
        password = form_data.get('password')
        cb = CouchbaseClient(*client_db_info.values())
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

@app.route('/seller/register', methods=['POST'])
def seller_signup():
    if request.method == 'POST':
        form_data = request.json
        fullname = form_data.get('fullname')
        companyName = form_data.get('companyName')
        phoneNumber = form_data.get('phoneNumber')
        country = form_data.get('country')
        zipcode = form_data.get('zipcode')
        email = form_data.get('email')
        password = form_data.get('password')
        cb = CouchbaseClient(*seller_db_info.values())
        cb.connect()
        cb.create_index()
        if not cb.is_email_unique(email):
            response_data = "Email is already in use. Please choose another."
            return jsonify(response_data)
        if not cb.is_username_unique(fullname):
            response_data = "Username is already in use. Please choose another."
            return jsonify(response_data)
        if not cb.is_companyname_unique(companyName):
            response_data = "Company name is already in use. Please choose another."
            return jsonify(response_data)
        hashed_password = bcrypt.generate_password_hash(password).decode('utf-8')
        id = str(uuid.uuid4())
        user_doc = {
            "id": id,
            "name": fullname,
            "email": email,
            "password": hashed_password,
            "companyName": companyName,
            "phoneNumber": phoneNumber,
            "country": country,
            "zipcode": zipcode
        }
        cb.upsert(user_doc, id)
        user = User(id)
        login_user(user)
        response_data = {'message': 'User created successfully, UWU:)'}
    return jsonify(response_data)

@app.route('/seller/login', methods=['POST'])
def seller_login():
        form_data = request.json
        form_email = form_data.get('email')
        form_password = form_data.get('password')
        print(form_email, form_password)
        cb = CouchbaseClient(*seller_db_info.values())
        cb.connect()
        result = cb.find_document_email(form_email)
        if result:
            db_password = result[0]['sellers']['password']
            if bcrypt.check_password_hash(db_password, form_password):
                id = result[0]['sellers']['id']
                user = User(id)
                login_user(user)
                user_id = current_user.get_id()
                data = {"message": user_id}
                return jsonify(data)
                # response_data = f"{user_id}"
                # return response_data
            else:
                response_data = f"Wrong username or password"
                return jsonify(response_data)
        else:
            response_data = f"Couldn't find the email '{form_email}'"
            return jsonify(response_data)
    
@app.route('/user')
@login_required
def get_user():
    return jsonify({"username": current_user.id})


@app.route('/flask-rendered-page')
def flask_rendered_page():
    return render_template('flask_rendered_template.html')

@app.route('/login', methods=['POST'])
def login():
    if request.method == 'POST':
            form_data = request.json
            form_email = form_data.get('email')
            form_password = form_data.get('password')
            print(form_email, form_password)
            result = cb.find_document_email(form_email)
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
            response_data = f"Wrong username or password"
            return jsonify(response_data)
    
@app.route('/add', methods=['POST'])
def add_products():
    form_data = request.json
    product_name = form_data.get('productName')
    category = form_data.get('category')
    price = form_data.get('price')
    quantity = form_data.get('quantity')
    description = form_data.get('description')
    user_info = current_user.get_id()
    user_info = user_info.replace("'", "\"")
    user_info_dict = json.loads(user_info)
    print(user_info_dict)
    seller_id = user_info_dict['clients']['id']
    id = str(uuid.uuid4())
    cb = CouchbaseClient(*item_db_info.values())
    cb.connect()
    existing_data = cb.find_product(seller_id, product_name)  
    if existing_data:
        new_quantity = quantity
        new_price = price
        print(new_quantity)
        data = {
            "seller_id": seller_id,
            "category": category,
            "product_id": id,
            "product_name": product_name,
            "quantity": new_quantity,
            "description": description,
            "price": new_price
        }
        cb.upsert(data, seller_id + "::" + product_name)
    else:
        data = {
            "seller_id": seller_id,
            "category": category,
            "product_id": id,
            "product_name": product_name,
            "quantity": quantity,
            "description": description,
            "price": price
        }
        cb.insert(seller_id + "::" + product_name, data)
    response_data = f"Successfully added item to database, UWU :)"
    return jsonify(response_data)
        
@app.route('/products', methods=['GET'])
@login_required
def show_products():
    cb = CouchbaseClient(*item_db_info.values())
    cb.connect()
    products = cb.get_all_products()
    for item in products:
        inner_dict = item['items']
        product_id = inner_dict['product_id']
        product_name = inner_dict['product_name']
        quantity = inner_dict['quantity']
        price = inner_dict['price']
        
        print(f"Product ID: {product_id}")
        print(f"Product Name: {product_name}")
        print(f"Quantity: {quantity}")
        print(f"Price: {price}")
    # response_data = f"Successfully added item to database, UWU :)"
    # return jsonify(response_data)

    
    return  render_template('index.html', successMessage="Successfully created user, UWU :)")


@app.route('/logout')
@login_required
def logout():
    logout_user()
    response_data = f"Sucessfully logged out user"
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
















