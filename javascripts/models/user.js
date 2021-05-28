class User {
    static all = []

    constructor({email, password_digest}){
        this.email = email
        this.password_digest = password_digest
        User.all.push(this)
    }

    static getAll() {
        return this.all
    }

    static findByEmail() {
       return this.all.find(function(user) { user.email === email})
    }

    static findById(id) {
        return this.all.find(user => user.id === id)
    }

    static findOrCreateBy(userObj) {
        return this.findByName(userObj.email) || new User(userObj)
    }

    static render() {
        ul().innerHTML += "<h1 id='users-header'>Users</h1>"
        this.all.forEach(use => this.renderCategory(use))
    }

    static renderUser(user) {
        const h4 = document.createElement("h4")
        const a = document.createElement("a")
        a.id = `user-${user.id}`
        a.innerText = user.email
        a.href = "#"
        a.addEventListener("click", (e) => renderUser(e, user))
        h4.appendChild(a)
        ul().appendChild(h4)
    }

    renderUsers(use) {
        return use
    }
}