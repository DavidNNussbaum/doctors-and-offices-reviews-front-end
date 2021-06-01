class UserApi {
    static fetchUser() {
        fetch('http://localhost:3000/users')
        .then(resp => resp.json())
        .then(json => json.forEach(useObj => User.findOrCreateBy(useObj)))
        .catch(handleError)
    }

    static handleClick = (e) => {
        if (ul().children.length < 1) {
            fetch('http://localhost:3000/users')
            .then(resp => resp.json())
            .then(json => fetchUser(json))
            .catch(handleError)
        } else {
            ul().innerHTML = ""
        }
    }

    static handleError(error) {
        console.log(error)
    }

    
}
 