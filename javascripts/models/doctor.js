class Doctor {
    static all = []

    constructor({name, first_name, last_name, address, id}){
        this.first_name = first_name
        this.last_name = last_name
        this.address = address
        this.name = name
        this.id = id
        Doctor.all.push(this)
    }

    static getAll() {

        return this.all
    }

    static findById(id) {
        return this.all.find(doctor => doctor.id === id)
    }

    static findOrCreateBy(doctorObj) {
        return this.findById(doctorObj.id) || new Doctor(doctorObj)
    }

    render() {
        ul().innerHTML += "<h1 id='doctors-header'>Doctors</h1>"
        this.all.forEach(doc => this.renderDoctor(doc))
    }

    static renderDoctorsInDropdown = (doctors) => {
        let select, refresh
        if (document.querySelector("#doctor-dropdown")) {
            refresh = true
            select = document.querySelector("#doctor-dropdown")
            select.innerHTML = ""
        } else {
            refresh = false
            select = document.createElement("select")
            select.id = "doctor-dropdown"
        }
        const option = document.createElement("option")
        option.innerText = "Press To Choose A Doctor"
            select.add(option)
        doctors.forEach(doctor => {
            const option = document.createElement("option")
            option.value = doctor.id
            option.innerText = `${doctor.name} - ${doctor.address}`
            select.add(option)
        })
        if (!refresh) {
            if (localStorage.getItem('user_id') !== null) {
                const newDoctorButton = document.createElement("button")
                newDoctorButton.id = "new-doctor-button" 
                newDoctorButton.innerText = "Create a New Doctor"
                ul().appendChild(newDoctorButton)
                const br = document.createElement("br")
                ul().appendChild(br)
                newDoctorButton.addEventListener('click', this.displayForm)
        }
   }
         ul().appendChild(select)
         
         select.addEventListener("change", this.handleDoctorDropdownChange)
}

   renderDoctors = (doctors) => {
    ul().innerHTML += "<h1 id='doctors-header'>Doctors</h1>"
    renderDoctorsInDropdown(doctors.data)
}
   static handleDoctorDropdownChange = (e) => {
    if (document.querySelector(".doctor-container")) {
    document.querySelector(".doctor-container").remove()
}
    const docId = e.target.value
    const div = document.createElement("div")
    div.classList.add("doctor-container")
    div.id = `doctor-${docId}`
    ul().appendChild(div)
    if (localStorage.getItem("user_id") != null) {
        const newReviewButton = document.createElement("button")
        newReviewButton.innerText = "Add A Review"
        newReviewButton.dataset.docId = docId
        newReviewButton.id = 'new-review-button'
        div.appendChild(newReviewButton)
        newReviewButton.addEventListener("click", Review.displayForm)
    }
    ReviewApi.fetchReviews(docId)
   }

   static displayForm = () => {
    if (!doctorForm()) {
        ul().insertAdjacentHTML('afterend', `
        <form id="doctor-form">
            
            <h3>Add New Doctor:</h3>
            <label for="doctor-firstName">Doctor's First Name: </label>
            <input type="text" name="doctor-firstName" id="doctor-firstName"><br><br>
            <label for="doctor-lastName">Doctor's Last Name: </label>
            <input type="text" name="doctor-lastName" id="doctor-lastName"><br><br>
            <label for="doctor-address">Doctor's Address:</label>
            <input type="text" name="doctor-address" id="doctor-address"><br><br>
            <input type="submit" value="Create">
        </form>
        `)
        document.getElementById("doctor-form").addEventListener("submit", DoctorApi.handleSubmit)
         
    } else {
        doctorForm().remove()
    }
}
    
}