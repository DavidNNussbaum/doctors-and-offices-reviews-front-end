class Review {
    static all = []

    constructor({doctor_rating, doctor_comments, doctor_office_rating, doctor_office_comments, doctor_id, user_id, id }){
        this.doctor_rating = doctor_rating
        this.doctor_comments = doctor_comments
        this.doctor_office_rating = doctor_office_rating
        this.doctor_office_comments = doctor_office_comments
        this.doctor_id = doctor_id
        this.user_id = user_id
        this.id = id
        Review.all.push(this)
    }
     
    static getAll() {
        return this.all
    }

    static findById(id) {
        return this.all.find(review => review.id === id)
    }

    static findOrCreateBy(reviewObj) {
        return this.findById(reviewObj.id) || new Review(reviewObj)
    }

    renderReviews(rev) {
        return rev
    }

    static displayForm = (e) => {
        e.preventDefault()
        if (!newReviewsForm()) {
            // DoctorApi.fetchDoctorsForSelect()
            list.insertAdjacentHTML('afterend', `
            <form id="new-reviews-form">
                <h3>Add New Reviews:</h3>
                <input type="hidden" id="reviews-doctorId" name="doctorId" value="${e.target.dataset.docId}"/>
                <label for="reviews-doctorRating">Doctor Rating (1-10):</label>
                <input type="number" name="doctorRating" id="reviews-doctorRating"><br><br>
                <label for="reviews-doctorComments">Comments Regarding This Doctor:</label>
                <input type="text" name="doctorComment" id="reviews-doctorComments"><br><br>
                <label for="reviews-doctorOfficeRating">Doctor's Office Rating (1-10):</label>
                <input type="number" name="doctorOfficeRating" id="reviews-doctorOfficeRating"><br><br>
                <label for="reviews-doctorOfficeComments">Comments Regarding This Doctor's Office:</label>
                <input type="text" name="doctorOfficeComments" id="reviews-doctorOfficeComments"><br><br>
                <input type="submit" value="Create">
            </form>
            `)
    
            document.getElementById("new-reviews-form").addEventListener("submit", ReviewApi.handleSubmit)
        } else {
            newReviewsForm().remove()
        }
    }

    renderReviews = (e, doctor) => {
        ReviewApi.fetchReviews(doctor.id, renderReview)
    }

    renderReview = () => {
        if (document.querySelector(`#review-li-${this.id}`)){
            return
        }
        const div = document.getElementById(`doctor-${this.doctor_id}`)
        const li = document.createElement("li")
        li.id = `review-li-${this.id}`
        div.dataset.docId = this.doctor_id
        div.dataset.id = this.id
        li.innerHTML = `
            <br>Doctor Rating (1-10): <strong class="reviews-doctorRating">${this.doctor_rating}</strong><br>
            Doctor Comments: <span class="reviews-doctorComments">${this.doctor_comments}</span><br>
            Doctor's Office Rating (1-10): <span class="reviews-doctorOfficeRating">${this.doctor_office_rating}</span><br>
            Doctor's Office Comments (1-10): <span class="reviews-doctorOfficeComments">${this.doctor_office_comments}</span><br>
        `
        if(localStorage.getItem("user_id") == this.user_id) {
            li.innerHTML += `<button class="edit-review" data-id="${this.id}">Edit</button>
            <button class="delete-review" data-id="${this.id}">Delete</button><br>`
        }
    li.innerHTML += '<hr>'
        div.appendChild(li)
        if(localStorage.getItem("user_id") == this.user_id) {
            document.querySelector(`button.delete-review[data-id='${this.id}']`).addEventListener("click", ReviewApi.handleDelete)
           document.querySelector(`button.edit-review[data-id='${this.id}']`).addEventListener("click", this.handleUpdate)
        }
        
    }
    
    
    handleCreateReview = (renderReviews) => {
        ul().children.length < 1 ? handleClick() : renderReview(review, review.doctor.id)
        reviewForm().reset()
    }

    handleUpdate = (e) => {
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
                document.querySelector(`button.delete-review[data-id='${revId}']`).addEventListener("click", ReviewApi.handleDelete)
                document.querySelector(`button.update-review[data-id='${revId}']`).addEventListener("click", this.handleUpdate)
           
    
    
        } else {
            ReviewApi.handleFetchUpdate(e)
        }
    }
    
    
    replaceElement = (li) => {
         
        li.innerHTML = `
        Doctor Rating (1-10): <strong class="reviews-doctorRating">${this.doctor_rating}</strong><br>
        Doctor Comments: <span class="reviews-doctorComments">${this.doctor_comments}</span><br>
        Doctor's Office Rating (1-10): <span class="reviews-doctorOfficeRating">${this.doctor_office_rating}</span><br>
        Doctor's Office Comments (1-10): <span class="reviews-doctorOfficeComments">${this.doctor_office_comments}</span><br>
            <button class="edit-review" data-id="${this.id}">Edit</button>
            <button class="delete-review" data-id="${this.id}">Delete</button>
        `
           document.querySelector(`button.delete-review[data-id='${this.id}']`).addEventListener("click", ReviewApi.handleDelete)
           document.querySelector(`button.edit-review[data-id='${this.id}']`).addEventListener("click", this.handleUpdate)
        
    }
}