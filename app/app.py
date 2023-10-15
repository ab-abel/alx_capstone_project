from flask import Flask, render_template, request, url_for,redirect
import json
import requests

app = Flask('Recipe',template_folder='app/templates',
            static_folder='app/static')

@app.route('/')
def hello():
    data = querry_api()
    return render_template('recipe/index.html',results =data)

# @app.route('/test')
# def test():
#     data = api_call()
#     return render_template('recipe/test.html', results = data)

# @app.route('/searchh')
# def searche():
#     data = api_call()
#     return render_template('recipe/result.html', results = data)

@app.route('/search',  methods=['POST'])
def process_data():
    data = request.get_json()
    return redirect(url_for('search_recipe',
                            search = data['search'],
                            select=data['selected_option']))

@app.route('/search_recipe')
def search_recipe():
    
    search = request.args.get('search')
    select = request.args.get('select')
    results = querry_api(search, select)

    search_data = ['','Calories','Diets','Ingredients']
    if select == '0':
        search = search
    else:
        search = search_data[int(select)]
    
    return render_template('recipe/result.html',
                           results = results,
                           search=search)


def querry_api(querry_string =None, select_category=None):
    
    app_key  = 'ce7b607fd4979d30ac028afd9897275d'
    app_id = "142ecb9c"
    param = {
        'app_id' : app_id,
        'api_key':app_key
    }
    
    if select_category == '0':
        base_url = 'https://api.edamam.com/api/recipes/v2?type=public&app_id={}&app_key={}&q={}'.format(app_id,app_key,querry_string)  
    elif select_category == '1':
        base_url = 'https://api.edamam.com/api/recipes/v2?type=public&app_id={}&app_key={}&calories={}'.format(app_id,app_key,querry_string)
    elif select_category == '2':
        base_url = 'https://api.edamam.com/api/recipes/v2?type=public&app_id={}&app_key={}&diet={}'.format(app_id,app_key,querry_string)
    elif select_category == '3':
        base_url = 'https://api.edamam.com/api/recipes/v2?type=public&app_id={}&app_key={}&ingr={}'.format(app_id,app_key,querry_string)
    else:
        base_url = 'https://api.edamam.com/api/recipes/v2?type=public&app_id={}&app_key={}&diet=balanced'.format(app_id,app_key)    
    resp = requests.get(base_url, params=param)
    data = json.loads(resp.text)
    return data

         

    # diet = ['high-protein','low-carb','low-fat', 'low-sodium', 'balanced', 'high-fiber']
    # base_url = 'https://api.edamam.com/api/recipes/v2?type=public&app_id={}&app_key={}&imageSize=REGULAR'.format(app_id,app_key)
    # base_url = 'https://api.edamam.com/api/recipes/v2?type=public&app_id={}&app_key={}&q=Sweet'.format(app_id,app_key)
    # base_url = 'https://api.edamam.com/api/recipes/v2?type=public&app_id={}&app_key={}&ingr=1-2'.format(app_id,app_key)
    # base_url = 'https://api.edamam.com/api/recipes/v2?type=public&app_id={}&app_key={}&diet=low-fat'.format(app_id,app_key)
    # base_url = 'https://api.edamam.com/api/recipes/v2?type=public&app_id={}&app_key={}&calories=100-200'.format(app_id,app_key)

def api_call():
    # diet = 'diets'cl
    app_key  = 'ce7b607fd4979d30ac028afd9897275d'
    app_id = "142ecb9c"
    
    param = {
        'app_id' : app_id,
        'api_key':app_key
    }
    base_url = 'https://api.edamam.com/api/recipes/v2?type=public&app_id={}&app_key={}&calories=100-200'.format(app_id,app_key)
    resp = requests.get(base_url, params=param)
    data = json.loads(resp.text)

    # print(data)
    return data


if __name__ == '__main__':
    app.run(debug=True)
# search()