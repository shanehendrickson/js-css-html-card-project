const newCard = document.getElementById("new-card");
const modalContainer = document.getElementById("modal-container");
const btnClose = document.getElementById("btn-close");
const addCard = document.getElementById("add-card");
const modalHeader = document.querySelector(".content header p")

const formTitle = document.getElementById("form-title");
// const for image?
const formCaption = document.getElementById("form-caption");
const formHeading1 = document.getElementById("form-heading-1");
const formContent1 = document.getElementById("form-content-1");
const formHeading2 = document.getElementById("form-heading-2");
const formContent2 = document.getElementById("form-content-2");

// Retrieve stored cards if they exist and parse them to an object, otherwise create an empty array
const cards = JSON.parse(localStorage.getItem("cards") || "[]");
let isUpdate = false, updateId;

newCard.addEventListener("click", () => {
  modalContainer.classList.remove("hidden")
});

btnClose.addEventListener("click", () => {
  isUpdate = false;
  // Clear the inputs on close. TODO: Look into looping through these sections to clear them.
  formTitle.value = "";
  formCaption.value = "";
  formHeading1.value = "";
  formContent1.value = "";
  formHeading2.value = "";
  formContent2.value = "";
  addCard.innerText = "Add Card";
  modalHeader.innerText = "Add a New Card";
  modalContainer.classList.add("hidden")
});

function showCards() {
  document.querySelectorAll(".content-card").forEach(card => card.remove())
  cards.forEach((card, index) => {

    // create the new card
    let addedCard = `
    <div class="card content-card">
        <div class="card-header">
          <p class="title">${card.title}</p>
          <button onclick="deleteCard(${index})" class="btn btn-delete">X</button>
        </div>

        <div class="card-body">
          
          <div id="display-image">
            
          </div>
          <span class="caption">${card.caption}</span>
          <div class="card-section">
            <h4 class="heading-1">${card.heading1}</h4>
            <p class="content-1">${card.content1}</p>            
          </div>
          <div class="card-section">
            <h4 class="heading-2">${card.heading2}</h4>
            <p class="content-2">${card.content2}</p>            
          </div>
          
        </div>

        <div class="card-footer">
          <button onclick="updateCard(
            ${index},
            '${card.title}',
            '${card.caption}',
            '${card.heading1}',
            '${card.content1}',
            '${card.heading2}',
            '${card.content2}'
          )" class="btn btn-edit">Edit</button>
        </div>
      </div>
    `

    // add the new card to the layout
    newCard.insertAdjacentHTML("afterend", addedCard)
  })
}
showCards();


function deleteCard(cardId){ // takes in card index
  let confirmDelete = confirm("Delete this note?")
  if(!confirmDelete) return;
  cards.splice(cardId, 1); // delete clicked card
  localStorage.setItem("cards", JSON.stringify(cards)); // remove from local storage
  showCards(); // reload stored cards
}

function updateCard(cardId, title, caption, heading1, content1, heading2, content2){
  isUpdate = true;
  updateId = cardId; // pass to global
  newCard.click();
  formTitle.value = title;
  formCaption.value = caption;
  formHeading1.value = heading1;
  formContent1.value = content1;
  formHeading2.value = heading2;
  formContent2.value = content2;
  addCard.innerText = "Update Now";
  modalHeader.innerText = "Update a Card";
}

addCard.addEventListener("click", (e) => {
  e.preventDefault();

  let cardTitle = formTitle.value;
  let cardCaption = formCaption.value;
  let cardHeading1 = formHeading1.value;
  let cardContent1 = formContent1.value;
  let cardHeading2 = formHeading2.value;
  let cardContent2 = formContent2.value;

  if(cardTitle) {
    let cardInfo = {
      title: cardTitle,
      caption: cardCaption,
      heading1: cardHeading1,
      content1: cardContent1,
      heading2: cardHeading2,
      content2: cardContent2
    }
    if(!isUpdate){
      cards.push(cardInfo); // add new card to cards
    } else {
      isUpdate = false;
      cards[updateId] = cardInfo; // update the indicated card
    }
    
    
    

    localStorage.setItem("cards", JSON.stringify(cards));
    btnClose.click();
    showCards(); // Update displayed cards
  }
})
  