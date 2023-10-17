// get input element from field

const select = document.getElementById('select-id')
const alert = document.getElementById('alert')



select.addEventListener('change', (e)=>{
    e.preventDefault();
    document.getElementById('alert').innerHTML = '';

    if(select.value == 1){
        const span = document.createElement('span');
        span.setAttribute('class', 'close-alert');
        span.innerHTML = '&times;';
       
        const p = document.createElement('p');
        p.style.margin = 0;
        p.innerHTML = 'Keyword Hint: American, Asian, British, Chinese, Central Europe, French, India';
        alert.appendChild(span);
        alert.appendChild(p);
        span.setAttribute('onclick',"this.parentElement.style.display='none'")
        
    }
    else if(select.value == 2){
        const span = document.createElement('span');
        span.setAttribute('class', 'close-alert');
        span.innerHTML = '&times;';
       
        const p = document.createElement('p');
        p.innerHTML = 'Keyword Hint: Balanced, Low-Sodium, Low-Fat, Low-Carb, High-Protein, High-Fiber';
        alert.appendChild(span);
        alert.appendChild(p);
        span.setAttribute('onclick',"this.parentElement.style.display='none'")
        
    }
    else if(select.value == 3) {
        const span = document.createElement('span');
        span.setAttribute('class', 'close-alert');
        span.innerHTML = '&times;';
        span.setAttribute('onclick',"this.parentElement.style.display='none'")
        const p = document.createElement('p');
        p.innerHTML = 'Hint: Enter 1-3 to search ingredients between that range';
        alert.appendChild(span);
        alert.appendChild(p);
    }
})

// add all item to cart
const cart = document.querySelectorAll('#cart-btn');
if(cart) {
    cart.forEach(item =>{
        item.addEventListener('click', (e)=> {
            // e.preventDefault();
            // console.log(cart.value);
            addItemToCart(item.value);
            // saveScore(cart.value)
        })
    })
}


// this function add item to the session storage
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

// this function remove an item from storage
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

// Return the avaialble cart from the storage
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


function displayCart(){
    const cart_display = document.getElementById('cart-item');
    cart_display.textContent =''
    const cart = getCartFromStorage();
    
    // check if the request retunr empty
    if(cart != null || cart != undefined ){
        // using the Object key loop through the cart
        Object.keys(cart).forEach(function(key){
            // check if the cart object has values
            if(Object.values(cart) != 0){
                // console.log(Object.values(cart)[0]);
                var sum = 0;
                for (let i = 0; i < Object.values(cart).length; i++){
                    sum += Object.values(cart)[i];
                };
                // console.log(sum)
                       
                const cart_display = document.getElementById('cart-item');
                cart_display.textContent = sum;

            }

        })
    }
}

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

// render cart count to cart page
function update_cart_from_storage(){
    let cart_uri = [];
    const cart_temp = document.querySelectorAll('#cart-uri');

    cart_temp.forEach(item =>{
        cart_uri.push(item.href);
    })

    const cart_value = [];
    const stored_data = getCartFromStorage();
    for (let [key, value] of Object.entries(stored_data)) {
        cart_value.push(value);
    }

    for (let i = 0; i < cart_uri.length; i++){
        const cart_counter_temp = document.querySelectorAll('.cart-counter');
        cart_counter_temp[i].textContent = cart_value[i];
        // console.log(typeof(cart_value[i]));
        if (Number(cart_value[i]) < 1 || cart_value[i] === undefined){
            // location.reload();
            // console.log(typeof(cart_value[i]));
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
        }
    }
}


// decreament cart item caller
function remove_cart(){
    const remove_cart_item_btn = document.querySelectorAll('#remove-cart-item-btn');
    if(remove_cart_item_btn){
        remove_cart_item_btn.forEach(item => {
            item.addEventListener('click',(e)=>{
                e.preventDefault();
                removeItemfromCart(item.value);
                update_cart_from_storage();
            });
        });
    }
}

displayCart();
send_cart_to_backend();
update_cart_from_storage();
remove_cart();
