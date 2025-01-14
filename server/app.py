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
                    session['user_id'] = user.id

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
        
class CheckSession(Resource):
    def get(self):
        if session['user_id']:
            user = User.query.filter_by(id=session['user_id']).first()
            if user:
                response = {
                    "message" : "Session user found",
                    "user" : user.to_dict()
                }
                return make_response(jsonify(response), 200)
            else:
                session['user_id'] = None
                return no_user_found_response()
        else:
            return make_response(jsonify({"error" : "No user id found in session."}), 401)

class Logout(Resource):
    def delete(self):
        if session['user_id']:
            session['user_id'] = None

            return make_response(jsonify({"message" : "logged out"}), 200)
        else:
            return make_response(jsonify({"error" : "Already logged out"}), 404)

class SearchResults(Resource):
    def post(self):
        try:
            data = request.get_json()
            title = data['title']

            if not data:
                return no_data_response()
            elif len(title) == 0:
                return make_response(jsonify({"error" : "Enter a title before searching."}), 404)
            else:
                # Query Movie and TVShow db table for content that matches the title received
                movie_results = [movie.to_dict() for movie in Movie.query.all() if title.lower() in movie.title.lower()]
                tv_show_results = [tv_show.to_dict() for tv_show in TVShow.query.all() if title.lower() in tv_show.title.lower()]

                search_results = movie_results + tv_show_results

                # Create response
                if len(search_results) > 0:
                    # reults found response
                    response = {
                        "message" : "Matching results found.",
                        "results" : search_results
                    }
                else:
                    # no results found response
                    response = {
                        "message" : "No results found for the given string.",
                        "results" : search_results
                    }

                return make_response(jsonify(response), 200)

        # All other exceptions
        except Exception as e:
            return error_response(e)

class MovieEvent(Resource):
    def post(self, movie_id):
        try:
            data = request.get_json()
            rating = data['rating']
            notes = data['notes']
            status = data['status']
            existing_movie_watch_event = MovieWatchEvent.query.filter(MovieWatchEvent.user_id == session['user_id'], MovieWatchEvent.movie_id == movie_id).first()

            if existing_movie_watch_event:
                return make_response(jsonify({"error" : "A movie watch event already exists."}), 404)
            elif not movie_id:
                return make_response(jsonify({"error" : "No movie id was received."}), 404)
            elif not session['user_id']:
                return make_response(jsonify({"error" : "No user id found in session."}), 401)
            elif not data:
                return no_data_response()
            elif not status:
                return make_response(jsonify({"error" : "Status cannot be empty."}), 404)
            else:
                # Create a new MovieWatchEvent instance
                new_movie_watch_event = MovieWatchEvent(
                    user_id = session['user_id'],
                    movie_id=movie_id,
                    rating=rating,
                    notes=notes,
                    status=status
                )

                # Add and Commit to db
                db.session.add(new_movie_watch_event)
                db.session.commit()

                # Create response
                response = {
                    "message" : "Movie watch event successfully created.",
                    "watch_event" : new_movie_watch_event.to_dict(rules=('-user', '-movie',))
                }
                
                return make_response(jsonify(response), 201)

        # User model constraints not met
        except IntegrityError as e:
            return error_response(e)

        # All other exceptions
        except Exception as e:
            return error_response(e)
        

# Adding resources to api
api.add_resource(Signup, '/signup', endpoint='signup')
api.add_resource(Login, '/login', endpoint='login')
api.add_resource(CheckSession, '/check_session', endpoint='check_session')
api.add_resource(Logout, '/logout', endpoint='logout')
api.add_resource(SearchResults, '/search_results', endpoint='search_results')
api.add_resource(MovieEvent, '/movie_event/<int:movie_id>', endpoint='movie_event')


if __name__ == '__main__':
    app.run(port=5555, debug=True)

