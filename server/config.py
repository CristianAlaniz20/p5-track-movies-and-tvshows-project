# Standard library imports
import os

# Remote library imports
from flask import Flask
from flask_cors import CORS
from flask_migrate import Migrate
from flask_restful import Api
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import MetaData
from flask_bcrypt import Bcrypt
from flask_marshmallow import Marshmallow 
from dotenv import load_dotenv

# Local imports

# Load environment variables from a .env file
load_dotenv()

# Instantiate app, set attributes
app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///app.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.json.compact = False

# Set the secret key from the environment variable
app.secret_key = os.getenv("SECRET_KEY")

# Define metadata, instantiate db
metadata = MetaData(naming_convention={
    "fk": "fk_%(table_name)s_%(column_0_name)s_%(referred_table_name)s",
})
db = SQLAlchemy(metadata=metadata)
migrate = Migrate(app, db)
db.init_app(app)

# Instantiate Marshmallow
ma = Marshmallow(app)

# Instantiate REST API
api = Api(app)

# Instantiate CORS
CORS(app)

# Insantiate bcrypt
bcrypt = Bcrypt(app)