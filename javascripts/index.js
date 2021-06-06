document.addEventListener("DOMContentLoaded", () => {
    buttonSignLog().addEventListener("click", User.addUserForm)
    buttonShowDoctors().addEventListener("click", DoctorApi.handleClick )
    // buttonShowReviews().addEventListener("click", displayForm)
})

const handleError = (error) => {
    console.log(error)

}
        
         
         