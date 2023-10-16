from flask import Flask, render_template, request, url_for,redirect
import json
import requests
import ast

app = Flask('Recipe',template_folder='app/templates',
            static_folder='app/static')

@app.route('/')
def hello():
    data = querry_api()
    return render_template('recipe/index.html',results =data)

@app.route('/home')
def home():
    data = querry_api()
    return render_template('recipe/index.html',results =data)

@app.route('/test')
def test():
    data = querry_api()
    return render_template('recipe/test.html', results = data)


@app.route('/details', methods=['POST'])
def detail():
    # uri = request.form.get('item-details')
    uri = request.form['item-details']
    data = query_uri(uri)
    return render_template('recipe/detail.html', results = data)



@app.route('/cart', methods=['POST'])
def cart():
    data = request.get_json()
    # print(type(data))
    return redirect(url_for('cart_display', data = data))

@app.route('/cart_display')
def cart_display():
    data = request.args.get('data')
    data_to_json = ast.literal_eval(data)
    cart_dict_v = []
    cart_dict_k = []
    for k,v in data_to_json.items():
        cart_dict_k.append(v)
        cart_dict_v.append(query_uri(k))
        
    return render_template('recipe/cart.html',
                           results = cart_dict_v,
                           results_count = cart_dict_k)



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

    search_data = ['','','Diets','Ingredients']
    if select == '0' or select == '1':
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
        base_url = 'https://api.edamam.com/api/recipes/v2?type=public&app_id={}&app_key={}&cuisineType={}'.format(app_id,app_key,querry_string)
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

def query_uri(url):
    # diet = 'diets'
    # url="http://www.edamam.com/ontologies/edamam.owl#recipe_bd9abdc18478824909938628dcc574aa"
    
    app_key  = "ce7b607fd4979d30ac028afd9897275d"
    app_id = "142ecb9c"
    # uri= 'https://api.edamam.com/api/recipes/v2/by-uri?type=public&app_id=142ecb9c&app_key=ce7b607fd4979d30ac028afd9897275d&uri={}'.format(url)
    # url ='https://api.edamam.com/api/recipes/v2/by-uri?type=public&uri={}&app_id=142ecb9c&app_key=ce7b607fd4979d30ac028afd9897275d'.format(uri)

    param = {
        'app_id' : app_id,
        'api_key':app_key,
        'uri':url
    }
    base_url = "https://api.edamam.com/api/recipes/v2/by-uri?type=public&app_id={}&app_key={}&uri={}".format(app_id,app_key,url)
    resp = requests.get(base_url,params=param)
    # print(uri)
    data = json.loads(resp.text)
    # print(resp)

    # print(data)
    return data


if __name__ == '__main__':
    app.run(debug=True)
# search()