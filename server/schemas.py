from config import ma 
from models import User, Movie, TVShow, MovieWatchEvent, TVShowWatchEvent
from marshmallow import fields

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

class MovieSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = Movie
        include_relationships = True
        load_instance = True

    movie_watch_events = fields.List(fields.Nested(MovieWatchEventSchema), default=list)

class TVShowSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = TVShow
        include_relationships = True
        load_instance = True

    tv_show_watch_events = fields.List(fields.Nested(TVShowWatchEventSchema), default=list)


class UserSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = User
        include_relationships = True
        load_instance = True

    movies = fields.Method("get_unique_movies")
    tv_shows = fields.Method("get_unique_tv_shows")
    
    # Define watch_events to handle a list of WatchEvent objects
    movie_watch_events = fields.List(fields.Nested(MovieWatchEventSchema), default=list)
    tv_show_watch_events = fields.List(fields.Nested(TVShowWatchEventSchema), default=list)

    def get_unique_movies(self, obj):
        items = getattr(obj, "movies", [])
        unique_items = list({item.id: item for item in items}.values())
        return MovieSchema(many=True).dump(unique_items)

    def get_unique_tv_shows(self, obj):
        items = getattr(obj, "tv_shows", [])
        unique_items = list({item.id: item for item in items}.values())
        return TVShowSchema(many=True).dump(unique_items)
