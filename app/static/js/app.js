// get input element from field

const select = document.getElementById('select-id')
const alert = document.getElementById('alert')



select.addEventListener('change', (e)=>{
    e.preventDefault();
    document.getElementById('alert').innerHTML = '';

    if(select.value == '1'){
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

    else if(select.value == '3') {
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


