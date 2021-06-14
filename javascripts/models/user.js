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

    renderUser = () => {
        ul().innerHTML += `<h1 id='user-header'>${this.first_name}'s Doctors and Reviews</h1>`
    }



    
    static addUserForm = () => {
        if (!userForm()) {
            UserApi.fetchUser()
            list.insertAdjacentHTML('afterend', `
            <form id="user-form">
                <label for="user-firstName">Your First Name:</label>
                <input type="text" name="userFirstName" id="user-firstName"><br><br>
                <label for="user-email">Your email:</label>
                <input type="text" name="userEmail" id="user-email"><br><br>
                <label for="user-password">Your Password:</label>
                <input type="password" name="userPassword" id="user-password"><br><br>
                <label for="user-confirmPassword">Confirm Your Password:</label>
                <input type="password" name="userConfirmPassword" id="user-confirmPassword"><br><br>
                <input type="submit" value="Submit">
            </form>
            `)
            document.getElementById("user-form").addEventListener("submit", UserApi.handleSubmit)
        } else {
            userForm().remove()
        }
    }

    static logOut() {
        localStorage.removeItem("user_id")
        document.querySelector("#main-menu").click()
    }
}