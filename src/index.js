function fetchToys() {
  // To pass the tests, don't forget to return your fetch!
  fetch('http://localhost:3000/toys')
  .then(resp => resp.json())
  .then(data => renderToys(data));
  
}

function renderToys(toys) {
  const main = document.querySelector('#toy-collection');
  toys.forEach(toy => {
    const div = document.createElement('div');
    div.className = 'card';
    div.innerHTML = toy.name;
    main.appendChild(div);
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
  fetchToys();
});
