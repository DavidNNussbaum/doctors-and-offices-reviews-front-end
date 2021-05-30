document.addEventListener("DOMContentLoaded", () => {
    buttonShow().addEventListener("click", DoctorApi.handleClick)
    buttonNew().addEventListener("click", displayForm)
})


const displayForm = () => {
    if (!reviewsForm()) {
        fetchDoctorsForSelect()
        list.insertAdjacentHTML('afterend', `
        <form id="comments-form">
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
        reviewsForm().addEventListener("submit", handleSubmit)
    } else {
        reviewsForm().remove()
    }
}

const renderDoctors = (doctors) => {
    ul().innerHTML += "<h1 id='doctors-header'>Doctors</h1>"
    doctors.forEach(element => renderDoctor(element));
}


const renderDoctor = (doctor) => {
    const h4 = document.createElement("h4")
    const a = document.createElement("a")
    a.id = `doctor-${doctor.id}`
    a.innerText = doctor.name
    a.href = "#"
    a.addEventListener("click", (e) => renderReviews(e, doctor))
    h4.appendChild(a)
    ul().appendChild(h4)
}

const renderReviews = (e, ReviewApi) => {
    const nextLiSibling = e.target.nextSibling
    if (nextLiSibling) {
        const children = Array.from(e.target.parentNode.children)
        const lis = children.slice(1)
        lis.forEach((li) => li.remove())
    } else {
        doctor.comments.forEach(element => renderReview(element, doctor.id));

    }

}
const renderReview = (review, docId) => {
    const a = document.getElementById(`reviews-${docId}`)
    const li = document.createElement("li")
    a.dataset.docId = docId
    li.innerHTML = `
        <strong class="reviews-doctorRating">${review.doctor_rating}</strong>
        <span class="reviews-doctorComments">${review.doctor_comments}</span>
        <span class="reviews-doctorOfficeRating">${review.doctor_office_rating}</span><br>
        <span class="reviews-doctorOfficeComments">${review.doctor_office_comments}</span>
        <button class="edit-review" data-id="${review.id}">Edit</button>
        <button class="delete-review" data-id="${review.id}">Delete</button>
    `

    a.parentNode.appendChild(li)
    document.querySelector(`button.delete-reviews[data-id='${review.id}']`).addEventListener("click", handleDelete)
    document.querySelector(`button.edit-reviews[data-id='${review.id}']`).addEventListener("click", handleUpdate)

}


const handleCreateReview = (renderReviews) => {
    ul().children.length < 1 ? handleClick() : renderReview(review, review.doctor.id)
    reviewForm().reset()
}



const handleUpdate = (e) => {
    if (e.target.innerText === "Edit") {
        // replace current li with a new one containing inputs and map values
        // Button will now say Update not Edit
        const revId = e.target.dataset.id
        const doctorRating = e.target.parentElement.querySelector(".doctor-rating").innerText
        const doctorComments = e.target.parentElement.querySelector(".doctor-comments").innerText
        const doctorOfficeRating = e.target.parentElement.querySelector(".doctorOffice-rating").innerText
        const doctorOfficeComments = e.target.parentElement.querySelector(".doctorOffice-comments").innerText
         
        e.target.parentElement.innerHTML = `
            <label for="reviews-doctorRating">Doctor Rating (1-10):</label>
            <input type="number" name="doctorRating" id="reviews-doctorRating" value="${doctorRating}"><br>
            <label for="reviews-doctorComments">Comments Regarding This Doctor:</label>
            <input type="text" name="doctorComments" id="reviews-doctorComments" value="${doctorComments}"><br>
            <label for="reviews-doctorOfficeRating">Doctor's Office Rating (1-10):</label>
            <input type="number" name="doctorOfficeRating" id="reviews-doctorOfficeRating" value="${doctorOfficeRating}"><br>
            <label for="reviews-doctorOfficeComments">Comments Regarding This Doctor's Office:</label>
            <input type="text" name="doctorComment" id="reviews-doctorComments" value="${doctorOfficeComments}"><br>
            <button class="update-comment" data-id="${revId}">Update</button>
            <button class="delete-comment" data-id="${revId}">Delete</button>

             
        `
        document.querySelector(`button.delete-review[data-id='${revId}']`).addEventListener("click", handleDelete)
        document.querySelector(`button.update-review[data-id='${revId}']`).addEventListener("click", handleUpdate)


    } else {
        handleFetchUpdate(e)
    }
}


const replaceElement = (review, li) => {
    li.innerHTML = `
        <strong class="reviews-doctorRating">${review.doctorRating}</strong>
        <span class="reviews-doctorComments">${review.doctorComment}</span>
        <span class="reviews-doctorOfficeRating">${review.doctorOfficeRating}</span>
        <span class="reviews-doctorOfficeComments">${review.doctorOfficeComment}</span>
        <button class="edit-review" data-id="${review.id}">Edit</button>
        <button class="delete-review" data-id="${review.id}">Delete</button>
    `
    document.querySelector(`button.delete-review[data-id='${review.id}']`).addEventListener("click", handleDelete)
    document.querySelector(`button.edit-review[data-id='${review.id}']`).addEventListener("click", handleUpdate)

}

const handleError = (error) => {
    console.log(error)

}
        
         
         