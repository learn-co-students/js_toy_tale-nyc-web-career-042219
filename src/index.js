const addBtn = document.querySelector('#new-toy-btn');
const toyForm = document.querySelector('.container');
const toyCollection = document.getElementById('toy-collection');
const addToyForm = document.getElementsByClassName('add-toy-form')[0];
let addToy = false;

// YOUR CODE HERE

addBtn.addEventListener('click', () => {
  // hide & seek with the form
  addToy = !addToy;
  if (addToy) {
    toyForm.style.display = 'block';
    // submit listener here
  } else {
    toyForm.style.display = 'none';
  }
});

const renderToyCard = (toyObject) => {
  toyCollection.innerHTML += `
  <div class='card' data-id='${toyObject.id}'>
    <h2>${toyObject.name}</h2>
    <img class="toy-avatar" src="${toyObject.image}">
    <p>${toyObject.likes} Likes</p>
    <button class="like-btn">Like <3</button>
  </div>`;
};

const makeToyCards = (toysData) => {
  toysData.then((data) => {
    data.forEach(element => renderToyCard(element));
  });
};

// OR HERE!
const getAllToys = async () => {
  const res = await fetch('http://localhost:3000/toys');
  const data = await res.json();
  return data;
};

const createNewToy = (newToyObject) => {
  fetch('http://localhost:3000/toys', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify(newToyObject),
  }).then(res => res.json()).then(toyObject => renderToyCard(toyObject));
};

addToyForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const newToyObject = {
    name: e.target[0].value,
    image: e.target[1].value,
  };
  createNewToy(newToyObject);
});

const editLikeValue = (toyObject) => {
  const likeField = document.querySelectorAll(`[data-id='${toyObject.id}']`)[0].children[2];
  likeField.innerText = `${toyObject.likes} Likes`;
};

const makePostRequest = (toyId, likeValue) => {
  fetch(`http://localhost:3000/toys/${toyId}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify({ likes: likeValue }),
  }).then(res => res.json()).then(toyObject => editLikeValue(toyObject));
};

toyCollection.addEventListener('click', (e) => {
  if (e.target.className === 'like-btn') {
    const newLikeValue = parseInt(e.target.parentElement.children[2].innerText, 10) + 1;
    const toyId = e.target.parentElement.dataset.id;
    makePostRequest(toyId, newLikeValue);
  }
});

const toysData = getAllToys();
makeToyCards(toysData);
