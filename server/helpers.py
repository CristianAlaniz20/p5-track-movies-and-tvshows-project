# Remote library imports
from flask import jsonify, make_response

# Helper functions
def no_data_response():
    return make_response(jsonify({"error" : "No data was received."}), 404)

def empty_username_or_password_response():
    return make_response(jsonify({"error" : "username and password cannot be empty."}), 404)

def error_response(error):
    return make_response(jsonify({"error": str(error)}), 404)

def no_user_found_response():
    return make_response(jsonify({"error" : "User not found."}), 404)

