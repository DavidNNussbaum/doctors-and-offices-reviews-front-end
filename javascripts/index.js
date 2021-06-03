document.addEventListener("DOMContentLoaded", () => {
    buttonSignLog().addEventListener("click", UserApi.handleClick)
    buttonShowDoctors().addEventListener("click", DoctorApi.handleClick )
    // buttonShowReviews().addEventListener("click", displayForm)
})


const renderUser = (user) => {
    ul().innerHTML += "<h1 id='user-header'></h1>"
}

const displayUser = () => {
    if (!userForm()) {
        UserApi.fetchUserForSelect()
        list.insertAdjacentHTML('afterend', `
        <form id="user-form">
            <strong class="user-name">${UserApi.useObj.attributes.name}</strong>
        </form>
        `)
        document.getElementById("doctors-form").addEventListener("submit", DoctorApi.handleSubmit)
    } else {
        usersForm().remove()
    }
}

const addUserForm = () => {
    if (!userForm()) {
        UserApi.fetchUser()
        list.insertAdjacentHTML('afterend', `
        <form id="user-form">
            <label for="user-firstName">Your First Name:</label>
            <input type="string" name="userFirstName" id="user-firstName"><br><br>
            <label for="user-email">Your email:</label>
            <input type="string" name="userEmail" id="user-email"><br><br>
            <label for="user-password">Your Password:</label>
            <input type="string" name="userPassword" id="user-password"><br><br>
            <label for="user-confirmPassword">Confirm Your Password:</label>
            <input type="string" name="userConfirmPassword" id="user-confirmPassword"><br><br>
            <select id="user_id">
            </select>
            <input type="submit" value="Submit">
        </form>
        `)
        document.getElementById("doctors-form").addEventListener("submit", DoctorApi.handleSubmit)
    } else {
        userForm().remove()
    }
}


const displayForm = () => {
    if (!reviewsForm()) {
        DoctorApi.fetchDoctorsForSelect()
        list.insertAdjacentHTML('afterend', `
        <form id="reviews-form">
            <strong class="users-name">Reviews By ${current_user.first_name}</strong
            <strong class="doctors-name">${DoctorApi.docObj.attributes.name}</strong>
            <h3>Add New Reviews:</h3>
            <label for="reviews-doctorRating">Doctor Rating (1-10):</label>
            <input type="number" name="doctorRating" id="reviews-doctorRating"><br><br>
            <label for="reviews-doctorComments">Comments Regarding This Doctor:</label>
            <input type="text" name="doctorComment" id="reviews-doctorComments"><br><br>
            <label for="reviews-doctorOfficeRating">Doctor's Office Rating (1-10):</label>
            <input type="number" name="doctorOfficeRating" id="reviews-doctorOfficeRating"><br><br>
            <label for="reviews-doctorOfficeComments">Comments Regarding This Doctor's Office:</label>
            <input type="text" name="doctorOfficeComments" id="reviews-doctorOfficeComments"><br><br>
            <select id="comment_id">
            </select>
            <input type="submit" value="Create">
        </form>
        `)
        document.getElementById("reviews-form").addEventListener("submit", ReviewApi.handleSubmit)
        // reviewsForm().addEventListener("submit", handleSubmit)
    } else {
        reviewsForm().remove()
    }
}

const renderDoctors = (doctors) => {
    ul().innerHTML += "<h1 id='doctors-header'>Doctors</h1>"
    doctors.data.forEach(element => renderDoctor(element));
}


const renderDoctor = (doctor) => {
    const h4 = document.createElement("h4")
    const a = document.createElement("a")
    a.id = `doctor-${doctor.id}`
    a.innerText = doctor.attributes.name
    a.href = "#"
    a.addEventListener("click", (e) => renderReviews(e, doctor))
    h4.appendChild(a)
    ul().appendChild(h4)
    // ul().insertAfter(buttonShowReviews().addEventListener("click", displayForm), appendChild(h4))
}

