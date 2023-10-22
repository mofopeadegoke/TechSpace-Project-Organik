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
#         User_scope_name = ""
#         User_collection_name = "Seller_User"
#         cluster = Cluster(endpoint, options)

# 	    # Wait until the cluster is ready for use.
#         cluster.wait_until_ready(timedelta(seconds=5))
# 	    # Get a reference to our bucket
#         bucket = cluster.bucket(bucket_name)
#         # Build a N1QL query to select all documents in the "product" collection
#         query = f"SELECT *  FROM `default`:`Farm_eCommerce`.`Products`.`ProductsCollections`"
        
#         # result = bucket.n1ql_query(N1QLQuery(query))
#         result = cluster.query(query)
#         print(result)
#         products_document_keys = [row for row in result]
#         return jsonify(products_document_keys)
#         # Fetch the document data for each key
#         products = [bucket.get(key).content for key in products_document_keys]

#         return jsonify(products), 200
#     except Exception as e:
#         return f"Error: {str(e)}", 500
    

# @app.route('/api/access_products')
# def access_products():
   
# seller_id = "Seller-1"

# # Retrieve the seller's document
# seller_doc = bucket.scope("Sellers").get(seller_id)

# # Access seller attributes
# seller_name = seller_doc.content['name']
# seller_email = seller_doc.content['email']
# other_seller_attributes = seller_doc.content['other_seller_attributes']

# # Access the list of products the seller is selling
# products = seller_doc.content['products']

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
    print(new_product)
    # seller_id = payload['username']
    # Define the seller's unique identifier
    seller_id = "gershonbest@gmail.com"  # Replace with the seller's actual ID

    # Define the new product to add
    # new_product = {
    #     "product_id": "Orange123",  # Unique identifier for the new product (document ID)
    #     "name": "Orange",
    #     "description": "Fruit with the best Citric Acid.",
    #     "category": "Fruit",
    #     "price": 15.99,
    #     "other_product_attributes": "Additional product information"
    # }

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

@app.route('/api/search_products', methods=['GET'])
def search_products():
    """
    Function or the route to search for a specific product. it allows a GET
    request from the user and then queries the database which response is a 
    json value of the products with the product name and category search key.

    get request sent as q=product_name. 

    """
    try:
        User_scope_name = "Users"
        User_collection_name = "Seller_User"
        cluster = Cluster(endpoint, options)

	    # Wait until the cluster is ready for use.
        cluster.wait_until_ready(timedelta(seconds=5))
	    # Get a reference to our bucket
        bucket = cluster.bucket(bucket_name)
        # Get the search query from the request parameters
        search_query = request.args.get('q', default='', type=str)

        # Build a N1QL query to search for products matching the search query
        query = f"SELECT * FROM `default`:`Farm_eCommerce`.`Products`.`ProductsCollections`WHERE (LOWER(name) LIKE LOWER('%{search_query}%') OR LOWER(category) LIKE LOWER('%{search_query}%'))"
        
        # result = bucket.n1ql_query(N1QLQuery(query))
        result = cluster.query(query)
        search_results = [row for row in result]

        return jsonify(search_results), 200
    except Exception as e:
        return f"Error: {str(e)}", 500


# @app.route('/api/add_to_cart', methods=['POST'])
# def add_to_cart():
#     user_id = "user-1"  # Replace with the actual user's ID
#     product_id = request.json.get("product_id")
#     quantity = request.json.get("quantity", 1)

#     try:
#         # Retrieve the user's cart document
#         user_cart = bucket.get(user_id).content
#     except DocumentNotFoundException:
#         # Create a new cart if it doesn't exist
#         user_cart = {
#             "cart": []
#         }

#     # Add the product to the user's cart
#     user_cart["cart"].append({
#         "product_id": product_id,
#         "quantity": quantity
#     })

#     # Update the user's cart document
#     bucket.upsert(user_id, user_cart)

#     return "Product added to cart"

# @app.route('/get_cart', methods=['GET'])
# def get_cart():
#     user_id = "user-1"  # Replace with the actual user's ID

#     try:
#         # Retrieve the user's cart document
#         user_cart = bucket.get(user_id).content
#         return jsonify(user_cart.get("cart", []))
#     except DocumentNotFoundException:
#         return jsonify([])

# @app.route('/checkout', methods=['POST'])
# def checkout():
#     user_id = "user-1"  # Replace with the actual user's ID

#     try:
#         # Retrieve the user's cart document
#         user_cart = bucket.get(user_id).content
#         cart_contents = user_cart.get("cart", [])

#         # Process the cart contents (e.g., calculate the total cost, update inventory, etc.)

#         # Clear the user's cart after checkout
#         user_cart["cart"] = []
#         bucket.upsert(user_id, user_cart)

#         return "Checkout successful"
#     except DocumentNotFoundException:
#         return "Cart is empty"


if __name__ == '__main__':
    app.run(debug=True)
