from config import ma 
from models import User, Movie, TVShow, MovieWatchEvent, TVShowWatchEvent

class UserSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = User
        include_relationships = True
        load_instance = True

class MovieSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = Movie
        include_relationships = True
        load_instance = True

class TVShowSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = TVShow
        include_relationships = True
        load_instance = True

class MovieWatchEventSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = MovieWatchEvent
        include_relationships = True
        load_instance = True

class TVShowWatchEventSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = TVShowWatchEvent
        include_relationships = True
        load_instance = True