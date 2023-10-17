from model import meta
from sqlalchemy import create_engine
import sqlalchemy
import os
from dotenv import load_dotenv

load_dotenv()


# import session for database interraction
from sqlalchemy.orm import sessionmaker

# define Base class for table class inheritance
try:
    # create a DB engine connection
    engine = create_engine(os.getenv('DB_ENGINE'))
    
    # create table on engine
    meta.create_all(engine)
    
    # create a session variable and bint the engine to it
    Session = sessionmaker(bind=engine)

    # instatiate the session
    session = Session()
    
    # results = session.query().all()

    # print(results)

    # for result in results:
    #     print(f"{result.id}: {result.favourites}")

except AttributeError as e:
    print(f"error message {e}")

except sqlalchemy.exc.ProgrammingError as e:
    print(f"An Error occured: {e}")
