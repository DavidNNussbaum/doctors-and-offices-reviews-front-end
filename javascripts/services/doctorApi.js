class DoctorApi {
    static fetchDoctors() {
        fetch('http://localhost:3000/doctors')
        .then(resp => resp.json())
        .then(json => json.forEach(docObj => Doctor.findOrCreateBy(docObj)))
        .catch(handleError)
    }

    static handleError(error) {
        console.log(error)
    }
}
 