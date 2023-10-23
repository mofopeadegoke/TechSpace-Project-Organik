# app.py
from flask import Flask, jsonify, render_template, request, redirect,session
from flask_login import LoginManager, UserMixin, login_user, login_required, logout_user, current_user
from datetime import timedelta
import traceback
from couchbase.exceptions import CouchbaseException, DocumentExistsException, DocumentNotFoundException
from couchbase.auth import PasswordAuthenticator
from couchbase.cluster import Cluster
from couchbase.options import ClusterOptions
from couchbase.n1ql import N1QLQuery
from flask_bcrypt import Bcrypt
# import bcrypt
import uuid
import json, base64

app = Flask(__name__)

endpoint = "couchbases://cb.tvakblrk2ylq56mr.cloud.couchbase.com" # Replace this with Connection String
db_username = "farm_tech" #  username from database access credentials
db_password = "98Glory1234$" # password from database access credentials
bucket_name = "Farm_eCommerce"

# Connect options - authentication
auth = PasswordAuthenticator(db_username, db_password)
options = ClusterOptions(auth)
options.apply_profile("wan_development")

login_manager = LoginManager()
login_manager.login_view = 'login'
login_manager.init_app(app)


@app.route('/')
def home():
    return render_template('index.html')


@app.route("/api/seller_register", methods = ['POST'])
def farmer_Signup():

    scope_name = "Users"
    collection_name = "Seller_User"
    cluster = Cluster(endpoint, options)

	# Wait until the cluster is ready for use.
    cluster.wait_until_ready(timedelta(seconds=5))
	# Get a reference to our bucket
    cb_user = cluster.bucket(bucket_name)
	# Get a reference to our collection
    cb_user_coll = cb_user.scope(scope_name).collection(collection_name)
    
    try:
        payload = request.json
        user = payload['username']
         # Check if the username is already registered
        user_data = cb_user_coll.get(user, quiet=True)
        if user_data:
            return 'Username already taken', 400
        # create new random key
        # key = uuid.uuid4().__str__()
        user_document_key = user.lower()
        payload["pid"] = user_document_key
        print(user_document_key)
        # encrypt password
        # salt = bcrypt.gensalt()
        # hashed = bcrypt.hashpw(payload["password"].encode('utf-8'), salt)
        # base64_hashed = base64.b64encode(hashed).decode('utf-8')
        # payload["password"] = base64_hashed
    
        cb_user_coll.insert(user_document_key, payload)
        return payload, 201
    except DocumentExistsException:
        return "Key already exists", 409
    except CouchbaseException as e:
        return f"Unexpected error: {e}", 500
    except Exception as e:
        return f"Unexpected error: {e}", 500
    

@app.route('/register', methods=['GET', 'POST'])
def register():
    scope_name = "Users"
    collection_name = "Seller_User"
    cluster = Cluster(endpoint, options)

	# Wait until the cluster is ready for use.
    cluster.wait_until_ready(timedelta(seconds=5))
	# Get a reference to our bucket
    cb_user = cluster.bucket(bucket_name)
	# Get a reference to our collection
    cb_user_coll = cb_user.scope(scope_name).collection(collection_name)

    if request.method == 'POST':
        FirstName = request.form['firstname']
        LastName = request.form['lastname']
        CompanyName = request.form['companyname']
        Phone = request.form['phone']
        Zipcode = request.form['zipcode']
        Country = request.form['country']
        Email = request.form['email']
        password = request.form['password']

        # Check if the username is already registered
        # user_data = cb_user_coll.get(Email, quiet=True)
        # if user_data:
        #     return 'Username already taken', 400
        
        # Create a new user document in Couchbase
        user_data = {
            'firstname': FirstName,
            'lastname': LastName,
            'companyname': CompanyName,
            'phone': Phone,
            'zipcode': Zipcode,
            'country': Country,
            'email': Email,
            'password': password  
        }

        # salt = bcrypt.gensalt()
        # hashed = bcrypt.hashpw(user_data["password"].encode('utf-8'), salt)
        # base64_hashed = base64.b64encode(hashed).decode('utf-8')
        # user_data['password'] = base64_hashed
        password = user_data["password"]
        user_data["password"] = Bcrypt.generate_password_hash(password).decode('utf-8')
        # Insert User Registration data to the database
        cb_user_coll.insert(Email, user_data)

        # return redirect(url_for('login'))

    return render_template('register.html')

# User model
class User(UserMixin):
    def __init__(self, id, email, password):
        self.id = id
        self.email = email
        self.password = password

@login_manager.user_loader
def load_user(email):

    scope_name = "Users"
    collection_name = "Seller_User"
    cluster = Cluster(endpoint, options)

	# Wait until the cluster is ready for use.
    cluster.wait_until_ready(timedelta(seconds=5))
	# Get a reference to our bucket
    cb_user = cluster.bucket(bucket_name)
	# Get a reference to our collection
    cb_user_coll = cb_user.scope(scope_name).collection(collection_name)

    user_data = cb_user_coll.get(email).content
    # salt = bcrypt.gensalt()
    # hashed = bcrypt.hashpw(password.encode('utf-8'), salt)
    # base64_hashed = base64.b64encode(hashed).decode('utf-8')
    # password = base64_hashed
    return User(id=email, Email=user_data['email'], password=user_data['password'])

