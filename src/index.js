const addBtn = document.querySelector('#new-toy-btn')
const toyForm = document.querySelector('.container')
let addToy = false
const toyCollection = document.querySelector("#toy-collection")
const addToyBtn = document.querySelector(".submit")
const toyName = document.querySelector("#toy-name")
const toyImage = document.querySelector("#toy-image")
// YOUR CODE HERE

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

const getToys = fetch("http://localhost:3000/toys")
	.then(response => response.json())
	.then(res => displayToys(res))

// OR HERE!

const displayToys = toys => {
	toys.forEach(toy => {
		toyCollection.innerHTML += `
		<div class="card">
		    <h2>${toy.name}</h2>
		    <img src=${toy.image} class="toy-avatar" />
		    <p>${toy.likes} Likes </p>
		    <button data-id="${toy.id}" class="like-btn">Like <3</button>
	  	</div>
		`
	})
}

addToyBtn.addEventListener("click", function(){
let data = {name: toyName.value, image: toyImage.value, likes: 0}
fetch("http://localhost:3000/toys", {
	method: 'POST', // or 'PUT'
  	body: JSON.stringify(data), // data can be `string` or {object}!
  	headers:{
    'Content-Type': 'application/json'
  }
})
	.then(res => res.json())
	.then(response => console.log('Success:', response))
	.catch(error => console.error('Error:', error));
})

toyCollection.addEventListener("click", function(e){
	if (e.target.className = "like-btn"){
	let likeBtn = e.target.previousElementSibling
	likeBtn.innerText = parseInt(likeBtn.innerText) + 1
	addLike(e.target.dataset.id, parseInt(likeBtn.innerText))
	}
})

function addLike(toyId, numLikes){
	fetch(`http://localhost:3000/toys/${toyId}`, {
	method: 'PATCH', // or 'PUT'
  	body: JSON.stringify({likes: numLikes}), // data can be `string` or {object}!
  	headers:{
    'Content-Type': 'application/json'
  }
})
	.then(res => res.json())
	.then(response => console.log('Success:', response))
	.catch(error => console.error('Error:', error));
}





