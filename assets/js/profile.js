const user =
JSON.parse(localStorage.getItem("currentUser"));

if(!user){

    window.location.href =
    "./login.html";
}

document.getElementById("userName")
.innerText =
user.name || "Velora User";

document.getElementById("userEmail")
.innerText =
user.email;

// Orders
let orders =
JSON.parse(localStorage.getItem("orders"))
|| [];

let myOrders =
orders.filter(
o => o.userEmail === user.email
);

document.getElementById("totalOrders")
.innerText =
myOrders.length;

// Wishlist
let wishlist =
JSON.parse(localStorage.getItem("wishlist"))
|| [];

document.getElementById("wishlistTotal")
.innerText =
wishlist.length;

// Total Spent
let spent =
myOrders.reduce(
(sum,o)=>sum + Number(o.total || 0),
0
);

document.getElementById("totalSpent")
.innerText =
"₹" + spent;

// Recent Orders

document.getElementById("myOrders")
.innerHTML =
myOrders.length
?
myOrders.map(order => `
<div class="border rounded-2xl p-4 hover:bg-gray-50 transition">

    <div class="flex justify-between">

        <div>

            <h3 class="font-bold">
                Order #${order.id}
            </h3>

            <p class="text-gray-500">
                ${order.date || ""}
            </p>

        </div>

        <span class="font-bold text-[#C8A96B]">
            ₹${order.total}
        </span>

    </div>

</div>
`).join("")
:
`
<div class="text-center py-10">

    <h3 class="text-gray-500">
        No Orders Yet
    </h3>

</div>
`;