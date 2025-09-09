const categoryContainer = document.getElementById("category-container");
const postContainer = document.getElementById("post-container");
const loadingSpinner = document.getElementById("loadingSpinner");
const modalContainer = document.getElementById("modal-container");
const addCartContainer = document.getElementById("add-cart-container");
const totalPrice = document.getElementById("total-price");

let addToCart = [];

document.getElementById("toggle-btn").addEventListener("click", (e) => {
  const categoryContainer = document.getElementById("category-container");
  categoryContainer.classList.toggle("hidden");
});

// show loading
const loading = (status) => {
  if (status) {
    loadingSpinner.classList.remove("hidden");
    loadingSpinner.classList.add("flex");
  } else {
    loadingSpinner.classList.remove("flex");
    loadingSpinner.classList.add("hidden");
  }
};

// Load Category
const loadCategory = async () => {
  try {

    loading(true);
    
    categoryContainer.innerHTML = "";
    const allTypesLi = document.createElement("li");
    allTypesLi.id = "all-types";
    allTypesLi.className =
      "hover:bg-green-400 hover:text-white rounded-lg cursor-pointer px-3 py-2 active-li bg-green-700 text-white";
    allTypesLi.textContent = "All Types";
    categoryContainer.appendChild(allTypesLi);

    const url = "https://openapi.programming-hero.com/api/categories";
    const res = await fetch(url);
    const data = await res.json();

    data.categories.forEach((cat) => {
      const li = document.createElement("li");
      li.id = cat.id;
      li.className =
        "hover:bg-green-400 hover:text-white rounded-lg cursor-pointer px-3 py-2 active-li";
      li.textContent = cat.category_name;
      categoryContainer.appendChild(li);
    });
  } catch (err) {
    console.log(err);
  }
};



// fetch all post

const fetchAllPost = async () => {
  try {
    loading(true);
    const url = "https://openapi.programming-hero.com/api/plants";
    const res = await fetch(url);
    const data = await res.json();
    const allPost = data.plants;
    loadPost(allPost);
  } catch (err) {
    console.log(err);
  } finally {
    loading(false);
  }
};




// Load Post
const loadPost = async (data) => {
  postContainer.innerHTML = "";
  data.forEach((plant) => {
    const div = document.createElement("div");
    div.className =
      "card bg-white border border-green-100 rounded-2xl shadow-sm hover:shadow-md transition p-3 card-parent";
    div.innerHTML = `
  <figure class="overflow-hidden rounded-xl">
    <img class="w-full h-48 object-cover"
      src="${plant.image}"
      alt="plant"
      />
  </figure>
  
  <div class="card-body px-2 py-4 space-y-3">
  <h2 class="text-lg font-semibold text-gray-800 cursor-pointer" onclick="showDetails('${plant.id}')">${plant.name}</h2>
  <p class="text-sm text-gray-600 line-clamp-2 ">
      ${plant.description}
      </p>

      <div class="flex justify-between items-center">
      <span class="inline-block bg-green-100 text-green-800 text-sm font-medium px-3 py-1 rounded-full">
      ${plant.category}
      </span>
      <span class="text-base font-bold text-gray-600">৳<span class="price ">${plant.price}</span></span>
      </div>

      <div class="card-actions mt-2">
      <button class="btn bg-green-600 hover:bg-green-400 text-white rounded-full w-full text-base font-medium py-2 cart-btn" data-id="${plant.id}">
      Add to Cart
      </button>
      </div>
      </div>
      `;
    postContainer.appendChild(div);
  });
};

// plants by categories
const plantsByCategory = (id) => {
  loading(true);

  const url = `https://openapi.programming-hero.com/api/category/${id}`; 

  fetch(url)
    .then(res => res.json())
    .then(data => {
      const allPost = data.plants;
      loadPost(allPost);
    })
    .catch(err => {
      console.log("Error fetching plants by category:", err);
    })
    .finally(() => {
      loading(false);
    });
};

