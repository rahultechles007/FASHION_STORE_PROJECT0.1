
// PRODUCTS (FROM LOCALSTORAGE)

let products = JSON.parse(localStorage.getItem("products")) || [];

// 
 ELEMENTS

const productGrid = document.getElementById("productGrid");
const searchInput = document.getElementById("searchInput");
const filterButtons = document.querySelectorAll(".filter-btn");

// STATE

let activeCategory = "All";

//  LOAD CART + WISHLIST

let cart = JSON.parse(localStorage.getItem("cart")) || [];

//  DISPLAY PRODUCTS

function displayProducts(list) {

    productGrid.innerHTML = "";

    if (!list.length) {
        productGrid.innerHTML = `
        <div class="col-span-full text-center py-10 text-gray-500">
            No products found
        </div>`;
        return;
    }

    list.forEach(product => {

        productGrid.innerHTML += `
        <div class="bg-white rounded-2xl shadow overflow-hidden flex flex-col">

            <img src="${product.image}" class="w-full h-52 object-cover">

            <div class="p-4 flex flex-col flex-1">

                <p class="text-xs text-gray-500 uppercase">
                    ${product.category}
                </p>

                <h3 class="font-semibold mt-1">
                    ${product.name}
                </h3>

                <p class="text-gray-500 text-xs mt-1">
                    ${product.description || "No description available"}
                </p>

                <div class="flex gap-2 mt-3">
                    <span class="font-bold">₹${Number(product.price) || 0}</span>
                </div>

                <!-- BUTTONS -->
                <div class="flex gap-2 mt-4">

                    <!-- VIEW -->
                    <button
                        onclick="viewProduct('${product.id}')"
                        class="flex-1 border border-[#C8A96B] text-[#C8A96B] py-2 rounded-xl text-sm"
                        type="button"
                    >
                        View
                    </button>

                    <!-- ADD TO CART -->
                    <button
                        onclick="addToCart('${product.id}')"
                        class="flex-1 bg-[#1E1A17] text-white py-2 rounded-xl text-sm"
                        type="button"
                    >
                        Cart
                    </button>

                </div>

            </div>
        </div>`;
    });
}

// ==============================
function applyFilters() {

    const searchValue = searchInput?.value.toLowerCase() || "";

    const filtered = products.filter(product => {

        const categoryMatch =
            activeCategory === "All" ||
            product.category === activeCategory;

        const searchMatch =
            product.name.toLowerCase().includes(searchValue);

        return categoryMatch && searchMatch;
    });

    displayProducts(filtered);
}

searchInput?.addEventListener("input", applyFilters);

// ============================== CATEGORY FILTER

filterButtons.forEach(btn => {

    btn.addEventListener("click", function () {

        filterButtons.forEach(b => {
            b.classList.remove("bg-[#1E1A17]", "text-white");
            b.classList.add("bg-white");
        });

        this.classList.add("bg-[#1E1A17]", "text-white");

        activeCategory = this.innerText.trim();

        applyFilters();
    });
});

// ADD TO CART (FIXED ROOT ISSUE)

function addToCart(name,price,image){

    let cart =
    JSON.parse(localStorage.getItem("cart")) || [];

    let existing =
    cart.find(item => item.name === name);

    if(existing){

        existing.quantity++;

    }else{

        cart.push({

            id: Date.now(),

            name,

            price,

            image,

            quantity: 1

        });
    }

    localStorage.setItem(
        "cart",
        JSON.stringify(cart)
    );

    updateCartCount();

    alert("Added To Cart");
}

// CART COUNT

function updateCartCount(){

    let cart =
    JSON.parse(localStorage.getItem("cart")) || [];

    let count =
    cart.reduce(
        (sum,item)=>sum+item.quantity,
        0
    );

    let badge =
    document.getElementById("cartCount");

    if(badge){

        badge.innerText = count;
    }
}

updateCartCount();

// VIEW PRODUCT

function viewProduct(id) {
    window.location.href = `product.html?id=${id}`;
}

// INIT

displayProducts(products);
updateCartCount();