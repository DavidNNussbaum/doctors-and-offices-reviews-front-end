document.addEventListener("DOMContentLoaded", () => {
    User.logOut()
    logOn().addEventListener("click", User.addUserForm)
    signUp().addEventListener("click", User.addUserForm)
    viewOnly().addEventListener("click", DoctorApi.fetchDoctors)
    logOut().addEventListener("click", User.logOut)
    mainMenu().addEventListener("click", returnToMain)
    changeColor().addEventListener("click", changeTheColor)
    
})

const returnToMain = (e) => {
    e.preventDefault()
    ul().innerHTML = ""
    if (userForm()) {
      userForm().remove()
    }
    if (doctorForm()) {
        doctorForm().remove()
    }
    if (newReviewsForm()) {
        newReviewsForm().remove()
    }
}

const handleError = (error) => {
    console.log(error)

}

const changeTheColor = (e) => {
    e.preventDefault()
    console.log(document.body.style.backgroundColor)
    if (document.body.style.backgroundColor == "") {
        document.body.style.backgroundColor = "white";
    } else {
        document.body.style.backgroundColor = "#bebebe";
    }    
}


        
         
         