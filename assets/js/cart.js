// ================= CART DATA =================

let cart =
JSON.parse(localStorage.getItem("cart")) || [];

const cartItems =
document.getElementById("cartItems");

const totalPrice =
document.getElementById("totalPrice");

const totalPrice2 =
document.getElementById("totalPrice2");


// ================= DISPLAY CART =================

function renderCart(){

    if(!cartItems) return;

    cartItems.innerHTML = "";

    let total = 0;

    if(cart.length === 0){

        cartItems.innerHTML = `

        <div class="bg-white rounded-2xl p-8 text-center shadow">

            <i class="fa-solid fa-cart-shopping text-5xl text-gray-300"></i>

            <h2 class="text-xl font-bold mt-4">
                Your Cart Is Empty
            </h2>

            <a
                href="./shop.html"
                class="inline-block mt-5 bg-[#C8A96B] text-white px-6 py-3 rounded-xl"
            >
                Continue Shopping
            </a>

        </div>
        `;

        totalPrice.innerText = 0;
        totalPrice2.innerText = 0;

        return;
    }

    cart.forEach((item,index)=>{

        total += item.price * item.quantity;

        cartItems.innerHTML += `

        <div class="bg-white rounded-2xl shadow p-4">

            <div class="flex flex-col md:flex-row gap-4 items-center">

                <img
                    src="${item.image}"
                    class="w-28 h-28 rounded-xl object-cover"
                >

                <div class="flex-1">

                    <h3 class="font-bold text-lg">
                        ${item.name}
                    </h3>

                    <p class="text-[#C8A96B] font-semibold mt-2">
                        ₹${item.price}
                    </p>

                    <div class="flex items-center gap-3 mt-3">

                        <button
                            onclick="changeQty(${index},-1)"
                            class="bg-gray-200 px-3 py-1 rounded"
                        >
                            -
                        </button>

                        <span class="font-semibold">
                            ${item.quantity}
                        </span>

                        <button
                            onclick="changeQty(${index},1)"
                            class="bg-gray-200 px-3 py-1 rounded"
                        >
                            +
                        </button>

                    </div>

                </div>

                <div class="text-right">

                    <p class="font-bold text-lg">
                        ₹${item.price * item.quantity}
                    </p>

                    <button
                        onclick="removeItem(${index})"
                        class="text-red-500 mt-2"
                    >
                        Remove
                    </button>

                </div>

            </div>

        </div>

        `;
    });

    totalPrice.innerText = total;
    totalPrice2.innerText = total;

    updateCartCount();
}


// ================= QUANTITY =================

function changeQty(index,value){

    cart[index].quantity += value;

    if(cart[index].quantity <= 0){

        cart.splice(index,1);
    }

    localStorage.setItem(
        "cart",
        JSON.stringify(cart)
    );

    renderCart();
}


// ================= REMOVE =================

function removeItem(index){

    cart.splice(index,1);

    localStorage.setItem(
        "cart",
        JSON.stringify(cart)
    );

    renderCart();
}


// ================= COUNT =================

function updateCartCount(){

    let count =
    cart.reduce(
        (sum,item)=>sum+item.quantity,
        0
    );

    const badge =
    document.getElementById("cartCount");

    if(badge){

        badge.innerText = count;
    }
}


// ================= INIT =================

renderCart();