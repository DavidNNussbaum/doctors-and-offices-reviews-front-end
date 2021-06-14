class DoctorApi {
    static fetchDoctors(e) {
        if (e) {
            e.preventDefault()
        }
        
        fetch('http://localhost:3000/doctors')
        .then(resp => resp.json())
        .then(json => json.data.map(docObj => {
            return Doctor.findOrCreateBy(docObj.attributes)
        }))
        .then(doctors => Doctor.renderDoctorsInDropdown(doctors))
        .catch(handleError)
    }

    static handleSubmit = (e) => {
        e.preventDefault()
        const data = {
            doctor: {
                first_name: e.target.parentElement.querySelector("#doctor-firstName").value,
                last_name: e.target.parentElement.querySelector("#doctor-lastName").value,
                address: e.target.parentElement.querySelector("#doctor-address").value,
                 
            }
        } 
         
        fetch('http://localhost:3000/doctors', {
            method: 'POST',
            headers: {
                "Content-Type": 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(resp => resp.json())
        .then(json => {
            document.querySelector("#doctor-form").remove()
            this.fetchDoctors()
        })
        .catch(handleError)
         
    }
    
    // static fetchDoctorsForSelect = () => {
    //     fetch('http://localhost:3000/doctors')
    //             .then(resp => resp.json())
    //             .then(json => json.data.map((docObj) => {
    //                     return `<option value="${docObj.id}">${docObj.attribute.name}</option>`
    //                 })
    //             )
    //             .then(collection => document.querySelector("select#Doctor_id").innerHTML = collection.join(""))
    // }

    static handleError(error) {
        console.log(error)
    }
}
 
   