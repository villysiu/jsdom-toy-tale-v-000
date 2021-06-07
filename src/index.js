function fetchToys() {
  // To pass the tests, don't forget to return your fetch!
  fetch('http://localhost:3000/toys')
  .then(resp => resp.json())
  .then(data => renderToys(data));
  
}


function renderToys(toys) {
  const main = document.querySelector('#toy-collection');

  toys.forEach(toy => {

    // toyCollection.innerHTML += `
    // <div class="card" data-id=${toy.id}>
    //     <h2>${toy.name}</h2>
    //     <img src="${toy.image}" class="toy-avatar" />
    //     <p>${toy.likes} Likes</p>
    //     <button class="like-btn">Like <3</button>
    //     <button class="delete-btn">Delete</button>
    // </div>
    // `

    const div = document.createElement('div');
    div.className = 'card';
    main.appendChild(div);

    const h2 = document.createElement('h2');
    h2.innerText = toy.name;
    div.appendChild(h2);

    const img = document.createElement('img');
    img.className = "toy-avatar"
    img.src = toy.image;
    div.appendChild(img);

    const p = document.createElement('p');
    p.innerText = toy.likes + ' Likes';
    div.appendChild(p);

    const btn = document.createElement("button");
    btn.className = "like-btn"
    btn.innerText = "Like"
    div.appendChild(btn)
  });
}

let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });

  const addToyForm = document.querySelector(".add-toy-form");
  addToyForm.addEventListener("submit", addNewToy);

  fetchToys();

  const toyCollection = document.getElementById('toy-collection');
  toyCollection.addEventListener('click', editLikeCount);
});

function addNewToy(event) {
  fetch('http://localhost:3000/toys/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      name: `${event.target.name.value}`,
      image: `${event.target.image.value}`,
      likes: 0
    })
  })
    .then(resp => resp.json())
    .then(renderToys)
}

function editLikeCount(event) {
  let likeButtonIsPressed = event.target.className === "like-btn"
  if (likeButtonIsPressed) {
    let id = event.target.parentElement.dataset.id
    let like = event.target.previousElementSibling
    let likeCount = parseInt(event.target.previousElementSibling.innerText)
    like.innerText = `${++likeCount} likes`
fetch(`http://localhost:3000/toys/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        likes: likeCount
      })
    })
    .then(response => response.json())
  }
}