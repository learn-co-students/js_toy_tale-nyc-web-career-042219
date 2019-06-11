const addBtn = document.querySelector('#new-toy-btn')
const toyForm = document.querySelector('.container')
let addToy = false
const toyColl = document.querySelector('#toy-collection')
const toyUrl = 'http://localhost:3000/toys'
let toyArr = []




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


// OR HERE!
// YOUR CODE HERE
function fetchToys(){
  fetch(toyUrl)
  .then(res => res.json())
  .then(toys => {
    console.log(toys)
    toyArr = toys
    //fetched toys from db now append to dom
    toys.forEach(toy => {
      toyColl.innerHTML += `
      <div class="card">
        <h2>${toy.name}</h2>
        <img src='${toy.image}' class="toy-avatar" />
        <p>${toy.likes} Likes </p>
        <button data-id='${toy.id}'class="like-btn">Like <3</button>
      </div>
      `
    })
  })
}//end of FetchToys
fetchToys()


  //add event listener on submit button
  toyForm.addEventListener('submit', event => {
   
    //declare variables up here before fetch, and prevent default form submit
    event.preventDefault()
    let name = document.querySelector('#add-name')
    let img = document.querySelector('#add-image')
    //fetch
    fetch(toyUrl,{
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        name: name.value,
        image: img.value,
        likes: 0
      })
    })
    .then(res => res.json())
    .then(newToy => {
        console.log(newToy)
        //posted new toy info to db
        //append to dom 
        toyColl.innerHTML += `
        <div class="card">
        <h2>${newToy.name}</h2>
        <img src='${newToy.image}' class="toy-avatar" />
        <p>${newToy.likes} Likes </p>
        <button data-id='${newToy.id}'class="like-btn">Like <3</button>
      </div>
        `
      
    })


  })//end of post toys 

  //add event listener for toy like button
  toyColl.addEventListener('click', event => {
    
      let toyId = event.target.dataset.id
      console.log(toyId)
      let likeTag = event.target.previousElementSibling
      let likeNum = parseInt(likeTag.innerText)
      likeTag.innerText = `${likeNum + 1} Likes`
      console.log(likeNum)
      
      //increase likes on click through patch request to toy/:id
      fetch(`${toyUrl}/${toyId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          likes: ++likeNum
        })
      })



    
  })
  
  

