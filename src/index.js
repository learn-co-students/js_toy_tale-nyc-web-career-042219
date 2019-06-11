const addBtn = document.querySelector('#new-toy-btn')
const toyCollection = document.querySelector('#toy-collection')
const toyForm = document.querySelector('.container')
const realToyForm = toyForm.children[0];
const toysUrl = 'http://localhost:3000/toys'
let addToy = false

function fetchToys() {
  fetch(toysUrl)
    .then (res => res.json())
    .then (data => {
      console.log(data)
      data.map(renderToy)
    })
}

function getNewToy(e) {

  e.preventDefault()

  let inputs = document.querySelectorAll('.input-text')
  let name = inputs[0].value
  let image = inputs[1].value

  let data = {
    name: name,
    image: image,
    likes: 0
  }

  fetch(toysUrl, {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    "Accept": "application/json"
  },
  body: JSON.stringify(data)
  })
  .then(res => res.json())
  .then(renderToy)

}

function renderToy(toy) {
  toyCollection.innerHTML += `
  <div class='card' id=${toy.id}>
    <h2>${toy.name}</h2>
    <img src=${toy.toy_image_url} class="toy-avatar" />
    <p>${toy.likes} Likes </p>
    <button class="like-btn">Like <3</button>
  </div>
  `
}

function increaseLikes(e) {
  if (e.target.className === "like-btn") {
    let id = e.target.parentElement.id
    console.log(id)
    let like = e.target.previousElementSibling
    let likeCount = parseInt(e.target.previousElementSibling.innerText)
    like.innerText = `${++likeCount} likes`

    fetch(toysUrl + '/' + id, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify({likes: likeCount})
    })
    .then(res => res.json())
    .then(console.log)


  }
}


document.addEventListener("DOMContentLoaded", () => {

  fetchToys();

  addBtn.addEventListener('click', () => {
    addToy = !addToy
    if (addToy) {
      toyForm.style.display = 'block'
      realToyForm.addEventListener('submit', getNewToy)
    } else {
      toyForm.style.display = 'none'
    }
  })

  document.body.addEventListener("click", increaseLikes)
});
