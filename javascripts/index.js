const buttonDiv = () => document.getElementById("button-control")
const buttonShow = () => document.getElementById("button-show")
const buttonNew = () => document.getElementById("button-new")
const ulDiv = () => document.getElementById("list")
const ul = () => document.getElementById("categories-list")
const commentsForm = () => document.getElementById("comments-form")
const doctorRating = () => document.getElementById("doctor-rating")
const doctorComments = () => document.getElementById("doctor-comments")
const doctorOfficeRating= () => document.getElementById("office-rating")
const doctorOfficeComments = () => document.getElementById("office-comments")
const doctorId = () => document.getElementById("doctor-id")
const userId = () => document.getElementById("user-id")

document.addEventListener("DOMContentLoaded", () => {
    buttonShow().addEventListener("click", handleClick)
    buttonNew().addEventListener("click", displayForm)
})

const handleClick = (e) => {
    if (ul().children.length < 1) {
        fetch('http://localhost:3000/doctorss')
        .then(resp => resp.json())
        .then(json => renderDoctors(json))
        .catch(handleError)
    } else {
        ul().innerHTML = ""
    }
}

const displayForm = () => {
    if (!commentsForm()) {
        fetchDoctorsForSelect()
        list.insertAdjacentHTML('afterend', `
        <form id="comments-form">
            <h3>Add New Comments:</h3>
            <label for="comments-doctorRating">Doctor Rating (1-10):</label>
            <input type="number" name="doctorRating" id="comments-doctorRating"><br><br>
            <label for="comments-doctorComments">Comments Regarding This Doctor:</label>
            <input type="text" name="doctorComment" id="comments-doctorComments"><br><br>
            <label for="comments-doctorOfficeRating">Doctor's Office Rating (1-10):</label>
            <input type="number" name="doctorOfficeRating" id="comments-doctorOfficeRating"><br><br>
            <label for="comments-doctorOfficeComments">Comments Regarding This Doctor's Office:</label>
            <input type="text" name="doctorOfficeComments" id="comments-doctorOfficeComments"><br><br>
            <select id="comment_id">
            </select>
            <input type="submit" value="Create">
        </form>
        `)
        commentsForm().addEventListener("submit", handleSubmit)
    } else {
        commentsForm().remove()
    }
}

const fetchDoctorsForSelect = () => {
    fetch('http://localhost:3000/doctors')
            .then(resp => resp.json())
            .then(json => json.map((docObj) => `<option value="${docObj.id}">${docObj.name}</option>`))
            .then(collection => document.querySelector("select#Doctor_id").innerHTML = collection.join(" "))
}

const renderDoctors = (doctors) => {
    ul().innerHTML += "<h1 id='doctors-header'>Doctors</h1>"
    doctors.forEach(element => renderDoctor(element));
}


const renderDoctor = (doctor) => {
    const h4 = document.createElement("h4")
    const a = document.createElement("a")
    a.id = `doctor-${doctor.id}`
    a.innerText = doctor.name
    a.href = "#"
    a.addEventListener("click", (e) => renderComments(e, doctor))
    h4.appendChild(a)
    ul().appendChild(h4)
}

const renderComments = (e, comment) => {
    const nextLiSibling = e.target.nextSibling
    if (nextLiSibling) {
        const children = Array.from(e.target.parentNode.children)
        const lis = children.slice(1)
        lis.forEach((li) => li.remove())
    } else {
        doctor.comments.forEach(element => renderComment(element, doctor.id));

    }

}
const renderComment = (comment, docId) => {
    const a = document.getElementById(`comments-${docId}`)
    const li = document.createElement("li")
    a.dataset.docId = docId
    li.innerHTML = `
        <strong class="comments-doctorRating">${comment.doctor_rating}</strong>
        <span class="comments-doctorComments">${comment.doctor_comments}</span>
        <span class="comments-doctorOfficeRating">${comment.doctor_office_rating}</span><br>
        <span class="comments-doctorOfficeComments">${comment.doctor_office_comments}</span>
        <button class="edit-comment" data-id="${comment.id}">Edit</button>
        <button class="delete-comment" data-id="${comment.id}">Delete</button>
    `

    a.parentNode.appendChild(li)
    document.querySelector(`button.delete-comments[data-id='${comment.id}']`).addEventListener("click", handleDelete)
    document.querySelector(`button.edit-comments[data-id='${comment.id}']`).addEventListener("click", handleUpdate)

}

