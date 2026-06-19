const productGrid =
document.getElementById("productGrid");

const searchInput =
document.getElementById("searchInput");

const filterButtons =
document.querySelectorAll(".filter-btn");

let products =
JSON.parse(localStorage.getItem("products")) || [];

let activeCategory = "All";

// =====================
// TOAST
// =====================

function showToast(message){

    const toast =
    document.createElement("div");

    toast.className =
    "fixed top-5 right-5 bg-green-500 text-white px-5 py-3 rounded-xl shadow-lg z-50";

    toast.innerText = message;

    document.body.appendChild(toast);

    setTimeout(()=>{
        toast.remove();
    },2500);
}

// =====================
// DISPLAY PRODUCTS
// =====================

function displayProducts(productList){

    productGrid.innerHTML = "";

    if(productList.length===0){

        productGrid.innerHTML = `
        <div class="col-span-full text-center py-10">
            No Products Available
        </div>
        `;

        return;
    }

    productList.forEach(product=>{

        productGrid.innerHTML += `

<div class="group bg-white rounded-3xl overflow-hidden shadow hover:shadow-2xl transition duration-500 flex flex-col h-[550px]">

    <div class="aspect-[3/4] overflow-hidden">

        <img
        src="${product.image}"
        alt="${product.name}"
        class="w-full h-full object-cover group-hover:scale-110 transition duration-700">

    </div>

    <div class="p-4 flex flex-col flex-1">

        <p class="text-xs uppercase text-gray-400">
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

        <p class="text-sm text-gray-500 mt-3 flex-1">

            ${(product.description || "").substring(0,80)}

        </p>

        <div class="mt-4">

            <span class="text-2xl font-bold text-[#C8A96B]">

                ₹${product.price}

            </span>

        </div>

        <div class="flex gap-2 mt-4">

            <button
            onclick="viewProduct('${product.id}')"
            class="flex-1 border border-[#C8A96B] text-[#C8A96B] py-2 rounded-xl">

                View

            </button>

            <button
            onclick="addToCart(
'${product.name}',
${product.price},
'${product.image}'
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

// =====================
// CART
// =====================

function addToCart(productId){

    let cart =
    JSON.parse(localStorage.getItem("cart")) || [];

    let product =
    products.find(
        p=>String(p.id)===String(productId)
    );

    if(!product){
        return;
    }

    let existing =
    cart.find(
        item=>String(item.id)===String(product.id)
    );

    if(existing){

        existing.quantity++;

    }else{

        cart.push({

            id:product.id,
            name:product.name,
            image:product.image,
            category:product.category,
            description:product.description,
            rating:product.rating || 4.5,
            price:Number(product.price),
            quantity:1
        });
    }

    localStorage.setItem(
        "cart",
        JSON.stringify(cart)
    );

    updateCartCount();

    showToast(
        product.name +
        " added to cart"
    );
}

// =====================
// CART COUNT
// =====================

function updateCartCount(){

    let cart =
    JSON.parse(localStorage.getItem("cart")) || [];

    let count =
    cart.reduce(
        (sum,item)=>sum+item.quantity,
        0
    );

    document
    .querySelectorAll(".cartCount")
    .forEach(el=>{

        el.innerText = count;
    });
}

// =====================
// VIEW PRODUCT
// =====================

function viewProduct(id){

    localStorage.setItem(
        "selectedProduct",
        id
    );

    let viewed =
    JSON.parse(
        localStorage.getItem("recentlyViewed")
    ) || [];

    if(!viewed.includes(id)){

        viewed.unshift(id);

        viewed = viewed.slice(0,6);
    }

    localStorage.setItem(
        "recentlyViewed",
        JSON.stringify(viewed)
    );

    window.location.href =
    `product.html?id=${id}`;
}

// =====================
// FILTERS
// =====================

function applyFilters(){

    let search =
    searchInput?.value
    .toLowerCase() || "";

    let filtered =
    products.filter(product=>{

        const categoryMatch =
        activeCategory==="All" ||
        product.category===activeCategory;

        const searchMatch =
        product.name
        .toLowerCase()
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

// =====================
// FLASH SALE COUNTDOWN
// =====================

function startCountdown(){

    const countdown =
    document.getElementById("saleCountdown");

    if(!countdown) return;

    let end =
    new Date();

    end.setHours(
        end.getHours()+12
    );

    setInterval(()=>{

        let now =
        new Date().getTime();

        let distance =
        end.getTime()-now;

        let hours =
        Math.floor(distance/(1000*60*60));

        let mins =
        Math.floor(
            (distance%(1000*60*60))
            /(1000*60)
        );

        let secs =
        Math.floor(
            (distance%(1000*60))/1000
        );

        countdown.innerText =
        `${hours}h ${mins}m ${secs}s`;

    },1000);
}

// =====================
// INIT
// =====================

displayProducts(products);


updateCartCount();

startCountdown();