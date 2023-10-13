from flask import Flask, render_template, request
import json
import requests

app = Flask('Recipe',template_folder='app/templates',
            static_folder='app/static')

@app.route('/')
def hello():
    hi ='ji'
    return render_template('recipe/index.html')

@app.route('/test')
def test():
    data = api_call()
    return render_template('recipe/test.html', results = data['hits'])

@app.route('/search')
def search():
    data = api_call()
    return render_template('recipe/result.html', results = data)


app_key  = 'ce7b607fd4979d30ac028afd9897275d'
app_id = "142ecb9c"
base_url = 'https://api.edamam.com/api/recipes/v2?type=public&app_id={}&app_key={}&imageSize=REGULAR'.format(app_id,app_key)

def api_call():
    # diet = 'diets'cl

    param = {
        'app_id' : app_id,
        'api_key':app_key
    }

    resp = requests.get(base_url, params=param)
    data = json.loads(resp.text)

    # print(data)
    return data


if __name__ == '__main__':
    app.run(debug=True)
# search()