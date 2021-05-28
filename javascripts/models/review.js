class Review {
    static all = []

    constructor({doctor_rating, doctor_comments, doctor_office_rating, doctor_office_comments, doctor_id, user_id }){
        this.doctor_rating = doctor_rating
        this.doctor_comments = doctor_comments
        this.doctor_office_rating = doctor_office_rating
        this.doctor_office_comments = doctor_office_comments
        this.doctor_id = doctor_id
        this.user_id = user_id
        Review.all.push(this)
    }
     
    static getAll() {
        return this.all
    }

    static findByName(doctorName) {
       return this.all.find(function(doctor_id) { this.doctor_id.name === name})
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
}