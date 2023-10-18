from core.db import session
from core.model import Favourite


def getfirst_item():
    results = session.query(Favourite).first()
    session.close()
    return results

def get_all():
    results = session.query(Favourite).all()
    session.close()
    return results

def add_favourite(favourite_uri):
    fav = Favourite(favourites =favourite_uri)
    session.add(fav)
    session.commit()
    
def remove_uri(uri_id):
    session.query(Favourite).filter(Favourite.id == uri_id).delete()
    session.commit()

# add_favourite('Cake')
# add_favourite('Recipe')

# get_all()
# getfirst_item()
# remove_uri(1)
# remove_uri(3)