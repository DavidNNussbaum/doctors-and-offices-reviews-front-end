class DoctorApi {
    static fetchDoctors() {
        fetch('http://localhost:3000/doctors')
        .then(resp => resp.json())
        .then(json => json.forEach(docObj => Doctor.findOrCreateBy(docObj)))
        .catch(handleError)
    }

    static handleClick = (e) => {
        if (ul().children.length < 1) {
            fetch('http://localhost:3000/doctorss')
            .then(resp => resp.json())
            .then(json => renderDoctors(json))
            .catch(handleError)
        } else {
            ul().innerHTML = ""
        }
    }
    
    static fetchDoctorsForSelect = () => {
        fetch('http://localhost:3000/doctors')
                .then(resp => resp.json())
                .then(json => json.map((docObj) => `<option value="${docObj.id}">${docObj.name}</option>`))
                .then(collection => document.querySelector("select#Doctor_id").innerHTML = collection.join(" "))
    }

    static handleError(error) {
        console.log(error)
    }
}
 
   