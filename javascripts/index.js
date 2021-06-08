document.addEventListener("DOMContentLoaded", () => {
    localStorage.removeItem("user_id")
    buttonSignLog().addEventListener("click", User.addUserForm)
    buttonShowDoctors().addEventListener("click", DoctorApi.fetchDoctors)
    // buttonShowReviews().addEventListener("click", displayForm)
})

const handleError = (error) => {
    console.log(error)

}
        
         
         