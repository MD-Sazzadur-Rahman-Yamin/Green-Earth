//Loading spiner
const manageLoadingSpiner = (status) => {
  if (status == true) {
    document.getElementById("loading-spiner").classList.remove("hidden");
    document.getElementById("shop-card-container").classList.add("hidden");
  } else {
    document.getElementById("loading-spiner").classList.add("hidden");
    document.getElementById("shop-card-container").classList.remove("hidden");
  }
};

// load APIs

const loadCategory = () => {
  const url = "https://openapi.programming-hero.com/api/categories";
  fetch(url)
    .then((res) => res.json())
    .then((data) => displayCategory(data.categories));
};

const loadCategoryCards = (id) => {
  const url = `https://openapi.programming-hero.com/api/category/${id}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      activeBtn(id);
      displayCategoryCards(data.plants);
    });
};
const loadAllTrees = () => {
  manageLoadingSpiner(true);
  const url = "https://openapi.programming-hero.com/api/plants";
  fetch(url)
    .then((res) => res.json())
    .then((data) => displayAllTrees(data.plants));
};
const loadPlantsDetail = (id) => {
  const url = `https://openapi.programming-hero.com/api/plant/${id}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => openModal(data.plants));
};

// active btn

const removeActive = () => {
  const activedBtns = document.querySelectorAll(".actived-btn");
  activedBtns.forEach((btn) => btn.classList.remove("active-category-btn"));
};

const activeBtn = (id) => {
  removeActive()
  const clickedBtn = document.getElementById(`category-btn-${id}`);
  clickedBtn.classList.add("active-category-btn");
};

// display APIs

const displayCategory = (categories) => {
  // console.log(categories)
  const categoryContainer = document.getElementById("categories");
  // categoryContainer.innerHTML = "";
  for (let category of categories) {
    const btnDiv = document.createElement("div");
    btnDiv.innerHTML = `
    <button id="category-btn-${category.id}" onClick="loadCategoryCards(${category.id})" class="actived-btn btn w-full text-left border-none bg-transparent text-[#1F2937] hover:bg-[#15803D] hover:text-white">${category.category_name}</button>
    `;
    categoryContainer.append(btnDiv);
  }
};

const displayCategoryCards = (plants) => {
  const cardsContainer = document.getElementById("shop-card-container");
  cardsContainer.innerHTML = "";
  for (let plant of plants) {
    const card = document.createElement("div");
    card.innerHTML = `
     <div class="card bg-base-100 w-full shadow-sm">
              <figure class="px-4 pt-4">
                <img
                  src="${plant.image}"
                  alt="Shoes"
                  class="rounded-xl"
                />
              </figure>
              <div class="card-body">
                <h2 class="card-title" onclick="loadPlantsDetail(${
                  plant.id
                })">${plant.name}</h2>
                <p>${[plant.description]}</p>
                <div class="w-full flex justify-between items-center">
                  <h6 class="bg-[#DCFCE7] text-[#15803D] px-3 py-1 rounded-full">${
                    plant.category
                  }</h6>
                  <p class="flex-grow-0 font-semibold">${plant.price}</p>
                </div>
                <div class="card-actions">
                  <button
                    class="btn add-to-cart-btn bg-[#15803D] text-white w-full rounded-full"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
    `;
    cardsContainer.append(card);
  }
};

const displayAllTrees = (plants) => {
  const cardsContainer = document.getElementById("shop-card-container");
  cardsContainer.innerHTML = "";
  for (let plant of plants) {
    const card = document.createElement("div");
    card.innerHTML = `
     <div class="card bg-base-100 w-full shadow-sm">
              <figure class="px-4 pt-4">
                <img
                  src="${plant.image}"
                  alt="Shoes"
                  class="rounded-xl h-[11.625rem]"
                />
              </figure>
              <div class="card-body">
                <h2 id="${plant.id}" class="card-title" onclick="loadPlantsDetail(${
                  plant.id
                })">${plant.name}</h2>
                <p>${[plant.description]}</p>
                <div class="w-full flex justify-between items-center">
                  <h6 class="bg-[#DCFCE7] text-[#15803D] px-3 py-1 rounded-full">${
                    plant.category
                  }</h6>
                  <p class="flex-grow-0 font-semibold">${plant.price}</p>
                </div>
                <div class="card-actions">
                  <button
                    class="btn bg-[#15803D] text-white w-full rounded-full"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
    `;
    cardsContainer.append(card);
  }
  manageLoadingSpiner(false);
};

// Add to cart btn
let myCart = [];
const cartItemsContainer = document.getElementById("cart-items");
const shopCardContainer = document.getElementById("shop-card-container").addEventListener('click',(e)=>{
  // console.log(e.target.innerText)
  if (e.target.innerText == "Add to Cart") {
    // console.log("BTN clicked")
    // console.log(e.target.parentNode.parentNode.children[2].children[1].innerText);
    const treeName = e.target.parentNode.parentNode.children[0].innerText;
    const id = e.target.parentNode.parentNode.children[0].id;
    const price = e.target.parentNode.parentNode.children[2].children[1].innerText;
    myCart.push({
      treeName: treeName,
      id : id,
      price : price
    })
    displayCartItems(myCart);
  }
});
const displayCartItems = (myCart) => {
      // console.log(myCart);
      cartItemsContainer.innerHTML = ""
      myCart.forEach(myCart =>{
        cartItemsContainer.innerHTML += `
        <div
                class="flex justify-between items-center bg-[#F0FDF4] rounded-lg px-3 py-2 my-2"
              >
                <div>
                  <h6 class="font-semibold">${myCart.treeName}</h6>
                  <p class="text-[#1F2937]">৳${myCart.price} x 1</p>
                </div>
                <img onClick="deleteFromCart(${myCart.id})" class="size-4" src="./assets/delete.svg" alt="delete" />
              </div>
        `;
      })
};

const deleteFromCart = (itemsID) =>{
  console.log(myCart)
  const filteredMyCart = myCart.filter((items) => items.id !== String(itemsID));
  myCart = filteredMyCart;
  displayCartItems(myCart)
  console.log(myCart)

}
// display Modal

const openModal = (detail) => {
  const modalContenter = document.getElementById("modal-container");
  modalContenter.innerHTML = `
    <div>
      <h2 class="font-bold text-3xl">${detail.name}</h2>
    </div>
    <div>
      <img src="${detail.image}" alt="${detail.name}" />
    </div>
    <div>
      <p><span class="font-bold">Category:</span> ${detail.category}</p>
    </div>
    <div>
      <p><span class="font-bold">Price:</span> ${detail.price}</p>
    </div>
    <div>
      <p><span class="font-bold">Description:</span> ${detail.description}</p>
    </div>
  `;
  document.getElementById("my_modal_5").showModal();
};

// function call

loadCategory();
loadAllTrees();
