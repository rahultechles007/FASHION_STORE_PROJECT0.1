const productGrid =
document.getElementById("productGrid");

const searchInput =
document.getElementById("searchInput");

const filterButtons =
document.querySelectorAll(".filter-btn");

let products =
JSON.parse(localStorage.getItem("products")) || [];

let activeCategory = "All";

function displayProducts(productList) {

    productGrid.innerHTML = "";

    if(productList.length === 0){

        productGrid.innerHTML = `
        <div class="col-span-full text-center py-10">
            No Products Available
        </div>
        `;

        return;
    }

    productList.forEach(product => {

        productGrid.innerHTML += `

<div class="bg-white rounded-2xl shadow hover:shadow-xl transition overflow-hidden flex flex-col h-[500px]">

    <div class="h-64 overflow-hidden">

        <img
        src="${product.image}"
        alt="${product.name}"
        class="w-full h-full object-cover">

    </div>

    <div class="p-4 flex flex-col flex-1">

     <p class="text-xs uppercase text-gray-500">
            ${product.name}
        </p

        <p class="text-xs uppercase text-gray-500">
            ${product.category}
        </p>

        <h3 class="font-bold text-lg mt-2">
            ${product.name}
        </h3>

        <div class="flex items-center gap-1 mt-2">

            <i class="fa-solid fa-star text-[#C8A96B]"></i>
            <span>
                ${product.rating || 4.5}
            </span>

        </div>

        <p class="text-sm text-gray-500 mt-2 flex-1">

            ${product.description || ""}

        </p>

        <div class="mt-3">

            <span class="text-2xl font-bold text-[#C8A96B]">

                ₹${product.price}

            </span>

        </div>

        <div class="flex gap-2 mt-4">

            <button
            onclick="viewProduct('${product.id}')"
            class="flex-1 border border-[#C8A96B] text-[#C8A96B] py-2 rounded-xl">

                <i class="fa-solid fa-eye mr-2"></i>

                View

            </button>

           <button
onclick="addToCart(
'${product.name}',
${product.price},
'${product.image}',
'${product.category}',
${product.rating || 4.5},
'${product.description || ""}'
)"
class="flex-1 bg-[#1E1A17] text-white py-2 rounded-xl">

Add Cart

</button>

        </div>

    </div>

</div>

`;
    });
}

function addToCart(productId) {

    let cart =
    JSON.parse(localStorage.getItem("cart")) || [];

    let product =
    products.find(
        p => String(p.id) === String(productId)
    );

    if (!product) {
        alert("Product not found");
        return;
    }

    let existing =
    cart.find(
        item => String(item.id) === String(product.id)
    );

    if (existing) {

        existing.quantity++;

    } else {

        cart.push({

            id: product.id,
            name: product.name,
            image: product.image,
            category: product.category,
            description: product.description,
            rating: product.rating || 4.5,
            price: Number(product.price),
            quantity: 1

        });
    }

    localStorage.setItem(
        "cart",
        JSON.stringify(cart)
    );

    updateCartCount();

    alert(product.name + " added to cart");
}

function updateCartCount(){

    let cart =
    JSON.parse(localStorage.getItem("cart")) || [];

    let count =
    cart.reduce(
        (sum,item)=>sum+item.quantity,
        0
    );

    document
    .querySelectorAll("#cartCount")
    .forEach(badge=>{

        badge.innerText = count;
    });
}

function viewProduct(id){

    localStorage.setItem(
        "selectedProduct",
        id
    );

    window.location.href =
    `product.html?id=${id}`;
}

function applyFilters(){

    let search =
    searchInput.value.toLowerCase();

    let filtered =
    products.filter(product=>{

        let categoryMatch =
        activeCategory==="All" ||
        product.category===activeCategory;

        let searchMatch =
        product.name.toLowerCase()
        .includes(search);

        return categoryMatch &&
        searchMatch;
    });

    displayProducts(filtered);
}

searchInput?.addEventListener(
    "input",
    applyFilters
);

filterButtons.forEach(btn=>{

    btn.addEventListener("click",()=>{

        activeCategory =
        btn.innerText.trim();

        applyFilters();
    });

});

displayProducts(products);

updateCartCount();