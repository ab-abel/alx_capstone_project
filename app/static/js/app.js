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
        p.innerHTML = 'Hint: Enter 100-300 to search Calories between that range';
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
        p.innerHTML = 'Hint: Enter 1-3 to search ingredient between that range';
        alert.appendChild(span);
        alert.appendChild(p);
    }
})

// cart

const cart = document.getElementById('cart-btn');

cart.addEventListener('click', (e)=> {
    // e.preventDefault();

    // add 
    // console.log(cart.value);
    addItemToCart(cart.value);
    // saveScore(cart.value)

})

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

