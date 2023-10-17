from db import session
from model import Favourite


def getfirst_item():
    results = session.query(Favourite).first()
    if results is not None:
        print(f"{results.id}: {results.favourites}")
    else:
        print("Nothing")

def get_all():
    results = session.query(Favourite).all()
    print(results)

    for result in results:
        print(f"{result.id}: {result.favourites}")

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
remove_uri(2)