# app.py
from flask import Flask, jsonify, render_template, request
from datetime import timedelta
import traceback
from couchbase.exceptions import CouchbaseException, DocumentExistsException, DocumentNotFoundException
from couchbase.auth import PasswordAuthenticator
from couchbase.cluster import Cluster
from couchbase.options import ClusterOptions
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
        username = payload['username']

        # Check if the user already exists
        try:
            existing_user = cb_user_coll.get(username).content_as[dict]
            print("User already exist")
            return "User already exists", 409
            
        except DocumentNotFoundException:
            # User doesn't exist, continue with registration
        
        
            # create new random key
            key = uuid.uuid4().__str__()
            payload["pid"] = key
            print(key)
            # encrypt password
            salt = bcrypt.gensalt()
            hashed = bcrypt.hashpw(payload["password"].encode('utf-8'), salt)
            base64_hashed = base64.b64encode(hashed).decode('utf-8')
            payload["password"] = base64_hashed
    
            cb_user_coll.insert(key, payload)
            return payload, 201
    except DocumentExistsException:
        return "Key already exists", 409
    except CouchbaseException as e:
        return f"Unexpected error: {e}", 500
    except Exception as e:
        return f"Unexpected error: {e}", 500

if __name__ == '__main__':
    app.run(debug=True)
