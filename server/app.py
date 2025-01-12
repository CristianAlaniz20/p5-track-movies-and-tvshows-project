#!/usr/bin/env python3

# Standard library imports

# Remote library imports
from flask import request, session, jsonify, make_response
from flask_restful import Resource
from sqlalchemy.exc import IntegrityError

# Local imports
from config import app, db, api
# Add your model imports
from models import User, Movie, TVShow, MovieWatchEvent, TVShowWatchEvent
# Helper functions imports
from helpers import no_data_response, empty_username_or_password_response, error_response, no_user_found_response

# Views go here!

class Signup(Resource):
    def post(self):
        try:
            data = request.get_json()
            username = data['username']
            password = data['password']

            if not data:
                return no_data_response()
            elif len(username) == 0 or len(password) == 0:
                return empty_username_or_password_response()
            else:
                # Create new user instance and set user password
                new_user = User(username=username)
                new_user.password_hash = password

                # add and commit to db
                db.session.add(new_user)
                db.session.commit()

                # Create response
                response = {
                    "message" : "User successfully created!",
                    "new_user" : new_user.to_dict()
                }

                return make_response(jsonify(response), 201)

        # User model constraints not met
        except IntegrityError as e:
            return error_response(e)

        # All other exceptions
        except Exception as e:
            return error_response(e)

class Login(Resource):
    def post(self):
        try:
            data = request.get_json()
            username = data['username']
            password = data['password']
            user = User.query.filter_by(username=username).first()

            if not data:
                return no_data_response()
            elif len(username) == 0 or len(password) == 0:
                return empty_username_or_password_response()
            elif not user:
                return no_user_found_response()
            else:
                if user.authenticate(password):
                    # assign user db id to session user_id
                    session['user_id'] = new_user.id

                    # create response
                    response = {
                        "message" : "Successfully logged in.",
                        "user" : user.to_dict()
                    }

                    return make_response(jsonify(response), 200)

                # invalid password
                return make_response(jsonify({"error" : "invalid password."}), 404)

        # All other exceptions
        except Exception as e:
            return error_response(e)
        

# Adding resources to api
api.add_resource(Signup, '/signup', endpoint='signup')
api.add_resource(Login, '/login', endpoint='login')


if __name__ == '__main__':
    app.run(port=5555, debug=True)

