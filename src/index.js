//VARIABLES
const addBtn = document.querySelector('#new-toy-btn')
const toyForm = document.querySelector('.container')
const toyCard = document.getElementById('toy-collection')
const createForm = document.querySelector('.add-toy-form')
const TOYS_URL = 'http://localhost:3000/toys'
let addToy = false
let toysArray = []


//FUNCTIONS
function renderSingleToy(toy){
  return `
  <div data-id="${toy.id}" class="card">
  <h2>${toy.name}</h2>
  <img src=${toy.image} class="toy-avatar" />
  <p>${toy.likes} Likes </p>
  <button class="like-btn">Like <3</button>
</div>`
}


function displayToyCard(toys){
  let toysHTML = toys.map(renderSingleToy)
  return toyCard.innerHTML = toysHTML.join('')
}

//FETCH REQUESTS
fetch(TOYS_URL)
.then(response => response.json())
.then(toysData => {
  toysArray = toysData
  displayToyCard(toysArray)
})


//EVENT LISTENERS
addBtn.addEventListener('click', () => {
  // hide & seek with the form
  addToy = !addToy
  if (addToy) {
    toyForm.style.display = 'block'
    // submit listener here
  } else {
    toyForm.style.display = 'none'
  }
})

toyCard.addEventListener('click', (event) => {
  if (event.target.className === 'like-btn') {
    debugger;
    let toyId = event.target.parentElement.dataset.id
    let likes = event.target.previousElementSibling
    let likeCount = parseInt(event.target.previousElementSibling.innerText)
    likes.innerText = `${++likeCount} likes`

    fetch(TOYS_URL + '/' + toyId, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        likes: likeCount
      })
    })
    .then(response => response.json())

  }
})

createForm.addEventListener('submit', (event) => {
  event.preventDefault()
  let toyName = event.target.children[1].value
  let toyURL = event.target.children[3].value

  fetch(TOYS_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    body: JSON.stringify({
      name: toyName,
      image: toyURL,
      likes: 0
    })
  })
  .then(response => response.json())
  .then(toyData => {
    toysArray.push(toyData)
    displayToyCard(toysArray)
  })

})

