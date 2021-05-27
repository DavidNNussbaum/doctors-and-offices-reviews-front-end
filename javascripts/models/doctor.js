class Doctor {
    static all = []

    constructor({name, address}){
        this.name = name
        this.address = address
        Doctor.all.push(this)
    }

    static getAll() {
        return this.all
    }

    static findByName(name) {
       return this.all.find(function(doctor) {doctor.name === name})
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

    static renderDoctor(doctor) {
        const h4 = document.createElement("h4")
        const a = document.createElement("a")
        a.id = `doctor-${doctor.id}`
        a.innerText = doctor.name
        a.href = "#"
        a.addEventListener("click", (e) => renderDoctors(e, doctor))
        h4.appendChild(a)
        ul().appendChild(h4)
    }

    renderDoctors(doc) {
        return cat
    }
}