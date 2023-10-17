from flask import Flask, render_template, request, url_for, redirect
import json
import requests
import ast
import os
from dotenv import load_dotenv

# load evironmental files
load_dotenv()

# instantiate the main app
app = Flask(os.getenv('APP_NAME'),
            template_folder='app/templates',
            static_folder='app/static')

# route for index page
@app.route('/')
def hello():
    '''
    Return the index page
        parameters;
            none
        Return:
            data Object
            View
    '''
    # call the querry api method
    data = querry_api()
    
    # pass data to view
    return render_template('recipe/index.html',results =data)

# route for home page sama as index
@app.route('/home')
def home():
    '''
    Return the index page
        parameters;
            none
        Return:
            data Object
            View
    '''
    data = querry_api()
    return render_template('recipe/index.html',results =data)

# for test during dev remove before deployment
@app.route('/test')
def test():
    '''
    Return the Test page
        parameters;
            none
        Return:
            data Object
            View
    '''
    data = querry_api()
    return render_template('recipe/test.html', results = data)


# route for page details
@app.route('/details', methods=['POST'])
def detail():
    '''
    Return the Details page
        parameters;
            Post Object
        Return:
            data Object
            View
    '''    
    # get form data from form
    uri = request.form['item-details']
    
    # pass the param to the api
    data = query_uri(uri)
    
    # return view and data
    return render_template('recipe/detail.html', results = data)


# cart object for post
@app.route('/cart', methods=['POST'])
def cart():
    '''
    Redirect to the method that display cart
        parameters;
            none:
        Return:
            data Object
            redirect
    '''    
    data = request.get_json()
    
    # call the display cart function
    return redirect(url_for('cart_display', data = data))

# call the display url header
@app.route('/cart_display')
def cart_display():
    '''
    Return the cart page
        parameters;
            none
        Return:
            data Object
            View
    '''
    # get data from the cart uri
    data = request.args.get('data')
    
    # check if the data is nor none
    if data:
        # conver to valid json usinf ast module
        data_to_json = ast.literal_eval(data)
        
        # insitialize and empty array
        cart_dict_v = []
        cart_dict_k = []
        
        # loop through json Objects
        for k,v in data_to_json.items():
            
            # add key, value to array
            cart_dict_k.append(v)
            cart_dict_v.append(query_uri(k))
    
    # only run if oObject is null
    else:
          cart_dict_v = []
          cart_dict_k = []
    
    #  return the view with data
    return render_template('recipe/cart.html',
                           results = cart_dict_v,
                           results_count = cart_dict_k)

# Url for search results
@app.route('/search',  methods=['POST'])
def process_data():
    '''
    Get Post data from the Fetch javasccript function and 
    Return the redirect to search functon
        parameters;
            none
        Return:
            data Object
            View
    '''

    # get post data using request
    data = request.get_json()
    
    #  redirect to the search page
    return redirect(url_for('search_recipe',
                            search = data['search'],
                            select=data['selected_option']))

# search recipe
@app.route('/search_recipe')
def search_recipe():
    '''
    Get the search result from user
    Return the search with the search result page
    parameters:
        none
    Return:
        data Object
        View
    '''

    # get values from form fields using
    search = request.args.get('search')
    select = request.args.get('select')

    # call API with the search field
    results = querry_api(search, select)

    # format data for view for diet and ingredients
    search_data = ['','','Diets','Ingredients']

    # check the users selected options
    if select == '0' or select == '1':

        # return the user input to the view
        search = search
    else:

        # return the value of search data
        search = search_data[int(select)]

    # render the teplates with the view data
    return render_template('recipe/result.html',
                           results = results,
                           search=search)

# route for about page
@app.route('/about')
def about():
    '''
    Return the about page
        parameters;
            none
        Return:
            data Object
            View
    '''
    return render_template('profile/about.html')

# reurn contact page
@app.route('/contact')
def contact():
    '''
    Return the Contact page
        parameters;
            none
        Return:
            data Object
            View
    '''
    return render_template('profile/contact.html')


# favourtite route



def querry_api(querry_string=None, select_category=None):
    '''
    Make ApI call to the 
        parameters:
            querry_string: String
            select_caategory: String
        Return:
            API Object
    '''

    # get API pram from env
    app_key  = os.getenv('API_KEY')
    app_id = os.getenv('API_ID')

    # processe api param
    param = {
        'app_id' : app_id,
        'api_key':app_key
    }

    # format url for api query
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
   
    # querry api
    resp = requests.get(base_url, params=param)

    # convert to json
    data = json.loads(resp.text)

    # return api data
    return data


# make api call using uri
def query_uri(url):
    '''
    Make ApI call using URI
        parameters:
            uri: String
        Return:
            API Object
    ''' 

     # get API pram from env   
    app_key  = os.getenv('API_KEY')
    app_id = os.getenv('API_ID')

    # processe api param
    param = {
        'app_id' : app_id,
        'api_key':app_key,
        'uri':url
    }

    # format base uri
    base_url = "https://api.edamam.com/api/recipes/v2/by-uri?type=public&app_id={}&app_key={}&uri={}".format(app_id,app_key,url)

    # make call API
    resp = requests.get(base_url, params=param)

    # convert to json
    data = json.loads(resp.text)

    # return data
    return data


# run the code
if __name__ == '__main__':
    app.run(debug=True)
