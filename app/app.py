app_key  = 'ce7b607fd4979d30ac028afd9897275d'
app_id = "142ecb9c"
# base_url = 'https://api.edamam.com/api/recipes/v2'
base_url = 'https://api.edamam.com/api/recipes/v2?type=public&app_id=142ecb9c&app_key=ce7b607fd4979d30ac028afd9897275d&imageSize=REGULAR'

import requests

def search():
    # diet = 'diets'cl

    param = {
        'app_id' : app_id,
        'api_key':app_key
    }

    resp = requests.get(base_url, params=param)
    data = resp.json()

    print(data)

search()