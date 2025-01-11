#!/usr/bin/env python3

# Standard library imports
from random import randint, choice as rc

# Remote library imports
from faker import Faker

# Local imports
from app import app
from models import db, Movie, TVShow

if __name__ == '__main__':
    fake = Faker()
    with app.app_context():
        print("Starting seed...")
        # Seed code goes here!

        # Delete previous records
        print("deleting previous records...")
        Movie.query.delete()
        TVShow.query.delete()

        # Hard coded lists for seeding
        genres = ["Action", "Romance", "Comedy", "Horror", "True Crime", "Science Fiction"]
        months = [
            "January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"
        ]
        streaming_services = [
            "Netflix", "Amazon Prime Video", "Disney+", "Hulu", "HBO Max",
            "Apple TV+", "Peacock", "Paramount+", "YouTube"
        ]

        # lists to check value uniqueness
        titles = []
        poster_urls = []

        # helper functions
        def unique_title():
            # Ensures every title is unique
            title = fake.name()
            while title in titles:
                title = fake.name()
            titles.append(title)
            return title

        def unique_poster_url():
            # Ensures every poster_url is unique
            poster_url = fake.url()
            while poster_url in poster_urls:
                poster_url = fake.url()
            poster_urls.append(poster_url)
            return poster_url

        def random_release_date():
            # creates random release date
            random_month = rc(months)
            random_day = randint(1, 31)
            random_year = randint(1950, 2024)
            random_date = f"{random_month}|{random_day}|{random_year}"
            return random_date

        def unique_streaming_options_string():
            # Create streaming_options string
            unique_options = set()
            while len(unique_options) < 3:
                unique_options.add(rc(streaming_services))
            options_string = "|".join(unique_options)
            return options_string

        # Create Movie records
        print("creating movie records...")

        # list of movies that will be added to db
        movies = []

        for i in range(10):
            
            # Create Movie instance
            movie = Movie(
                title=unique_title(),
                poster_url=unique_poster_url(),
                genre=rc(genres),
                duration=randint(90, 180),
                description=fake.paragraph(nb_sentences=3),
                release_date=random_release_date(),
                streaming_options=unique_streaming_options_string()
            )

            movies.append(movie)

        db.session.add_all(movies)
        db.session.commit()

        # Create TV Show records
        print("creating tv show records...")

        # list of movies that will be added to db
        tv_shows = []

        for i in range(10):

            # Create Movie instance
            tv_show = TVShow(
                title=unique_title(),
                poster_url=unique_poster_url(),
                genre=rc(genres),
                seasons=randint(1, 15),
                description=fake.paragraph(nb_sentences=3),
                release_date=random_release_date(),
                streaming_options=unique_streaming_options_string()
            )

            tv_shows.append(tv_show)

        db.session.add_all(tv_shows)
        db.session.commit()

        print("database seeded!")