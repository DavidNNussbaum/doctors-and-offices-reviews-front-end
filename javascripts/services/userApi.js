class UserApi {
    static fetchUser() {
        fetch('http://localhost:3000/users')
        .then(resp => resp.json())
        .then(json => json.forEach(useObj => User.findOrCreateBy(useObj)))
        .catch(handleError)
    }

    static handleSubmit = (e) => {
        if (ul().children.length < 1) {
            const payload = {
                user: {
                    first_name: e.target.parentElement.querySelector("#user-firstName").value,
                    email: e.target.parentElement.querySelector("#user-email").value,
                    password: e.target.parentElement.querySelector("#user-password").value,
                    password_confirmation: e.target.parentElement.querySelector("#user-confirmPassword").value
                }
            }
            fetch('http://localhost:3000/users', {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json",
                },
                body: JSON.stringify(payload)
                
            })
            .then(resp => resp.json())
            .then(json => {
                let user = User.findOrCreateBy(json.data.attributes)
                document.querySelector("#user-form").remove()
                renderUser(user)
            })
            .catch(handleError)
        } else {
            ul().innerHTML = ""
        }
    }

    static handleError(error) {
        console.log(error)
    }

    
}
 