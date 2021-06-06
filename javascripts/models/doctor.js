class Doctor {
    static all = []

    constructor({first_name, last_name, address}){
        this.first_name = first_name
        this.last_name = last_name
        this.address = address
        Doctor.all.push(this)
    }

    static getAll() {
        debugger
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

    static render() {
        ul().innerHTML += "<h1 id='doctors-header'>Doctors</h1>"
        this.all.forEach(doc => this.renderDoctor(doc))
    }

    static renderDoctor(_doc) {
        const h4 = document.createElement("h4")
        const a = document.createElement("a")
        a.id = `doctor-${doc.id}`
        a.innerText = doctor.name
        a.href = "#"
        a.addEventListener("click", (e) => renderDoctors(e, doctor))
        h4.appendChild(a)
        ul().appendChild(h4)
    }

    renderDoctors(doc) {
        const h4 = document.createElement("h4")
        const a = document.createElement("a")
        a.id = `category-${this.id}`
        a.innerText = this.name
        a.href = "#"
        a.addEventListener("click", (e) => renderReviews(e, this))
        h4.appendChild(a)
        ul().appendChild(h4)
    }

    addToDropDown() {
        const option = document.createElement("option")
        option.value = this.id
        option.innerText = this.name
        reviewSelectDoctor().append(option)
    }

    renderDoctors = (doctors) => {
        ul().innerHTML += "<h1 id='doctors-header'>Doctors</h1>"
        renderDoctorsInDropdown(doctors.data)
        doctors.data.forEach(element => renderDoctor(element));
    
    }

    const renderDoctorsInDropdown = (doctors) => {
        const select = document.createElement("select")
        select.id = "doctor-dropdown"
        doctors.forEach(doctor => {
            const option = document.createElement("option")
            option.value = doctor.id
            option.text = doctor.attributes.name
            select.add(option)
        })
        ul().appendChild(select)
        select.addEventListener("change", handleDoctorDropdownChange)
   }
   
   handleDoctorDropdownChange = (e) => {
       ReviewApi.fetchReviews(e.target.value, renderReview)
   }
   renderDoctor = (doctor) => {
       const h4 = document.createElement("h4")
       const a = document.createElement("a")
       a.id = `doctor-${doctor.id}`
       a.innerText = doctor.attributes.name
       a.href = "#"
       a.addEventListener("click", (e) => renderReviews(e, doctor))
       h4.appendChild(a)
       ul().appendChild(h4)
       // ul().insertAfter(buttonShowReviews().addEventListener("click", displayForm), appendChild(h4))
   }
}