//variables
const sendBtn = document.querySelector('#sendBtn')
      email = document.querySelector('#email')
      subject = document.querySelector('#subject')
      message = document.querySelector('#message'),
      resetBtn = document.querySelector('#resetBtn'),
      sendEmailForm = document.querySelector('#email-form');

//event listeners
eventListeners();


function eventListeners() {

    document.addEventListener('DOMContentLoaded', appInit);

    //validate the forms
    email.addEventListener('blur', validateField)
    subject.addEventListener('blur', validateField)
    message.addEventListener('blur', validateField)

    //send email and reset button
    sendEmailForm.addEventListener('submit', sendEmail);
    resetBtn.addEventListener('click', resetForm)

}


//functions
function appInit() {
    //disable the send button on load
    sendBtn.disabled = true;
}

function sendEmail(evt){
    evt.preventDefault();

    //show the spinner
    const spinner = document.querySelector('#spinner');
    spinner.style.display = 'block';

    const sendEmailImg = document.createElement('img');
    sendEmailImg.src = 'img/mail.gif';
    sendEmailImg.style.display = 'block'

    //hide spinner then show the send gif
    setTimeout(() => {
        //hide the spiinner
        spinner.style.display = 'none';
        document.querySelector('#loaders').appendChild(sendEmailImg)

        setTimeout(() => {
            resetForm();
            sendEmailImg.style.display = 'none'
        }, 5000);
    }, 3000);
}

function validateField() {
    let errors;

    //validate the length of the field
    validateLength(this);

    //validate the email
    if (this.type === 'email') {
        validateEmail(this);
    }
    //both will the inputs are not empty
    errors = document.querySelectorAll('.error');
    if (email.value !== '' && subject.value !== '' && message.value !== '') {
        if (errors.length === 0) {
            sendBtn.disabled = false;
        }
    }
}

//validate the length of the fields
function validateLength(field) {
    if (field.value.length > 0) {
        field.style.borderBottomColor = 'green';
        field.classList.remove('error')
    } else {
        field.style.borderBottomColor = 'red';
        field.classList.add('error')

    }
}

//validate email checks for @ in the value
function validateEmail(field) {
    let emailtext = field.value;

    if (emailtext.indexOf('@') !== -1) {
        field.style.borderBottomColor = 'green';
        field.classList.remove('error');
    } else {
        field.style.borderBottomColor = 'red';
        field.classList.add('error')
    }
}

//reset the form
function resetForm(){
    email.style.borderBottomColor = '';
    email.classList.remove('error');
    subject.style.borderBottomColor = '';
    subject.classList.remove('error');
    message.style.borderBottomColor = '';
    message.classList.remove('error');
    sendEmailForm.reset();

}