const renderReviews = (e, doctor) => {
    ReviewApi.fetchReviews(doctor.id, renderReview)
    // const nextLiSibling = e.target.nextSibling
    // if (nextLiSibling) {
    //     const children = Array.from(e.target.parentNode.children)
    //     const lis = children.slice(1)
    //     lis.forEach((li) => li.remove())
    // } else {
    //     fetRev.forEach(element => renderReview(element, doctor.id));
    // }

}
const renderReview = (review, docId) => {
    const a = document.getElementById(`doctor-${docId}`)
    const li = document.createElement("li")
    a.dataset.docId = docId
    a.dataset.id = review.id

    li.innerHTML = `
        Doctor Rating (1-10): <strong class="reviews-doctorRating">${review.doctor_rating}</strong><br>
        Doctor Comments: <span class="reviews-doctorComments">${review.doctor_comments}</span><br>
        Doctor's Office Rating (1-10): <span class="reviews-doctorOfficeRating">${review.doctor_office_rating}</span><br>
        Doctor's Office Comments (1-10): <span class="reviews-doctorOfficeComments">${review.doctor_office_comments}</span><br>
        <button class="edit-review" data-id="${review.id}">Edit</button>
        <button class="delete-review" data-id="${review.id}">Delete</button><br>
    `

    a.parentNode.appendChild(li)
    // if (User.logged_in) {
         
       document.querySelector(`button.delete-review[data-id='${review.id}']`).addEventListener("click", ReviewApi.handleDelete)
       document.querySelector(`button.edit-review[data-id='${review.id}']`).addEventListener("click", handleUpdate)
    // }

}


const handleCreateReview = (renderReviews) => {
    ul().children.length < 1 ? handleClick() : renderReview(review, review.doctor.id)
    reviewForm().reset()
}



const handleUpdate = (e) => {
    if (e.target.innerText === "Edit") {
        const revId = e.target.dataset.id
        const doctorRating = e.target.parentElement.querySelector(".reviews-doctorRating").innerText
        const doctorComments = e.target.parentElement.querySelector(".reviews-doctorComments").innerText
        const doctorOfficeRating = e.target.parentElement.querySelector(".reviews-doctorOfficeRating").innerText
        const doctorOfficeComments = e.target.parentElement.querySelector(".reviews-doctorOfficeComments").innerText
         
        e.target.parentElement.innerHTML = `
            <label for="reviews-doctorRating">Doctor Rating (1-10):</label>
            <input type="number" name="doctorRating" id="reviews-doctorRating" value="${doctorRating}"><br>
            <label for="reviews-doctorComments">Comments Regarding This Doctor:</label>
            <input type="text" name="doctorComments" id="reviews-doctorComments" value="${doctorComments}"><br>
            <label for="reviews-doctorOfficeRating">Doctor's Office Rating (1-10):</label>
            <input type="number" name="doctorOfficeRating" id="reviews-doctorOfficeRating" value="${doctorOfficeRating}"><br>
            <label for="reviews-doctorOfficeComments">Comments Regarding This Doctor's Office:</label>
            <input type="text" name="doctorOfficeComment" id="reviews-doctorOfficeComments" value="${doctorOfficeComments}"><br>
            <button class="update-review" data-id="${revId}">Update</button>
            <button class="delete-review" data-id="${revId}">Delete</button>
       `
          
        // if (User.logged_in) {
            document.querySelector(`button.delete-review[data-id='${revId}']`).addEventListener("click", ReviewApi.handleDelete)
            document.querySelector(`button.update-review[data-id='${revId}']`).addEventListener("click", handleUpdate)
        // }


    } else {
        ReviewApi.handleFetchUpdate(e)
    }
}


const replaceElement = (review, li) => {
     
    li.innerHTML = `
        
        <strong class="reviews-doctorRating">${review.doctor_rating}</strong>
        <span class="reviews-doctorComments">${review.doctor_comments}</span>
        <span class="reviews-doctorOfficeRating">${review.doctor_office_rating}</span>
        <span class="reviews-doctorOfficeComments">${review.doctor_office_comments}</span>
        <button class="edit-review" data-id="${review.id}">Edit</button>
        <button class="delete-review" data-id="${review.id}">Delete</button>
    `
    // if (User.logged_in) {
       document.querySelector(`button.delete-review[data-id='${review.id}']`).addEventListener("click", ReviewApi.handleDelete)
       document.querySelector(`button.edit-review[data-id='${review.id}']`).addEventListener("click", handleUpdate)
    // }
}

const handleError = (error) => {
    console.log(error)

}
        
         
         