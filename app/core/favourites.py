'''
Module for favourite CRUD 
'''
from core.db import session
from core.model import Favourite


def getfirst_item():
    '''
    Get the first item from DB
    Parmaeter: 
        none
    return:
        DB object
    '''
    # call the sesstion with model as param
    results = session.query(Favourite).first()

    # close session
    session.close()

    # return object
    return results

def get_all():
    '''
    Get the all item from DB
    Parmaeter: 
        none
    return:
        DB object
    '''
    # call the sesstion with model as param
    results = session.query(Favourite).all()

    # close db connection
    session.close()

    # return DB object
    return results

def add_favourite(favourite_uri):
    '''
    Get add item to db
    Parmaeter: 
        id:String
    return:
        none
    '''
    # use mode to get table detiails
    fav = Favourite(favourites =favourite_uri)

    # use the add method to add param
    session.add(fav)

    # commit changes
    session.commit()
    
def remove_uri(uri_id):
    '''
    Remove item from DB
    Parmaeter: 
        id:String
    return:
        none
    '''
    # call get the emelent and delete
    session.query(Favourite).filter(Favourite.favourites == uri_id).delete()
    session.commit()

def get_item(id):
    '''
    get item from db using ID
    Parmaeter: 
        id:String
    return:
        object
    '''
    results = session.query(Favourite).filter(Favourite.favourites == id).first()
    session.close()
    return results