// ---------modal-----------
const showDetails = (id) => {
  const url = `https://openapi.programming-hero.com/api/plant/${id}`;

  fetch(url)
    .then(res => res.json())
    .then(data => {
      const detail = data.plants;

      const dialog = document.createElement("dialog");
      dialog.id = "my_modal";
      dialog.className = "modal modal-bottom sm:modal-middle";
      dialog.innerHTML = `
        <div class="modal-box space-y-2 ">
          <h3 class="text-xl font-bold">${detail.name}</h3>
          <figure class="overflow-hidden rounded-md">
            <img class="w-full h-60 object-cover" src="${detail.image}" alt="plant" />
          </figure>
          <h1 class="font-bold text-lg">Category: <span class="font-normal">${detail.category}</span></h1>
          <h1 class="font-bold text-md">Price: <span class="font-normal">৳${detail.price}</span></h1>
          <p class="font-bold text-md">Description: <span class="font-normal">${detail.description}</span></p>
          <div class="modal-action">
            <form method="dialog">
              <button class="btn">Close</button>
            </form>
          </div>
        </div>
      `;

      modalContainer.innerHTML = "";
      modalContainer.appendChild(dialog);
      my_modal.showModal();
    })
    .catch(err => {
      console.error(err);
      
    });
};
//----------- Show Post by Categories------


categoryContainer.addEventListener("click", (e) => {
  if (e.target.nodeName === "LI") {
    const allLi = document.querySelectorAll(".active-li");
    allLi.forEach((li) => {
      li.classList.remove("bg-green-700", "text-white");
    });

    postContainer.innerHTML = "";

    const id = e.target.id;
    e.target.classList.add("bg-green-700", "text-white");
    loading(true);
    if (id === "all-types") {
      fetchAllPost();
    } else {
      plantsByCategory(id);
    }

    const categoryContainer = document.getElementById("category-container");
    categoryContainer.classList.add("hidden");
  }
});

//  cart update cart
const updateCartPrice = () => {
 addCartContainer.innerHTML = "";
  addToCart.forEach((item, index) => {
    const div = document.createElement("div");
    div.innerHTML = `<div class="flex items-center justify-between bg-gray-200 shadow-md m-2  p-2 rounded-md">
                        <div class="flex-grow">
                            <h3 class="font-semibold text-gray-600 text-base">
                                ${item.name} 
                                <span class="text-sm font-normal text-gray-600">(x${ item.quantity})</span>
                             </h3>    
                                
                            
                            <p class="font-bold text-sm text-gray-600">৳${ item.price * item.quantity}</p>
                             
                            
                        </div>
                        <button onclick="removeItem(${index})" class="btn btn-ghost btn-xs hover:bg-red-400 p-1">
                          <i class="fa-solid fa-xmark text-lg"></i> 
                        </button>
                    </div>`;
    addCartContainer.appendChild(div);
  });
};

// add to cart button  showing

postContainer.addEventListener("click", (e) => {
  if (e.target.nodeName === "BUTTON") {
    const card = e.target.closest(".card-parent");
    const name = card.querySelector("h2").textContent;
    const getPrice = card.querySelector(".price").textContent;
    const id = e.target.dataset.id;
    const price = parseInt(getPrice);

    const existingItem = addToCart.find((item) => item.id === id);

    if (existingItem) {
      existingItem.quantity++;
    } else {
      const allItem = {
        name,
        price,
        id,
        quantity: 1,
      };
      addToCart.push(allItem);
    }
    alert(`${name} has been added to the cart.`);
    updateCartPrice();
    calculatePrice();
  }
});

// -------Price calculate------------

const calculatePrice = () => {
  const price = addToCart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  totalPrice.textContent = price;
};

// remove item form cart and update price

const removeItem = (index) => {
  addToCart.splice(index, 1);
  updateCartPrice();
  calculatePrice();
};

fetchAllPost();
loadCategory();
