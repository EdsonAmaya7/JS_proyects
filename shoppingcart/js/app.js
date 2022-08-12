//variable
const courses = document.querySelector("#courses-list"),
      shoppingCartContent = document.querySelector("#cart-content tbody"),
      clearCartBtn = document.querySelector('#clear-cart');

//listeners
loadEventListeners();

function loadEventListeners() {
    //when  a new course is added
    courses.addEventListener("click", buyCourse);

    //when the remove button is clicked
    shoppingCartContent.addEventListener('click', removeCourse);

    //clear cart btn
    clearCartBtn.addEventListener('click', clearCart)

    document.addEventListener('DOMContentLoaded', getFromLocalStorage);
}

//functions
function buyCourse(evt) {
    evt.preventDefault();
    //use delegation to find the course that was added
    if (evt.target.classList.contains("add-to-cart")) {
        //read the course values
        const course = evt.target.parentElement.parentElement;
        //read the values
        getCourseInfo(course);
    }
}

function getCourseInfo(course) {
    //create an object with the course data
    const courseInfo = {
        image: course.querySelector("img").src,
        title: course.querySelector("h4").textContent,
        price: course.querySelector(".price span").textContent,
        id: course.querySelector("a").getAttribute("data-id"),
    };
    addIntoCart(courseInfo);
}

function addIntoCart(course) {
    let { image, title, price, id } = course;
    //create a <tr>
    const row = document.createElement("tr");

    row.innerHTML = `
            <td>
                <img src="${image}" width="100px">
            </td>
            <td>${title}</td>
            <td>${price}</td>
            <td>
            <a href="#" class="remove" data-id="${id}">x</a>
            </td>
    `;
    //add into the shopping cart
    shoppingCartContent.appendChild(row);

    //add course into storage
    saveIntoStorage(course)
}

//add the curse into the local storage
function saveIntoStorage(course) {
    let courses = getCoursesFromStorage();

    //add the course into the array
    courses.push(course)

    //since storage only saves strings, we need to convert JSON into string
    localStorage.setItem('courses', JSON.stringify(courses));
}

//get the contents from storage
function getCoursesFromStorage() {
    let courses;
    //if something exist on storage then we get the value, otherwise
    //create an empty array

    if (localStorage.getItem('courses') === null) {
        courses = [];
    } else {
        courses = JSON.parse(localStorage.getItem('courses'))
    }
    return courses;
}

//remove course from the dom
function removeCourse(evt) {
    let course, courseId;
    if (evt.target.classList.contains('remove')) {
        evt.target.parentElement.parentElement.remove();
        course = evt.target.parentElement.parentElement;
        courseId = course.querySelector('a').getAttribute('data-id');
    }

    //remove from the local storage
    removeCourseLocalStorage(courseId);
}

function removeCourseLocalStorage(id){
    //get the local storage data
    let coursesLS = getCoursesFromStorage();

    //loop trought the arary and find the index to remove
    coursesLS.forEach(function(courseLS,index){
        if(courseLS.id === id){
            coursesLS.splice(index,1);
        }
    });

    //ad the rest of the arrat
    localStorage.setItem('courses', JSON.stringify(coursesLS));
}

//clear the shopping cart
function clearCart() {
    // shoppingCartContent.innerHTML = ''
    while (shoppingCartContent.firstChild) {
        shoppingCartContent.removeChild(shoppingCartContent.firstChild);
    }
    //clear from local storage
    clearLocalStorage();
}

//clears the whole local storage
function clearLocalStorage(){
    localStorage.clear()
}
//loads when the document is ready and print courses into shopping cart
function getFromLocalStorage() {
    let coursesLS = getCoursesFromStorage();

    //loop throught the courses and print into the cart
    coursesLS.forEach(function (course) {
        let { image, title, price, id } = course;
        //create the <tr>
        const row = document.createElement('tr');
        //print the content
        row.innerHTML = `
        <td>
            <img src="${image}" width="100px">
        </td>
        <td>${title}</td>
        <td>${price}</td>
        <td>
        <a href="#" class="remove" data-id="${id}">x</a>
        </td>
        `;
        shoppingCartContent.append(row)
    });
}