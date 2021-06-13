class ReviewApi {
    static fetchReviews(doctor_id, renderReview ) {
        fetch(`http://localhost:3000/doctors/${doctor_id}/reviews`)
        .then(resp => resp.json())
        .then(json => json.data.forEach(revObj => { 
            let review = Review.findOrCreateBy(revObj.attributes)
            review.renderReview(doctor_id)
        }))
        .then(_ => {
          const container = document.getElementById(`doctor-${doctor_id}`)
          const count = container.childElementCount
          if (count === 0) {
               const paragraph = document.createElement("p")
               paragraph.innerText = "There are currently no reviews for this doctor."
               container.appendChild(paragraph)
          }
        })
        .catch(handleError)
    }

    static handleSubmit = (e) => {
        e.preventDefault()
        const data = {
            review: {
                user_id: localStorage.getItem("user_id"),
                doctor_id: e.target.parentElement.querySelector("#reviews-doctorId").value,
                doctor_rating: e.target.parentElement.querySelector("#reviews-doctorRating").value,
                doctor_comments: e.target.parentElement.querySelector("#reviews-doctorComments").value,
                doctor_office_rating: e.target.parentElement.querySelector("#reviews-doctorOfficeRating").value,
                doctor_office_comments: e.target.parentElement.querySelector("#reviews-doctorOfficeComments").value
            }
        }
         
    
        fetch("http://localhost:3000/reviews", {
            method: 'POST',
            headers: {
                "Content-Type": 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(resp => resp.json())
        .then(json => {
            document.querySelector("#new-reviews-form").remove()
            const review = Review.findOrCreateBy(json)
            review.renderReview()
            
        })
    }

    static handleDelete = (e) => {
        fetch(`http://localhost:3000/reviews/${e.target.dataset.id}`, {
            method: 'DELETE',
            headers: {
                "Content-Type": 'application/json'
            }
        })
        .then(resp => resp.json())
        .then(json => {
            e.target.parentNode.remove()
            
        })
    }
    
    static handleFetchUpdate = (e) => {
        e.preventDefault()
        const data = {
            review: {
                doctor_rating: e.target.parentElement.querySelector("#reviews-doctorRating").value,
                doctor_comments: e.target.parentElement.querySelector("#reviews-doctorComments").value,
                doctor_office_rating: e.target.parentElement.querySelector("#reviews-doctorOfficeRating").value,
                doctor_office_comments: e.target.parentElement.querySelector("#reviews-doctorOfficeComments").value
            }
        }
         


        fetch(`http://localhost:3000/reviews/${e.target.dataset.id}`, {
            method: 'PATCH',
            headers: {
                "Content-Type": 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(resp => resp.json())
        .then(json => {
           const review = Review.findOrCreateBy(json)
            review.replaceElement(e.target.parentElement)})
        // .catch(err => alert(err))
    }
    
    static handleError(error) {
        console.log(error)
    }
}
 