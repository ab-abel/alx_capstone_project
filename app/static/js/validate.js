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
            alert_p.innerHTML = 'Search field must be a non Empty String';
            alert_p.style.color = 'red';
            alert_p.style.padding = '.5rem';
            isValid = false;
        }
        
    }
    else if ( select_val == 2){
        if (!isNumeric(search)  && isRequired(search) && !isSpecialCharacters(search)){
            isValid = true;
        }else{
            alert_p.innerHTML = 'Diet field must be a string and  not empty ';
            alert_p.style.color = 'red';
            alert_p.style.padding = '.5rem';
            isValid = false;
        }
    }
    else if (select_val == 1) {
        if(isRequired(search) && !isNumeric(search) && !isSpecialCharacters(search)) {
            isValid = true;
        }else{
            alert_p.innerHTML = 'Cusine Type Field Must be a String Example: America';
            alert_p.style.color = 'red';
            alert_p.style.padding = '.5rem';
            isValid = false;
        }
    } else if (select_val == 3){
        if(isRequired(search) && isNumeric(search) && !isSpecialCharacters(search)) {
            isValid = true;
        }else{
            alert_p.innerHTML = 'Ingredient Field must be an integer or a Range of value seprated by -';
            alert_p.style.color = 'red';
            alert_p.style.padding = '.5rem';
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



