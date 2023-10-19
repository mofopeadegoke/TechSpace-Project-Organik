# app.py
from flask import Flask, jsonify, render_template, request
from datetime import timedelta
import traceback
from couchbase.exceptions import CouchbaseException, DocumentExistsException, DocumentNotFoundException
from couchbase.auth import PasswordAuthenticator
from couchbase.cluster import Cluster
from couchbase.options import ClusterOptions
from couchbase.n1ql import N1QLQuery
import bcrypt
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
        
        # create new random key
        # key = uuid.uuid4().__str__()
        user_document_key = user.lower()
        payload["pid"] = user_document_key
        print(user_document_key)
        # encrypt password
        salt = bcrypt.gensalt()
        hashed = bcrypt.hashpw(payload["password"].encode('utf-8'), salt)
        base64_hashed = base64.b64encode(hashed).decode('utf-8')
        payload["password"] = base64_hashed
    
        cb_user_coll.insert(user_document_key, payload)
        return payload, 201
    except DocumentExistsException:
        return "Key already exists", 409
    except CouchbaseException as e:
        return f"Unexpected error: {e}", 500
    except Exception as e:
        return f"Unexpected error: {e}", 500
    


@app.route('/api/list_all_products', methods=['GET'])
def list_all_products():
    try:
        User_scope_name = ""
        User_collection_name = "Seller_User"
        cluster = Cluster(endpoint, options)

	    # Wait until the cluster is ready for use.
        cluster.wait_until_ready(timedelta(seconds=5))
	    # Get a reference to our bucket
        bucket = cluster.bucket(bucket_name)
        # Build a N1QL query to select all documents in the "product" collection
        query = f"SELECT *  FROM `default`:`Farm_eCommerce`.`Products`.`ProductsCollections`"
        
        # result = bucket.n1ql_query(N1QLQuery(query))
        result = cluster.query(query)
        print(result)
        products_document_keys = [row for row in result]
        return jsonify(products_document_keys)
        # Fetch the document data for each key
        products = [bucket.get(key).content for key in products_document_keys]

        return jsonify(products), 200
    except Exception as e:
        return f"Error: {str(e)}", 500
    

@app.route('/api/search_products', methods=['GET'])
def search_products():
    """
    Function or the route to search for a specific product. it allows a GET
    request from the user and then queries the database which response is a 
    json value of the products with the search description. 

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
        query = f"SELECT * FROM `default`:`Farm_eCommerce`.`Products`.`ProductsCollections`WHERE (LOWER(name) LIKE LOWER('%{search_query}%'))"
        
        # result = bucket.n1ql_query(N1QLQuery(query))
        result = cluster.query(query)
        search_results = [row for row in result]

        return jsonify(search_results), 200
    except Exception as e:
        return f"Error: {str(e)}", 500


if __name__ == '__main__':
    app.run(debug=True)
