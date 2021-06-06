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

    static findByName(doctorName) {
       return this.all.find(function(doctor) { doctor.name === doctorName})
    }

    static findById(id) {
        return this.all.find(review => review.id === id)
    }

    static findOrCreateBy(reviewObj) {
        return this.findByName(reviewObj.name) || new Review(reviewObj)
    }

    static render() {
        ul().innerHTML += "<h1 id='reviewss-header'>Reviews</h1>"
        this.all.forEach(rev => this.renderCategory(rev))
    }

    static renderReview(review) {
        const h4 = document.createElement("h4")
        const a = document.createElement("a")
        a.id = `review-${review.id}`
        a.innerText = review.name
        a.href = "#"
        a.addEventListener("click", (e) => renderReviews(e, review))
        h4.appendChild(a)
        ul().appendChild(h4)
    }

    renderReviews(rev) {
        return rev
    }

    displayForm = () => {
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
            // Doctor.dropDownOptions.forEach(optionTag => reviewSelectDoctor().append(optionTag))
            document.getElementById("reviews-form").addEventListener("submit", ReviewApi.handleSubmit)
            // reviewsForm().addEventListener("submit", handleSubmit)
        } else {
            reviewsForm().remove()
        }
    }

    renderReviews = (e, doctor) => {
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
    renderReview = (review, docId) => {
        console.log('hi')
        if (document.querySelector(`#review-li-${review.id}`)){
            return
        }
        const a = document.getElementById(`doctor-${docId}`)
        const li = document.createElement("li")
        li.id = `review-li-${review.id}`
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
              
            // if (User.logged_in) {
                document.querySelector(`button.delete-review[data-id='${revId}']`).addEventListener("click", ReviewApi.handleDelete)
                document.querySelector(`button.update-review[data-id='${revId}']`).addEventListener("click", handleUpdate)
            // }
    
    
        } else {
            ReviewApi.handleFetchUpdate(e)
        }
    }
    
    
    replaceElement = (review, li) => {
         
        li.innerHTML = `
            
        Doctor Rating (1-10): <strong class="reviews-doctorRating">${review.doctor_rating}</strong>
        Doctor Comments: <span class="reviews-doctorComments">${review.doctor_comments}</span>
        Doctor's Office Rating (1-10): <span class="reviews-doctorOfficeRating">${review.doctor_office_rating}</span>
        Doctor's Office Comments (1-10): <span class="reviews-doctorOfficeComments">${review.doctor_office_comments}</span>
            <button class="edit-review" data-id="${review.id}">Edit</button>
            <button class="delete-review" data-id="${review.id}">Delete</button>
        `
        // if (User.logged_in) {
           document.querySelector(`button.delete-review[data-id='${review.id}']`).addEventListener("click", ReviewApi.handleDelete)
           document.querySelector(`button.edit-review[data-id='${review.id}']`).addEventListener("click", handleUpdate)
        // }
    }
}