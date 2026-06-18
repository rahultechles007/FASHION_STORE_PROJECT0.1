
// ==========================
// ADD TO CART
// ==========================

function addToCart(
    name,
    price,
    image,
    category = "Fashion",
    rating = 4.5,
    description = ""
) {

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
            price: Number(price),
            image,
            category,
            rating,
            description,
            quantity: 1

        });
    }

    localStorage.setItem(
        "cart",
        JSON.stringify(cart)
    );

    updateCartCount();

    alert(name + " Added To Cart");
}

updateCartCount();
// ==========================
// CART COUNT
// ==========================

function updateCartCount() {

    let cart =
    JSON.parse(localStorage.getItem("cart")) || [];

    let count =
    cart.reduce(
        (total,item)=>total + item.quantity,
        0
    );

    document
    .querySelectorAll("#cartCount")
    .forEach(badge => {

        badge.innerText = count;
    });
}

// ==========================
// CART PAGE
// ==========================

function loadCart() {

    const cartItems =
    document.getElementById("cartItems");

    if(!cartItems) return;

    let cart =
    JSON.parse(localStorage.getItem("cart")) || [];

    let total = 0;

    cartItems.innerHTML = "";

    if(cart.length === 0){

        cartItems.innerHTML = `

        <div class="bg-white p-10 rounded-2xl text-center">

            <i class="fa-solid fa-cart-shopping text-5xl text-gray-300"></i>

            <h2 class="text-2xl font-bold mt-4">
                Cart Is Empty
            </h2>

        </div>

        `;

        return;
    }

    cart.forEach(item => {

        total += item.price * item.quantity;

        cartItems.innerHTML += `

        <div class="bg-white rounded-2xl shadow p-4 flex gap-4">

         <img
src="${item.image}"
alt="${item.name}"
class="w-32 h-32 object-cover rounded-xl border">
            <div class="flex-1">

                <h3 class="font-bold text-xl">

                    ${item.name}

                </h3>

                <p class="text-sm text-gray-500">

                    ${item.category}

                </p>

                <p class="text-sm mt-2 text-gray-600">

                    ${item.description || ""}

                </p>

                <div class="flex items-center gap-2 mt-2">

                    <i class="fa-solid fa-star text-[#C8A96B]"></i>

                    ${item.rating}

                </div>

                <div class="mt-3 text-xl font-bold text-[#C8A96B]">

                    ₹${item.price}

                </div>

                <div class="flex items-center gap-3 mt-3">

                    <button
                    onclick="changeQty('${item.id}',-1)"
                    class="w-8 h-8 bg-gray-200 rounded">

                        -

                    </button>

                    <span>

                        ${item.quantity}

                    </span>

                    <button
                    onclick="changeQty('${item.id}',1)"
                    class="w-8 h-8 bg-gray-200 rounded">

                        +

                    </button>

                    <button
                    onclick="removeItem('${item.id}')"
                    class="ml-auto text-red-500">

                        <i class="fa-solid fa-trash"></i>

                    </button>

                </div>

            </div>

        </div>

        `;
    });

    document.getElementById("totalPrice").innerText =
    total;

    document.getElementById("totalPrice2").innerText =
    total;
}

// ==========================
// QUANTITY
// ==========================

function changeQty(id,value){

    let cart =
    JSON.parse(localStorage.getItem("cart")) || [];

    cart.forEach(item => {

        if(String(item.id) === String(id)){

            item.quantity += value;

            if(item.quantity < 1){

                item.quantity = 1;
            }
        }
    });

    localStorage.setItem(
        "cart",
        JSON.stringify(cart)
    );

    loadCart();

    updateCartCount();
}

// ==========================
// REMOVE
// ==========================

function removeItem(id){

    let cart =
    JSON.parse(localStorage.getItem("cart")) || [];

    cart =
    cart.filter(
        item => String(item.id) !== String(id)
    );

    localStorage.setItem(
        "cart",
        JSON.stringify(cart)
    );

    loadCart();

    updateCartCount();
}

// ==========================
// INIT
// ==========================

updateCartCount();
loadCart();