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

    static findByName(last_name) {
       return this.all.find(function(doctor) {doctor.last_name === last_name})
    }

    static findById(id) {
        return this.all.find(doctor => doctor.id === id)
    }

    static findOrCreateBy(doctorObj) {
        return this.findByName(doctorObj.name) || new Doctor(doctorObj)
    }

    render() {
        ul().innerHTML += "<h1 id='doctors-header'>Doctors</h1>"
        this.all.forEach(doc => this.renderDoctor(doc))
    }

    // renderDoctor(_doc) {
    //     const h4 = document.createElement("h4")
    //     const a = document.createElement("a")
    //     a.id = `doctor-${doc.id}`
    //     a.innerText = doctor.name
    //     a.href = "#"
    //     a.addEventListener("click", (e) => renderDoctors(e, doctor))
    //     h4.appendChild(a)
    //     ul().appendChild(h4)
    // }

    // renderDoctors(doc) {
    //     const h4 = document.createElement("h4")
    //     const a = document.createElement("a")
    //     a.id = `category-${this.id}`
    //     a.innerText = this.name
    //     a.href = "#"
    //     a.addEventListener("click", (e) => renderReviews(e, this))
    //     h4.appendChild(a)
    //     ul().appendChild(h4)
    // }

    // renderOptionTag() {
    //     const option = document.createElement("option")
    //     option.value = this.id
    //     option.innerText = this.name
    //     return option
    //     // reviewSelectDoctor().append(option)
    // }

    static refreshDoctorDropdown = () => {
        
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
        option.innerText = "Press To Choose An Option."
            select.add(option)
        doctors.forEach(doctor => {
            const option = document.createElement("option")
            option.value = doctor.id
            option.innerText = doctor.name
            select.add(option)
        })
        if (!refresh) {
            const newDoctorButton = document.createElement("button")
            newDoctorButton.id = "new-doctor-button" 
            newDoctorButton.innerText = "Create a New Doctor"
            ul().appendChild(newDoctorButton)
            const br = document.createElement("br")
            ul().appendChild(br)
            ul().appendChild(select)
            newDoctorButton.addEventListener('click', this.displayForm)
        }
        select.addEventListener("change", this.handleDoctorDropdownChange)
   }

   renderDoctors = (doctors) => {
    ul().innerHTML += "<h1 id='doctors-header'>Doctors</h1>"
    renderDoctorsInDropdown(doctors.data)
    // doctors.data.forEach(element => renderDoctor(element));

}
   static handleDoctorDropdownChange = (e) => {
    if (document.querySelector(".doctor-container")) {
    document.querySelector(".doctor-container").remove()
}
    const div = document.createElement("div")
    div.classList.add("doctor-container")
    div.id = `doctor-${e.target.value}`
    ul().appendChild(div)
       ReviewApi.fetchReviews(e.target.value)
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