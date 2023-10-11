from flask import Flask, request

import requests



app = Flask('Recipe')


@app.route('/')
def hello():
    return search()

app_key  = 'ce7b607fd4979d30ac028afd9897275d'
app_id = "142ecb9c"
base_url = 'https://api.edamam.com/api/recipes/v2?type=public&app_id={}&app_key={}&imageSize=REGULAR'.format(app_id,app_key)

async def search():
    # diet = 'diets'cl

    param = {
        'app_id' : app_id,
        'api_key':app_key
    }

    resp = requests.get(base_url, params=param)
    data = resp.json()

    # print(data)
    return data


if __name__ == '__main__':
    app.run(debug=True)
# search()