class UserApi {
    static fetchUser() {
        fetch('http://localhost:3000/users')
        .then(resp => resp.json())
        .then(json => json.forEach(useObj => User.findOrCreateBy(useObj)))
        .catch(handleError)
    }

    static handleSubmit = (e) => {
        e.preventDefault()
        if (ul().children.length < 1) {
            const payload = {
                user: {
                    first_name: e.target.parentElement.querySelector("#user-firstName").value,
                    email: e.target.parentElement.querySelector("#user-email").value,
                    password: e.target.parentElement.querySelector("#user-password").value,
                    password_confirmation: e.target.parentElement.querySelector("#user-confirmPassword").value
                }
            }
            if(e.target.parentElement.querySelector("#user-password").value !== e.target.parentElement.querySelector("#user-confirmPassword").value) {
                alert("Your confirmed password does not match your password.")

                
                return false
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
                if (json.error) {
                  alert(json.error)
                } else {
                    let user = User.findOrCreateBy(json.data.attributes)
                    localStorage.setItem("user_id", user.id)
                    document.querySelector("#user-form").remove()
                    user.renderUser();
                    DoctorApi.fetchDoctors()
                }
                
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
 