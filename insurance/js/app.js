//variables
const form = document.querySelector('#request-quote')

//event listeners
eventListeners()

function eventListeners() {
    document.addEventListener('DOMContentLoaded', () => {
        //create the <option> for the years
        const html = new HTMLUI();
        html.displayYears()
    })

    //when the form is submitted
    form.addEventListener('submit', function (e) {
        e.preventDefault();

        //read the values from the form
        const make = document.querySelector('#make').value;
        const year = document.querySelector('#year').value;
        //read the radio buttons
        const level = document.querySelector('input[name="level"]:checked').value;

        //check that all the fields have something
        if ([make, year, level].includes('')) {
            console.log('there is an error');
        } else {
            console.log('without errors');

        }
    })
}


//objects
function HTMLUI() { }

//display the least 20 years in the select
HTMLUI.prototype.displayYears = function () {
    //max & mminimum years
    const maxYear = new Date().getFullYear(),
        minYear = maxYear - 20;

    //Generete the list with the least 20 years
    const selectYears = document.querySelector('#year')

    //print the values
    for (let i = maxYear; i >= minYear; i--) {
        const option = document.createElement('option');
        option.value = i;
        option.textContent = i;
        selectYears.appendChild(option);
    }
}
