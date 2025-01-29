from sqlalchemy.ext.associationproxy import association_proxy
from sqlalchemy.ext.hybrid import hybrid_property
from sqlalchemy import DateTime
from sqlalchemy.orm import validates
from datetime import datetime

from config import db, bcrypt
from helpers import validate_rating, validate_notes

# Models go here!
class User(db.Model):
    __tablename__ = "users"

    # Create User Columns
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String, nullable=False, unique=True)
    _password_hash = db.Column(db.String)

    # Create model relationships
    movie_watch_events = db.relationship("MovieWatchEvent", back_populates="user", cascade="all, delete-orphan")

    tv_show_watch_events = db.relationship("TVShowWatchEvent", back_populates="user", cascade="all, delete-orphan")

    # Assocation proxies
    movies = association_proxy('movie_watch_events', 'movie', creator=lambda movie_obj: MovieWatchEvent(movie=movie_obj))

    tv_shows = association_proxy('tv_show_watch_events', 'tv_show', creator=lambda tv_show_obj: TVShowWatchEvent(tv_show=tv_show_obj))

    # For debugging purposes
    def __repr__(self):
      return f'User: ID {self.id}, Username {self.username}'

    # Hashing and Salting password
    @hybrid_property
    def password_hash(self):
        raise AttributeError("Password hashes are not accessible.")

    @password_hash.setter
    def password_hash(self, password):
        password_hash = bcrypt.generate_password_hash(
        password.encode('utf-8'))
        self._password_hash = password_hash.decode('utf-8')

    def authenticate(self, password):
        return bcrypt.check_password_hash(
            self._password_hash, password.encode('utf-8'))

class Movie(db.Model):
    __tablename__ = "movies"

    # Create Movie Columns
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String, nullable=False, unique=True)
    poster_url = db.Column(db.String, nullable=False, unique=True)
    genre = db.Column(db.String, nullable=False)
    duration = db.Column(db.Integer, nullable=False)
    description = db.Column(db.String, nullable=False)
    release_date = db.Column(db.String, nullable=False)
    streaming_options = db.Column(db.String, nullable=False)

    # Create model relationships
    movie_watch_events = db.relationship("MovieWatchEvent", back_populates="movie", cascade="all, delete-orphan")

    # For debugging purposes
    def __repr__(self):
      return f'Movie: ID {self.id}, Title {self.title}, Poster_URL {self.poster_url}, Genre {self.genre}, Duration {self.duration}, Description {self.description}, Release_Date {self.release_date}, Streaming_Options {self.streaming_options}'

class TVShow(db.Model):
    __tablename__ = "tv_shows"

    # Create TVShow Columns
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String, nullable=False, unique=True)
    poster_url = db.Column(db.String, nullable=False, unique=True)
    genre = db.Column(db.String, nullable=False)
    seasons = db.Column(db.Integer, nullable=False)
    description = db.Column(db.String, nullable=False)
    release_date = db.Column(db.String, nullable=False)
    streaming_options = db.Column(db.String, nullable=False)

    # Create model relationships
    tv_show_watch_events = db.relationship("TVShowWatchEvent", back_populates="tv_show", cascade="all, delete-orphan")

    # For debugging purposes
    def __repr__(self):
      return f'TVShow: ID {self.id}, Title {self.title}, Poster_URL {self.poster_url}, Genre {self.genre}, Duration {self.duration}, Description {self.description}, Release_Date {self.release_date}, Streaming_Options {self.streaming_options}'

class MovieWatchEvent(db.Model):
    __tablename__ = "movie_watch_events"

    # Create MovieWatchEvent Columns
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    movie_id = db.Column(db.Integer, db.ForeignKey('movies.id'))
    rating = db.Column(db.Integer)
    notes = db.Column(db.String)
    status = db.Column(db.String, nullable=False)
    created_at = db.Column(DateTime, default=datetime.utcnow)

    # Create model relationships
    user = db.relationship("User", back_populates="movie_watch_events")

    movie = db.relationship("Movie", back_populates="movie_watch_events")

    # Column validations
    @validates('rating')
    def validates_rating(self, key, value):
      return validate_rating(value)

    @validates('notes')
    def validates_notes(self, key, value):
      return validate_notes(value)

    # For debugging purposes
    def __repr__(self):
      return f'MovieWatchEvent: ID {self.id}, User_ID {self.user_id}, Movie_ID {self.movie_id}, Rating {self.rating}, Notes {self.notes}, Status {self.status}'

class TVShowWatchEvent(db.Model):
    __tablename__ = "tv_show_watch_events"

    # Create TVShowWatchEvent Columns
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    tv_show_id = db.Column(db.Integer, db.ForeignKey('tv_shows.id'))
    rating = db.Column(db.Integer)
    notes = db.Column(db.String)
    status = db.Column(db.String, nullable=False)
    created_at = db.Column(DateTime, default=datetime.utcnow)

    # Create model relationships
    user = db.relationship("User", back_populates="tv_show_watch_events")

    tv_show = db.relationship("TVShow", back_populates="tv_show_watch_events")

    # Column validations
    @validates('rating')
    def validates_rating(self, key, value):
      return validate_rating(value)

    @validates('notes')
    def validates_notes(self, key, value):
      return validate_notes(value)

    # For debugging purposes
    def __repr__(self):
      return f'TVShowWatchEvent: ID {self.id}, User_ID {self.user_id}, TV_Show_ID {self.tv_show_id}, Rating {self.rating}, Notes {self.notes}, Status {self.status}'
