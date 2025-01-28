from config import ma 
from models import User, Movie, TVShow, MovieWatchEvent, TVShowWatchEvent
from marshmallow import fields

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

class UserSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = User
        include_relationships = True
        load_instance = True

    movies = fields.Method("get_unique_movies")
    tv_shows = fields.Method("get_unique_tv_shows")

    def get_unique_movies(self, obj):
        items = getattr(obj, "movies", [])
        unique_items = list({item.id: item for item in items}.values())
        return MovieSchema(many=True).dump(unique_items)

    def get_unique_tv_shows(self, obj):
        items = getattr(obj, "tv_shows", [])
        unique_items = list({item.id: item for item in items}.values())
        return TVShowSchema(many=True).dump(unique_items)

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