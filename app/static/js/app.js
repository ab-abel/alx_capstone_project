
// add all item to cart btn in the page
const cart = document.querySelectorAll('#cart-btn');
if(cart) {
    cart.forEach(item =>{
        item.addEventListener('click', (e)=> {

            // add item to car
            addItemToCart(item.value);

        });
    });
};


/**
 * @function addItemToCart
 * @param {String} item 
 * @returns None
 * @description This function add an item to storage
 */
function addItemToCart(item) {

    // get the current cart items
    let cart = JSON.parse(localStorage.getItem('cart')) || {};

    // check if cart has value with item as key
    if (cart.hasOwnProperty(item)){

        // increament the cart
        cart[item]++;
    }else{
        // asign one to the cart
        cart[item] = 1;     
    }

    // set the cart witthe item value
    localStorage.setItem('cart', JSON.stringify(cart));

    // show the cart
    // displayCart();
    displayCart();
}

/**
 * @function removeItemfromCart
 * @param {String} item 
 * @returns None
 * @description This function remove an item from storage
 */
function removeItemfromCart(item){

    // Get current cart object
    let cart = JSON.parse(localStorage.getItem('cart'));

    // check if the item is part of the object and the object is not empty
    if(cart.hasOwnProperty(item) && cart[item] > 1){

        // decrement the value of the item if > 1
        cart[item] = cart[item] - 1;

        // write the current value back to the session storage
        localStorage.setItem('cart', JSON.stringify(cart));

    // this code block only run if u decreament cart to be less than 1
    }else if (cart[item] <= 1){

        // remove object to remove item form the cart
        delete cart[item];

        // replace the cart with the new items
        localStorage.setItem('cart', JSON.stringify(cart));
    }
    // diplay the current cart
    displayCart();
}


/**
 * @function getCartFromStorage
 * @param {} None
 * @returns None
 * @description Return the avaialble cart from the storage
 */
function getCartFromStorage() {

    // check if there is item in the session storage
    if(sessionStorage.length >= 0){

        // convert the item to JSON object 
        const cart_object = JSON.parse(localStorage.getItem('cart'));

        // return the value
        return cart_object;

    } else {

        // this code block run if the session storage is empty
        return '';
    }
}

/**
 * @function displayCart
 * @param {} None
 * @returns None
 * @description Send the number of item in cart to page
 */
function displayCart(){
    // clear the previous cart display element
    const cart_display = document.getElementById('cart-item');
    cart_display.textContent =''

    // get element from stroage
    const cart = getCartFromStorage();
    
    // check if the request retunr empty
    if(cart != null || cart != undefined ){
        // using the Object key loop through the cart
        Object.keys(cart).forEach(function(key){
            // check if the cart object has values
            if(Object.values(cart) != 0){
                // console.log(Object.values(cart)[0]);
                var sum = 0;
                // check the total number of item in the storage
                for (let i = 0; i < Object.values(cart).length; i++){

                    // sum the values
                    sum += Object.values(cart)[i];
                };

                // send result to display
                const cart_display = document.getElementById('cart-item');
                cart_display.textContent = sum;
            };
        });
    };
};

// send local storage data to backend
//  add uri to the cart li
function send_cart_to_backend(){
    const add_href = document.getElementById('cart');
    add_href.style.cursor = 'pointer';
    add_href.addEventListener('click', ()=>{
        data_to_send = getCartFromStorage();
        fetch('/cart', {
            method:'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data_to_send), 
            
        }).then(response=>{
                
            if(response.redirected){
                // console.log(response.url[0])
                window.location.href = response.url;
            }else{
                response.json();  
            }
        });

    })
}

/**
 * @function update_cart_from_storage
 * @param {} None
 * @returns None
 * @description render cart count to cart page
 */
function update_cart_from_storage(){
    
    // create an array from page uri value
    let cart_uri = [];
    const cart_temp = document.querySelectorAll('#cart-uri');

    cart_temp.forEach(item =>{
        cart_uri.push(item.href);
    })

    // create an array from storage value
    const cart_value = [];
    const stored_data = getCartFromStorage();
    for (let [key, value] of Object.entries(stored_data)) {
        cart_value.push(value);
    }

    // loop through the querry
    for (let i = 0; i < cart_uri.length; i++){
        const cart_counter_temp = document.querySelectorAll('.cart-counter');
        cart_counter_temp[i].textContent = cart_value[i];
        cart_counter_temp[i].style.color ='#ffffff';
        
        if (Number(cart_value[i]) < 1 || cart_value[i] === undefined){
            
            // post cart to backend
            data_to_send = getCartFromStorage();
            fetch('/cart', {
                method:'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data_to_send), 
                
            }).then(response=>{
                // goto a new location base on response
                if(response.redirected){
                    
                    window.location.href = response.url;
                }else{
                    response.json();  
                };
            });
        };
    };
}


/**
 * @function Remove cart caller
 * @param {} None
 * @returns None
 * @description This method decreatment the cart value for every item
 */
function remove_cart(){
    // querry all button with id
    const remove_cart_item_btn = document.querySelectorAll('#remove-cart-item-btn');

    // if not empty
    if(remove_cart_item_btn){

        // iterate over and remove item based on button clicked
        remove_cart_item_btn.forEach(item => {
            item.addEventListener('click',(e)=>{

                // prevent btn from submition
                e.preventDefault();

                // method call
                removeItemfromCart(item.value);

                // show the number of item left in cart 
                update_cart_from_storage();
            });
        });
    }
}


/**
 * @function send_fav_to_backend
 * @param {} None
 * @returns None
 * @description Send favorite item to DB
 */
function send_fav_to_backend(value){
    // send post to db
    fetch('/browse', {
        method:'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(value), 
        
    }).then(response=>{
            
        if(response.redirected){
            window.location.href = response.url;
        }else{
            response.json();  
        }
    });
}


const fav_button = document.querySelectorAll('#fav-btn');

if(fav_button) {
    for (const [key, value] of Object.entries(fav_button)){
        value.addEventListener('click', (e)=> {
            document.querySelectorAll('.cart-counter')[key].innerHTML ='';
            // send_fav_to_backend(JSON.stringify(value.value));
            const value_str = String(value.value)

            //  this keep throwing
            send_fav_to_backend(value_str);
            // item added succesfully

            let fav_response = document.querySelectorAll(".cart-counter");
            let fav_i = document.createElement('i');
            fav_i.style.color = '#ffffff';
            fav_i.style.animation = 'cart-fader 1s';
            fav_i.setAttribute('class', 'fa fa-heart');
            fav_response[key].appendChild(fav_i);
        })
    }
}


// method calls
displayCart();
send_cart_to_backend();
update_cart_from_storage();
remove_cart();
