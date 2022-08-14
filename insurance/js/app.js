//variables
const form = document.querySelector('#request-quote')
const html = new HTMLUI();
//event listeners
eventListeners()

function eventListeners() {
    document.addEventListener('DOMContentLoaded', () => {
        //create the <option> for the years
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
            html.displayError('All the fields are mandatory');
        } else {
            //Clear the previous quotes

            const prevResult = document.querySelector('#result div');
            if (prevResult != null) {
                prevResult.remove()
            }

            //make the quotation
            const insurance = new Insurance(make, year, level);
            const price = insurance.calculateQuotation(insurance);

            //Print the result from HTMLUI;
            html.showResults(price, insurance);
        }
    })
}


//objects

//Everithing related to the quotation and calculations is Insurance
function Insurance(make, year, level) {
    this.make = make;
    this.year = year;
    this.level = level;
}

//calculate the price for the current quotation
Insurance.prototype.calculateQuotation = function (insurance) {
    let price;
    const base = 2000;

    //get the make
    const make = insurance.make;

    /*
    1 = American 15%
    2 = Asion 05%
    3 = European 35%
    */

    switch (make) {
        case '1':
            price = base * 1.15;
            break;
        case '2':
            price = base * 1.15;
            break;
        case '3':
            price = base * 1.35;
            break;
    }

    //get the year
    const year = insurance.year;

    //get the years difference
    const difference = this.getYearDifference(year);

    //Each year the cost of the insurance is going to be 3% cheaper
    price = price - ((difference * 3) * price) / 100;

    // Check the level of protection
    const level = insurance.level;

    price = this.calculateLevel(price, level);

    return price;
}

//Returns the difference between year
Insurance.prototype.getYearDifference = function (year) {
    return new Date().getFullYear() - year;
}

// Adds the value based on the level of protection
Insurance.prototype.calculateLevel = function (price, level) {
    /*
    Basic insurance is going to increase the value by 30%
    Complete Insurance is going to increaste the value by 50%
    */
    if (level === 'basic') {
        price = price * 1.30;
    } else {
        price = price * 1.50;
    }
    return price;
}

//Everithing related to the HTML
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

HTMLUI.prototype.displayError = function (message) {
    //create a div
    const div = document.createElement('div');
    div.classList = 'error';

    //insert the message
    div.innerHTML = `
        <p>${message}</p>
    `;

    form.insertBefore(div, document.querySelector('.form-group'));

    //remove the error
    setTimeout(() => {
        document.querySelector('.error').remove()
    }, 3000);
}

//Prints the result into the HTML
HTMLUI.prototype.showResults = function (price, insurance) {
    //Print the result
    const result = document.querySelector('#result');

    //create a div with the result
    const div = document.createElement('div')

    //Get Make from the object and assign a readable name
    let make = insurance.make;

    switch (make) {
        case '1':
            make = 'American';
            break;
        case '2':
            make = 'Asian';
            break;
        case '3':
            make = 'American'
            break;

    }

    //Insert the result
    div.innerHTML = `
    <p class="header">Summary</p>
    <p>Make; ${make}</p>
    <p>Year: ${insurance.year}</p>
    <p>Level: ${insurance.level}</p>
        <p class="total">Total: $ ${price}</p>
    `;

    const spinner = document.querySelector('#loading img');
    spinner.style.display = 'block';

    setTimeout(() => {
        spinner.style.display = 'none';
        //Insert this into the HTML
        result.appendChild(div);
    }, 3000);

}