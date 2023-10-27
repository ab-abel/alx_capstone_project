// get input element from field

const select = document.getElementById('select-id')
const alert = document.getElementById('alert')



select.addEventListener('change', (e)=>{
    e.preventDefault();
    document.getElementById('alert').innerHTML = '';

    if(select.value == 1){
        display_hint('Hint: American, Asian, British, Chinese, French,...');
    }
    else if(select.value == 2){
        display_hint('Hint: Balanced, Low-Sodium, Low-Fat, Low-Carb,...');
    }
    else if(select.value == 3) {
        display_hint('Hint: Enter 1-3 to search ingredients between that range');
    }
    else if(select.value == 0) {
        alert.style.animation = 'fade-out 2s';
    }
})


// search btn validation
const search_btn = document.getElementById('search-btn');

search_btn.addEventListener('click', (e)=>{
    document.getElementById('alert').innerHTML =''
    e.preventDefault();
    const search = document.getElementById('search').value;
    const select_val = document.getElementById('select-id').value;
    const alert = document.getElementById('alert');

    const alert_p = document.createElement('p');
    // const option_user_selection = select_val.options[select_val.selectedIndex].text;

    //fnction call
    // console.log(typeof(select_val))
    
    let isValid = false;
    if (select_val == 0 ) {
        if (!isNumeric(search)  && isRequired(search) && !isSpecialCharacters(search)){
            isValid = true;
        }else{
            display_error('Search field must be a non Empty String');
            isValid = false;
        }
        
    }
    else if ( select_val == 2){
        if (!isNumeric(search)  && isRequired(search) && !isSpecialCharacters(search)){
            isValid = true;
        }else{
            display_error('Diet field must be a string and  not empty ');
            isValid = false;
        }
    }
    else if (select_val == 1) {
        if(isRequired(search) && !isNumeric(search) && !isSpecialCharacters(search)) {
            isValid = true;
        }else{
            display_error('Cusine Type Field Must be a String Example: America');
            isValid = false;
        }
    } else if (select_val == 3){
        if(isRequired(search) && isNumeric(search) && !isSpecialCharacters(search)) {
            isValid = true;
        }else{
            display_error('Ingredient Field must be an integer or a Range of value seprated by -');
            isValid = false;
        }
    }
    alert.appendChild(alert_p);

    if(isValid){

        var form_data = {
            'search':search,
            'selected_option':select_val
        };
        // send data to backend
        fetch('/search', {
            method:'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(form_data),
            
        })
        .then(response=>{
            
            if(response.redirected){
                // console.log(response.url[0])
                window.location.href = response.url;
            }else{
                response.json();  
            }
         });
 
        }
});

// helper functions
/**
 * 
 * @param {String} msg 
 */
function display_hint(msg){
    const span = document.createElement('span');
    span.setAttribute('class', 'close-alert');
    span.innerHTML = '<i class="fa fa-info"></i>';
    span.setAttribute('onclick',"this.parentElement.style.display='none'");
    alert.style.animation = 'fade-in 1s';
    alert.style.background = 'rgb(57,136,60,0.5)';


    const p = document.createElement('p');
    p.innerHTML = msg;
    p.style.background = 'rgb(143,198,70,0.5)';
    alert.appendChild(span);
    alert.appendChild(p);
    // span.setAttribute('onclick',"this.parentElement.style.display='none'"); 
}

function display_error(msg){
    const span = document.createElement('span');
    span.setAttribute('class', 'close-alert');
    

    span.innerHTML = '<i class="fa fa-times"></i>';
    span.setAttribute('onclick',"this.parentElement.style.display='none'")
    alert.style.animation = 'fade-in 1s';
    const p = document.createElement('p');
    p.style.background = 'rgb(213,0,0,0.5)';
    alert.style.background = 'rgb(160,0,0,0.5)';

    p.innerHTML = msg;
    alert.appendChild(span);
    alert.appendChild(p);
    span.setAttribute('onclick',"this.parentElement.style.display='none'"); 
}


const isRequired = value => value === '' ? false:true;

/**
 * @function isSpecialCharacters
 * @param {String} password 
 * @returns 
 */
const isSpecialCharacters = (search) => {
    const re = new RegExp("^(?=.*[!@#\$%_+?,'`();:\^&\*])");
    return re.test(search);
}

/**
 * @function isNumeric
 * @param {String} password 
 * @returns 
 */
const isNumeric = (password) => {
    const re = new RegExp("^(?=.*[0-9])");
    return re.test(password);
}



