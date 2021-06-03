class ReviewApi {
    static fetchReviews(doctor_id, renderReview ) {
        fetch(`http://localhost:3000/doctors/${doctor_id}/reviews`)
        .then(resp => resp.json())
        .then(json => json.forEach(revObj => { 
            let review = Review.findOrCreateBy(revObj)
            renderReview(review, doctor_id)
        }))
        .catch(handleError)
    }

    static handleSubmit = (e) => {
        e.preventDefault()
        const data = {
            doctorRating: doctorRating().value,
            doctorComments: doctorComments().value,
            doctorOfficeRatong: doctorOfficeRating().value,
            doctorOfficeComments: doctorOfficeComments().value,
            comment_id: commentSelectDoctor().value
        }
    
        fetch("http://localhost:3000/reviews", {
            method: 'POST',
            headers: {
                "Content-Type": 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(resp => resp.json())
        .then(json => handleCreateComment(json))
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
        .then(json => replaceElement(json, e.target.parentElement))
        // .catch(err => alert(err))
    }
    
    static handleError(error) {
        console.log(error)
    }
}
 