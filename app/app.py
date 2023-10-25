from flask import Flask
import os
from dotenv import load_dotenv
from core.db import create_db


# load evironmental files
load_dotenv()

# instantiate the main app
app = Flask(os.getenv('APP_NAME'),
            template_folder='app/templates',
            static_folder='app/static')

# load routes
from core.routes import bp as main_bp
app.register_blueprint(main_bp)

# run the code
if __name__ == '__main__':
    app.url_map.strict_slashes = False

    # run DB schema
    create_db()

    # run app on debug mode for test case
    app.run(host='0.0.0.0', debug=True)
