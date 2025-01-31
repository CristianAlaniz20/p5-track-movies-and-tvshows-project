# Remote library imports
from flask import jsonify, make_response

# Reponse helpers
def no_data_response():
    return make_response(jsonify({"error" : "No data received."}), 404)

def empty_username_or_password_response():
    return make_response(jsonify({"error" : "username and password cannot be empty."}), 404)

def error_response(error):
    return make_response(jsonify({"error": str(error)}), 404)

def no_user_found_response():
    return make_response(jsonify({"error" : "User not found."}), 404)

def no_session_id_response():
    return make_response(jsonify({"error" : "No user id found in session."}), 401)

def invalid_status_value_response():
    return make_response(jsonify({"error" : "Invalid status value."}), 404)

def no_url_id_response(id):
    return make_response(jsonify({"error" : f"No {id} id received."}), 404)

def no_watch_event_found_response(event_type):
    return make_response(jsonify({"error" : f"No {event_type} watch event found."}), 404)

def existing_watch_event_not_matching_session_id_response(event_type):
    return make_response(jsonify({"error" ; f"existing {event_type} watch event user id does not match session id."}), 404)

def existing_watch_event_not_matching_content_id_response(event_type):
     return make_response(jsonify({"error" : f"{event_type} id does not match existing {event_type} watch event."}), 404)

# Validation helpers
def validate_rating(value):
    if not isinstance(value, int):
        raise ValueError("Rating must be an integer.")
    return value

def validate_notes(value):
    if not isinstance(value, str):
        raise ValueError("Notes must be a string.")
    return value
