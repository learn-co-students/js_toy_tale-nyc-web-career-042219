const addBtn = document.querySelector('#new-toy-btn')
const toyForm = document.querySelector('.container')
let addToy = false

const TOYS_URL = 'http://localhost:3000/toys/'
// YOUR CODE HERE

addBtn.addEventListener('click', (e) => {
  // hide & seek with the form
  addToy = !addToy
  if (addToy) {
    toyForm.style.display = 'block'
    // submit listener here
    const form = document.querySelector('.add-toy-form');

    form.addEventListener('submit', createNewToy);
  } else {
    toyForm.style.display = 'none'
  }
})

document.querySelector('#toy-collection').addEventListener('click', function(e) {
  if(e.target.className === 'like-btn') {
    const toyId = e.target.parentNode.id;
    let likes = parseInt(e.target.previousElementSibling.innerText);
    likes++;
    e.target.previousElementSibling.innerText = `${likes} Likes`;

    fetch(TOYS_URL + toyId, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({ 
        likes 
      })
    })
    .then(resp => resp.json()).then(console.log);
  }
})

// OR HERE!
document.addEventListener('DOMContentLoaded', () => {
  fetchAndRenderToys();
})

function fetchAndRenderToys() {
  fetch(TOYS_URL)
  .then(resp => resp.json())
  .then(function(json) {
    const toyCollection = document.querySelector('#toy-collection');
    json.forEach(function(toy) {
      toyCollection.appendChild(createToy(toy))
    });
  });
}

function createToy(toy) {
  let toyDiv = document.createElement('div');
  toyDiv.className = 'card';
  toyDiv.id = toy.id;
  toyDiv.innerHTML = `
    <h2> ${toy.name} </h2>
    <img src=${toy.image} class="toy-avatar" />
    <p> ${toy.likes} Likes </p>
    <button class="like-btn"> Like <3 </button>
  `
  return toyDiv;
}

function createNewToy(e) {
  e.preventDefault();

  const toyCollection = document.querySelector('#toy-collection')
  let name = e.target.elements.namedItem('name').value;
  let image = e.target.elements.namedItem('image').value;
  const likes = 0;

  name = "";
  image = "";

  fetch(TOYS_URL,  {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    body: JSON.stringify({
        name,
        image,
        likes
    })
  })
  .then(resp => resp.json())
  .then(toy => {
    toyCollection.appendChild(createToy(toy))
  });
}