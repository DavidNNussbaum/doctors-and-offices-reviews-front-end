class ReviewApi {
    static fetchReviews() {
        fetch('http://localhost:3000/reviews')
        .then(resp => resp.json())
        .then(json => json.forEach(revObj => Review.findOrCreateBy(revObj)))
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
            alert(json.message)
        })
    }
    
    static handleFetchUpdate = (e) => {
        const data = {
            id: e.target.dataset.id,
            doctorRating: e.target.parentElement.querySelector("#comments-doctorRating").value,
            doctorComments: e.target.parentElement.querySelector("#comments-doctorComments").value,
            doctorOfficeRating: e.target.parentElement.querySelector("#comments-doctorOfficeRating").value,
            doctorOfficeComments: e.target.parentElement.querySelector("#comments-doctorOfficeComments").value
             
        }
    
        fetch(`http://localhost:3000/reviews/${data.id}`, {
            method: 'PATCH',
            headers: {
                "Content-Type": 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(resp => resp.json())
        .then(json => replaceElement(json, e.target.parentElement))
        .catch(err => alert(err))
    }
    
    static handleError(error) {
        console.log(error)
    }
}
 