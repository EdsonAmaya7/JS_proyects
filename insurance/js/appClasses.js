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

