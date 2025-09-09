const manageLoadingSpiner = (status) => {
  if (status == true) {
    document.getElementById("loading-spiner").classList.remove("hidden");
    document.getElementById("shop-card-container").classList.add("hidden");
  } else {
    document.getElementById("loading-spiner").classList.add("hidden");
    document.getElementById("shop-card-container").classList.remove("hidden");
  }
};

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

// const removeActive = () => {
//   const activedBtns = document.querySelectorAll(".actived-btn");
//   activedBtns.forEach((btn) => btn.classList.remove("active-category-btn"));
// };

const activeBtn = (id) => {
  const clickedBtn = document.getElementById(`category-btn-${id}`);
  clickedBtn.classList.add("active-category-btn");
};

const displayCategory = (categories) => {
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
                    class="btn bg-[#15803D] text-white w-full rounded-full"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
    `;
    cardsContainer.append(card);
    manageLoadingSpiner(false);
  }
};

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

loadCategory();
loadAllTrees();
