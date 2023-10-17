# app.py
from flask import Flask, jsonify, render_template, request
from datetime import timedelta
import traceback
from couchbase.exceptions import CouchbaseException
from couchbase.auth import PasswordAuthenticator
from couchbase.cluster import Cluster
from couchbase.options import ClusterOptions

app = Flask(__name__)

endpoint = "couchbases://cb.tvakblrk2ylq56mr.cloud.couchbase.com" # Replace this with Connection String
username = "farm_tech" # Replace this with username from database access credentials
password = "98Glory1234$" # Replace this with password from database access credentials
bucket_name = "Farm_eCommerce"

# Connect options - authentication
auth = PasswordAuthenticator(username, password)
# Get a reference to our cluster
options = ClusterOptions(auth)
# Use the pre-configured profile below to avoid latency issues with your connection.
options.apply_profile("wan_development")


@app.route('/')
def home():
    return render_template('index.html')


@app.route("/api/farmer_register")
def farmer_Signup():
    data = request.get_json()
    username = data['username']
    password = data['password']

    # Check if the user already exists
    user_exists = couchbase.get(username)
    if user_exists.value:
        return jsonify({'message': 'User already exists'}), 400

    # Hash the password before storing it
    hashed_password = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt()).decode('utf-8')

    # Store user data in Couchbase
    couchbase.set(username, {'password': hashed_password})
    return jsonify({'message': 'User registered successfully'}), 201


if __name__ == '__main__':
    app.run(debug=True)