@app.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        email = request.form['email']
        password1 = request.form['password']

        scope_name = "Users"
        collection_name = "Seller_User"
        cluster = Cluster(endpoint, options)

	    # Wait until the cluster is ready for use.
        cluster.wait_until_ready(timedelta(seconds=2))
	    # Get a reference to our bucket
        cb_user = cluster.bucket(bucket_name)
	    # Get a reference to our collection
        cb_user_coll = cb_user.scope(scope_name).collection(collection_name)
        user_data = cb_user_coll.get(email, quiet=True)
        # salt = bcrypt.gensalt()
        # hashed = bcrypt.hashpw(password1.encode('utf-8'), salt)
        # base64_hashed = base64.b64encode(hashed).decode('utf-8')
        # password = base64_hashed
        user_password = user_data.value['password']


        print(user_password)
        # print(password)
        if user_data and Bcrypt.check_password_hash(user_password, password1):  
            user = User(id=email, Email=email, password=user_data.value['password'])
            login_user(user)
            return 'Logged in successfully'
        else:
            return 'Invalid login credentials', 401

    return render_template('login.html')


@app.route('/logout')
@login_required
def logout():
    logout_user()
    return 'Logged out successfully'


# @app.route('/api/list_all_products', methods=['GET'])
# def list_all_products():
#     try:
#         cluster = Cluster(endpoint, options)
#         cluster.wait_until_ready(timedelta(seconds=5))
#         bucket = cluster.bucket(bucket_name)
#         query = f"SELECT *  FROM `default`:`Farm_eCommerce`.`Products`.`ProductsCollections`"
        
#         # result = bucket.n1ql_query(N1QLQuery(query))
#         result = cluster.query(query)
#         print(result)
#         products_document_keys = [row for row in result]
#         return jsonify(products_document_keys)
#         # Fetch the document data for each key
#         # products = [bucket.get(key).content for key in products_document_keys]

#         # return jsonify(products), 200
#     except Exception as e:
#         return f"Error: {str(e)}", 500
    
@app.route('/api/all_products')
def products():
    cluster = Cluster(endpoint, options)
    cluster.wait_until_ready(timedelta(seconds=5))
    bucket = cluster.bucket(bucket_name)

    query = f"SELECT products FROM Farm_eCommerce.Users.Seller_User"
    query_result = cluster.query(query)
    # Retrieve the products
    all_product = [row for row in query_result]
   
    # Use a list comprehension to filter out empty documents and extract products
    products = [doc["products"] for doc in all_product if "products" in doc]
    # products = [doc for doc in all_product if "products" in doc]
   
    return jsonify(products)

@login_required
@app.route('/api/seller_products')
def seller_products():
    cluster = Cluster(endpoint, options)
    cluster.wait_until_ready(timedelta(seconds=2))
	# Get a reference to our bucket
    cb_user = cluster.bucket(bucket_name)
    # user_id = current_user.get_id()
    # seller_id = user_id
    seller_id = ""  # we need to get User_id from users login session
    # Get a reference to our bucket
    cb_user = cluster.bucket(bucket_name)
    # Retrieve the seller's document
    seller_document = cb_user.scope("Users").collection("Seller_User")


    # Access the list of products the seller is selling
    seller_doc = seller_document.get(seller_id, quiet = True)
    # Company = seller_doc.value['name']
    products = seller_doc.value['products']

    return jsonify(product = products)


@login_required
@app.route('/api/add_products', methods = ["POST"])
def add_products():
    
    cluster = Cluster(endpoint, options)
    cluster.wait_until_ready(timedelta(seconds=2))
	# Get a reference to our bucket
    cb_user = cluster.bucket(bucket_name)
	# Get a reference to our collection
    sellers = cb_user.scope("Users").collection("Seller_User")
    # user_data = cb_user_coll.get(email, quiet=True)
    new_product = request.json
    seller_id = ""  # Get the Uses ID from the login session
    new_product["seller_id"] = seller_id
    try:
        # Retrieve the seller's document
        seller_doc = sellers.get(seller_id)
        # Check if the "products" field exists in the document
        if "products" not in seller_doc.value:
            # If not, initialize it as an empty list
            seller_doc.value["products"] = []
        # Append the new product to the seller's list of products
        seller_doc.value["products"].append(new_product)

        # Replace the existing seller document with the updated document
        sellers.upsert(seller_id, seller_doc.value)

        return jsonify({"info":"product added."})

        # The new product has been added to the seller's products
    except DocumentExistsException:
        return "Seller document does not exist", 404

@app.route('/api/search_products', methods=['POST'])
def search_products():
    """
    Function or the route to search for a specific product. it allows a POST
    request from the user and then queries the database which response is a 
    json value of the products with the product name and category search key.

    """
    try:
        cluster = Cluster(endpoint, options)

	    # Wait until the cluster is ready for use.
        cluster.wait_until_ready(timedelta(seconds=5))
	    # Get a reference to our bucket
        bucket = cluster.bucket(bucket_name)
        # Get the search query from the request parameters
        # search_query = request.args.get('q', default='', type=str)
        search = request.json
        search_query = search['search']
        # search_query = request.form['search product']

        # Build a N1QL query to search for products matching the search query
        query = f"SELECT products FROM Farm_eCommerce.Users.Seller_User"
        query_result = cluster.query(query)
        # Retrieve the products
        all_product = [row for row in query_result]
   
        # Use a list comprehension to filter out empty documents and extract products
        products = [doc for doc in all_product if "products" in doc]

        # Process and display the products subdocument
        if products:
            products_subdocument = products[0]['products']
            print("Products Subdocument:")
            print(products_subdocument)
            
            # search/filter the products within the subdocument
            search_term = search_query  # Replace with your search term
            filtered_products = [product for product in products_subdocument if search_term.lower() in product['name'].lower()]
            if filtered_products == []:
                return("Product not found")
            return jsonify(filtered_products), 200
        else:
            print("Seller not found or has no products.")

    except Exception as e:
        return f"Error: {str(e)}", 500


if __name__ == '__main__':
    app.run(debug=True)
