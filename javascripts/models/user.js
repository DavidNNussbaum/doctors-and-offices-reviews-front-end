class User {
    static all = []

    constructor({id, first_name}){
        this.id = id
        this.first_name = first_name
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
        return this.findById(userObj.id) || new User(userObj)
    }

    render() {
        ul().innerHTML += "<h1 id='users-header'>Users</h1>"
        this.all.forEach(use => this.renderCategory(use))
    }

    // renderUser(user) {
    //     const h4 = document.createElement("h4")
    //     const a = document.createElement("a")
    //     a.id = `user-${user.id}`
    //     a.innerText = user.email
    //     a.href = "#"
    //     a.addEventListener("click", (e) => renderUser(e, user))
    //     h4.appendChild(a)
    //     ul().appendChild(h4)
    // }

    renderUser = () => {
        ul().innerHTML += `<h1 id='user-header'>${this.first_name}'s Doctors and Reviews</h1>`
    }

    

    displayUser = () => {
        // if (!userForm()) {
        //     UserApi.fetchUserForSelect()
        //     list.insertAdjacentHTML('afterend', `
        //     <form id="user-form">
        //         <strong class="user-name">${UserApi.useObj.attributes.name}</strong>
        //     </form>
        //     `)
        //     document.getElementById("doctors-form").addEventListener("submit", DoctorApi.handleSubmit)
        // } else {
        //     usersForm().remove()
        // }
    }

    static addUserForm = () => {
        if (!userForm()) {
            UserApi.fetchUser()
            list.insertAdjacentHTML('afterend', `
            <form id="user-form">
                <label for="user-firstName">Your First Name:</label>
                <input type="string" name="userFirstName" id="user-firstName"><br><br>
                <label for="user-email">Your email:</label>
                <input type="string" name="userEmail" id="user-email"><br><br>
                <label for="user-password">Your Password:</label>
                <input type="string" name="userPassword" id="user-password"><br><br>
                <label for="user-confirmPassword">Confirm Your Password:</label>
                <input type="string" name="userConfirmPassword" id="user-confirmPassword"><br><br>
                <input type="submit" value="Submit">
            </form>
            `)
            document.getElementById("user-form").addEventListener("submit", UserApi.handleSubmit)
        } else {
            userForm().remove()
        }
    }
    

    logged_in() {
      return true
    }
}