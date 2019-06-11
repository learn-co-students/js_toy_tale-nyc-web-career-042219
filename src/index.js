const addBtn = document.querySelector('#new-toy-btn')
const toyForm = document.querySelector('.container')
let addToy = false

const toysUrl = "http://localhost:3000/toys"
const toyUrl = "http://localhost:3000/toys/"
const toyContainer = document.querySelector('#toy-collection')

addBtn.addEventListener('click', () => {
  // hide & seek with the form
  addToy = !addToy
  if (addToy) {
    toyForm.style.display = 'block'
    // submit listener here
    const displayedForm = document.querySelector('.add-toy-form')
    // console.log(displayedForm
    displayedForm.addEventListener('submit', (e) => {
      e.preventDefault()
      // console.log('submit form')
      // get values of the form
      let name = displayedForm[0].value
      let image = displayedForm[1].value
      // console.log(name);
      // console.log(image);

      // POST TO ALL TOYS

      fetch(toysUrl, { method: 'POST',
        headers:
        {
            'Content-Type': 'application/json',
            Accept: 'application/json'
        },
        body: JSON.stringify(
          {
          "name": name,
          "image": image,
          "likes": 0
          }
        )
      })
        .then(r => r.json())
        // .then(newToy => console.log(newToy))
        .then(newToy => {createToyCard(newToy)})


    }) // end of if form exists

  } else {
    toyForm.style.display = 'none'
  }
}) //end off addbutton listener


// TO DO : DISPLAY TOYS
// 1.create a fetch to toyUrl
// 2.for every toy create a toyCard (map over response)
// >>>>>>>> create toyCard Function
// 3.append the card to the DOM
//  >>>>>>>identify where and grab the element where the toys are going to be added - inside <body> <div> with id of "#toy-collection"

// 1. FETCH ALL TOYS
  fetch(toysUrl, { method: "GET"
  })
    .then(r => r.json())
    .then(toysData => {
      toysData.map(toy => createToyCard(toy));
    })

// toyCard function that we will call for every toy element in the array of the GET fetch
function createToyCard(toy){
  // toyContainer.innerHTML = ''
  toyContainer.innerHTML += `
  <div class="card">
    <h2>${toy.name}</h2>
    <img src=${toy.image} class="toy-avatar" />
    <p>${toy.likes} Likes </p>
    <button data-id="${toy.id}" class="like-btn">Like <3</button>
  </div>
  `
};

// TO DO : ADD a new Toy

// find the form that submits a a new toy
// >>>>>in this case its only rendered after the button is clicked
// >>>>>> add a listener to the form
// ...since a page reloads when it submits, when need to prevent default action
// find the value of each field
// >>>>>> create variables with values
// >>>>>> Create a POST fetch
// ... using the new variables in the body of the post
// ... get a response of a new toy and create newToyCard with the new toy by invoking the function(append it to the DOM)


// TO DO: INCREASE LIKES use event Delegation

// add an event listener to the toyContainer
// create condition based on the event target
// grab the toy by the dataset.id
// grab where the likes are being incremented
// ....grab tha value
// since is a DOM feature we can optimistically increase the likes
// to persist the likes create a patch request with the new number of likes


toyContainer.addEventListener('click', e => {
  // console.log(e.target);
  // debugger
  if (e.target.className === 'like-btn'){
  let toyId = e.target.dataset.id
  let likesTag = e.target.previousElementSibling
  let likesNum = parseInt(likesTag.innerText)
  // likesTag.innerText = `${likesNum + 1 + ' Likes'}`
  // ^^^^ optimistic rendering

  // Patch Fetch

    fetch(toyUrl+`${toyId}`, { method: "PATCH",
      headers:
      {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify(
        {
          "likes": ++likesNum
        }
      )
    })
      .then(r => r.json())
      .then(toy => likesTag.innerText = likesNum + ' Likes' )



    }



}) // end of toyContainer listener
