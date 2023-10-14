const search_btn = document.getElementById('search-btn');
const search = document.getElementById('search').value

const select_val = document.getElementById('select-id')
var option_user_selection = select_val.options[ select_val.selectedIndex ].value

search_btn.addEventListener('click', (e)=>{
    e.preventDefault();
    //fnction call
    console.log(option_user_selection)
    let isValid = false;
    if (select_val == '0' || select_val == '2') {
        if (!isRequired(search) || !isNumeric(search)){
            isValid = true;
        }
        // console.log(select_val)
    }
    else if (select_val === '1' || select_val === '3') {
        if(!isRequired(search) && isNumeric(search) && !isSpecialCharacters(search)) {
            isValid = true;
        }

    }
    else {
        isValid = false;
    }

    console.log(isValid);
 });


// helper functions
const isRequired = value => value === '' ? false:true;

/**
 * @function isSpecialCharacters
 * @param {String} password 
 * @returns 
 */
const isSpecialCharacters = (search) => {
    const re = new RegExp("^(?=.*[!@#\$%_\^&\*])");
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