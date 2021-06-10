document.addEventListener("DOMContentLoaded", () => {
    User.logOut()
    // buttonSignLog().addEventListener("click", User.addUserForm)
    logOn().addEventListener("click", User.addUserForm)
    signIn().addEventListener("click", User.addUserForm)
    viewOnly().addEventListener("click", DoctorApi.fetchDoctors)
    // buttonShowDoctors().addEventListener("click", DoctorApi.fetchDoctors)
    logOut().addEventListener("click", User.logOut)
    mainMenu().addEventListener("click", returnToMain)
})

const returnToMain = (e) => {
    e.preventDefault()
    ul().innerHTML = ""
    if (userForm()) {
      userForm().remove()
    }
}

const handleError = (error) => {
    console.log(error)

}
        
         
         