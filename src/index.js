const addBtn = document.querySelector('#new-toy-btn')
const toyForm = document.querySelector('.container')
let addToy = false

// YOUR CODE HERE
let toyArray = [];
const toyURL = "http://localhost:3000/toys";
const toyBox = document.querySelector('#toy-collection');

//FETCH TOYS
function fetchToys() {
  fetch(toyURL)
  .then(response => response.json())
  .then(data => {
    toyArray = data
    listToys(toyArray)
  })
}
fetchToys();

//LIST TOYS
function listToys(toys) {
  toyHTML = renderToys(toys)
  toyBox.innerHTML = toyHTML
}

//RENDER TOYS
function renderToys(toys) {
  return toys.map(toy => {
    return `
      <div class="card" data-id="${toy.id}">
        <h2 class="name">${toy.name}</h2>
        <img src="${toy.image}" class="toy-avatar"/>
        <p> ${toy.likes} Likes </p>
        <button class="like-btn">Like ❤️</button>
        <span><button type="button" class="close" aria-label="Close" data-id="${toy.id}">Delete</button></span>
    </div>
    `
  }).join('')
}

//OPEN CREATE FORM & ADD NEW TOYS
addBtn.addEventListener('click', () => {
  // hide & seek with the form
  addToy = !addToy
  if (addToy) {
    toyForm.style.display = 'block'
    // submit listener here
    toyForm.addEventListener('submit', event => {
      event.preventDefault()
      addNewToy();
    })
  } else {
    toyForm.style.display = 'none'
  }
})

//INCREASE LIKES
toyBox.addEventListener('click', event => {
  if(event.target.className === 'like-btn') {
    let toyId = event.target.parentNode.dataset.id;
    let like = event.target.previousElementSibling;
    let likeNum = parseInt(event.target.previousElementSibling.innerText);
    like.innerText = `${++likeNum} likes`

    fetch(`${toyURL}/${toyId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json"},
      body: JSON.stringify({likes: likeNum})
    })
    .then(response => response.json())
    }
  })

  //DELETE TOY
  toyBox.addEventListener('click', event => {
    if(event.target.className === 'close') {
      toyId = event.target.dataset.id;
      event.target.parentNode.parentNode.remove()

      fetch(`${toyURL}/${toyId}`, {
        method: "DELETE"})
        .then(console.log)
    }
  })


//ADD TOY HELPER FUNCTION
function addNewToy() {
  let name = event.target[0].value
  let image = event.target[1].value

   fetch(toyURL, {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({
      name,
      image,
      likes: 0
    })
  })
  .then(response => response.json())
  .then(newToy => {
    toyArray.push(newToy);
    listToys(toyArray)
  })
  event.target.reset();
}

// OR HERE!