const handleSubmit = (e) => {
    e.preventDefault()
    const data = {
        doctorRating: doctorRating().value,
        doctorComments: doctorComments().value,
        doctorOfficeRatong: doctorOfficeRating().value,
        doctorOfficeComments: doctorOfficeComments().value,
        comment_id: commentSelectDoctor().value
    }

    fetch("http://localhost:3000/products", {
        method: 'POST',
        headers: {
            "Content-Type": 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(resp => resp.json())
    .then(json => handleCreateComment(json))
}

const handleCreateComment = (renderComments) => {
    ul().children.length < 1 ? handleClick() : renderComment(comment, comment.doctor.id)
    commentForm().reset()
}

const handleDelete = (e) => {
    fetch(`http://localhost:3000/comments/${e.target.dataset.id}`, {
        method: 'DELETE',
        headers: {
            "Content-Type": 'application/json'
        }
    })
    .then(resp => resp.json())
    .then(json => {
        e.target.parentNode.remove()
        alert(json.message)
    })
}

const handleUpdate = (e) => {
    if (e.target.innerText === "Edit") {
        // replace current li with a new one containing inputs and map values
        // Button will now say Update not Edit
        const comId = e.target.dataset.id
        const doctorRating = e.target.parentElement.querySelector(".doctor-rating").innerText
        const doctorComments = e.target.parentElement.querySelector(".doctor-comments").innerText
        const doctorOfficeRating = e.target.parentElement.querySelector(".doctorOffice-rating").innerText
        const doctorOfficeComments = e.target.parentElement.querySelector(".doctorOffice-comments").innerText
         
        e.target.parentElement.innerHTML = `
            <label for="comments-doctorRating">Doctor Rating (1-10):</label>
            <input type="number" name="doctorRating" id="comments-doctorRating" value="${doctorRating}"><br>
            <label for="comments-doctorComments">Comments Regarding This Doctor:</label>
            <input type="text" name="doctorComments" id="comments-doctorComments" value="${doctorComments}"><br>
            <label for="comments-doctorOfficeRating">Doctor's Office Rating (1-10):</label>
            <input type="number" name="doctorOfficeRating" id="comments-doctorOfficeRating" value="${doctorOfficeRating}"><br>
            <label for="comments-doctorOfficeComments">Comments Regarding This Doctor's Office:</label>
            <input type="text" name="doctorComment" id="comments-doctorComments" value="${doctorOfficeComments}"><br>
            <button class="update-comment" data-id="${comId}">Update</button>
            <button class="delete-comment" data-id="${comId}">Delete</button>

             
        `
        document.querySelector(`button.delete-product[data-id='${comId}']`).addEventListener("click", handleDelete)
        document.querySelector(`button.update-product[data-id='${comId}']`).addEventListener("click", handleUpdate)


    } else {
        handleFetchUpdate(e)
    }
}

const handleFetchUpdate = (e) => {
    const data = {
        id: e.target.dataset.id,
        doctorRating: e.target.parentElement.querySelector("#comments-doctorRating").value,
        doctorComments: e.target.parentElement.querySelector("#comments-doctorComments").value,
        doctorOfficeRating: e.target.parentElement.querySelector("#comments-doctorOfficeRating").value,
        doctorOfficeComments: e.target.parentElement.querySelector("#comments-doctorOfficeComments").value
         
    }

    fetch(`http://localhost:3000/comments/${data.id}`, {
        method: 'PATCH',
        headers: {
            "Content-Type": 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(resp => resp.json())
    .then(json => replaceElement(json, e.target.parentElement))
    .catch(err => alert(err))
}

const replaceElement = (product, li) => {
    li.innerHTML = `
        <strong class="comments-doctorRating">${comment.doctorRating}</strong>
        <span class="comments-doctorComments">${comment.doctorComment}</span>
        <span class="comments-doctorOfficeRating">${comment.doctorOfficeRating}</span>
        <span class="comments-doctorOfficeComments">${comment.doctorOfficeComment}</span>
        <button class="edit-comment" data-id="${comment.id}">Edit</button>
        <button class="delete-comment" data-id="${comment.id}">Delete</button>
    `
    document.querySelector(`button.delete-comment[data-id='${comment.id}']`).addEventListener("click", handleDelete)
    document.querySelector(`button.edit-comment[data-id='${comment.id}']`).addEventListener("click", handleUpdate)

}

const handleError = (error) => {
    console.log(error)

}
        
         
         