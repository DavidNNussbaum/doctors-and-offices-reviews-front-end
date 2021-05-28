class ReviewApi {
    static fetchReviewss() {
        fetch('http://localhost:3000/reviews')
        .then(resp => resp.json())
        .then(json => json.forEach(revObj => Review.findOrCreateBy(revObj)))
        .catch(handleError)
    }

    static handleError(error) {
        console.log(error)
    }
}
 