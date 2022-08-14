
//Classes

//Everithing related to the quotation and calculations is Insurance
class Insurance {
    constructor(make, year, level) {
        this.make = make;
        this.year = year;
        this.level = level;
    }


    //calculate the price for the current quotation
    calculateQuotation(insurance) {
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
    getYearDifference(year) {
        return new Date().getFullYear() - year;
    }

    // Adds the value based on the level of protection
    calculateLevel(price, level) {
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
}


//Everithing related to the HTML
class HTMLUI {


    //display the least 20 years in the select
    displayYears() {
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

    displayError(message) {
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
    showResults(price, insurance) {
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
}
