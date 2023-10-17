'''
Write a python file that contains the class definition of a State
and an instance Base = declarative_base()
'''
# Import Modules from ORM
from sqlalchemy import Column, Integer, String, MetaData, Table
from sqlalchemy.ext.declarative import declarative_base

# define Base class for table class inheritance
Base = declarative_base()

meta = MetaData()
favourite = Table('favourites', meta,
                  Column('id', Integer, primary_key=True,
                         autoincrement=True, 
                         unique=True, nullable=False),
                  Column('favourites', String,
                         nullable=False)
                  )

# create a table for class state
class Favourite(Base):
    '''
        class defintion for SQL table states
        pARAMETER
            Base declarative
        Return:
        base meta data for the creation of state tables
    '''
    # define table name
    __tablename__ = 'favourites'
    # define column for favourite
    id = Column(Integer, primary_key=True,
                autoincrement=True, unique=True, nullable=False)
    favourites = Column(String(256), nullable=False)
