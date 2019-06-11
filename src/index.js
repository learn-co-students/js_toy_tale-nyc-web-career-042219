const TOYS_URL = 'http://localhost:3000/toys'
let TOYS_ARR = []

//DOM FINDERS
const toyCollection = document.querySelector('#toy-collection')

const addBtn = document.querySelector('#new-toy-btn')
const toyForm = document.querySelector('.container')
let addToy = false

// YOUR CODE HERE
fetchToys();

addBtn.addEventListener('click', () => {
  // hide & seek with the form
  addToy = !addToy
  if (addToy) {
    toyForm.style.display = 'block'
    // submit listener here
    toyForm.addEventListener('submit', (e) =>{
      e.preventDefault();
      let newName = e.target.children[1].value;
      let newImage = e.target.children[3].value;

      fetch(TOYS_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          'name': newName,
          'image': newImage,
          'likes': 0
        })
      })
      .then(res => res.json())
      .then(function(toy) {
        TOYS_ARR.push(toy);
        renderCards(TOYS_ARR);
        e.target.reset();
      })
    })
  } else {
    toyForm.style.display = 'none'
  }
})

//listen for the click & update like number
toyCollection.addEventListener('click', (e) => {
  if (e.target.className === 'like-btn') {
    let toyId = parseInt(e.target.parentElement.id);
    let pTag = e.target.parentElement.children[2]
    let newLikes = parseInt(pTag.innerText) + 1;
    // pTag.innerText = `${newLikes} Likes`; //optimistic rendering just changing the dom when clicking without updating the server

    fetch(TOYS_URL + `/${toyId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      },
      body: JSON.stringify({
        likes: `${newLikes}`
      })
    })
    .then(res => res.json())
    .then(toy => {
      pTag.innerHTML = `${toy.likes} Likes`; //pessimistic rendering
    })
    }
  })
  //   let findToy = TOYS_ARR.find(function(toy) {
  //     let foundToy = toy.id == toyId;
  //     return foundToy;
  //   })
  //   // findToy.likes = toyLikes;
  //   findToy.likes += 1;
  //   debugger
  //   }
  // })

function fetchToys() {
  fetch(TOYS_URL)
    .then(res => res.json())
    .then(toys => {
      TOYS_ARR = toys;
      renderCards(TOYS_ARR);
    })
  };

// HTML
// function toyCard(toy){
//   let toyHtml = `
//     <div class="card">
//     <h2>${toy.name}</h2>
//     <img src=${toy.image} class="toy-avatar" />
//     <p>${toy.likes} Likes </p>
//     <button class="like-btn">Like <3</button>
//     </div>
//     `
//     return toyHtml
// }

function toyCard(toy) {
  let toyDiv = document.createElement('div');
  toyDiv.id = `${toy.id}`
  toyDiv.className = 'card';
  toyDiv.innerHTML = `
    <h2>${toy.name}</h2>
    <img src=${toy.image} class="toy-avatar" />
    <p>${toy.likes} Likes </p>
    <button class="like-btn">Like <3</button>
  `
  return toyDiv;
}

// HTML
// function renderCards(toys){
//   let toysHtml = toys.map(toyCard);
//   return toyCollection.innerHTML = toysHtml.join('');
// }

function renderCards(toys) {
  toys.forEach(function (toy) {
    toyCollection.appendChild(toyCard(toy))
  })
}