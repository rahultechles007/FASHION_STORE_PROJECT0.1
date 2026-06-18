// =====================
// GET CART
// =====================
function getCart() {
    return JSON.parse(localStorage.getItem("cart")) || [];
}

// =====================
// SAVE ORDERS
// =====================
function getOrders() {
    return JSON.parse(localStorage.getItem("orders")) || [];
}

function saveOrders(orders) {
    localStorage.setItem("orders", JSON.stringify(orders));
}

// =====================
// GLOBAL VALUES
// =====================
let cart = getCart();
let total = 0;

// =====================
// RENDER CHECKOUT
// =====================
function loadCheckout() {

    const orderSummary = document.getElementById("orderSummary");
    const totalAmount = document.getElementById("totalAmount");

    if (!orderSummary || !totalAmount) return;

    orderSummary.innerHTML = "";
    total = 0;

    if (cart.length === 0) {
        orderSummary.innerHTML = `
            <p class="text-gray-500">Your cart is empty</p>
        `;
        totalAmount.innerText = 0;
        return;
    }

    cart.forEach(item => {

        const qty = item.quantity || 1;
        const itemTotal = item.price * qty;

        total += itemTotal;

        const div = document.createElement("div");
        div.className = "flex justify-between border-b py-2 text-sm";

        div.innerHTML = `
            <span>${item.name} × ${qty}</span>
            <span>₹${itemTotal}</span>
        `;

        orderSummary.appendChild(div);
    });

    // TOTAL
    const totalDiv = document.createElement("div");
    totalDiv.className = "flex justify-between mt-4 font-bold text-lg";

    totalDiv.innerHTML = `
        <span>Total</span>
        <span>₹${total}</span>
    `;

    orderSummary.appendChild(totalDiv);

    totalAmount.innerText = total;
}

// =====================
// PLACE ORDER (FINAL FIXED)
// =====================
function placeOrder() {

    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    if (cart.length === 0) return;

    let user = JSON.parse(localStorage.getItem("currentUser"));

    let orders = JSON.parse(localStorage.getItem("orders")) || [];

    let user = JSON.parse(localStorage.getItem("currentUser"));

let newOrder = {
    id: Date.now(),
    userEmail: user.email,
    items: cart,
    total: cart.reduce((sum, i) => sum + i.price * i.quantity, 0),
    status: "Processing",
    date: new Date().toLocaleString()
};
    orders.push(newOrder);

    localStorage.setItem("orders", JSON.stringify(orders));

    localStorage.removeItem("cart");

    window.location.href = "./order-success.html";
}
// =====================
// INIT PAGE
// =====================
document.addEventListener("DOMContentLoaded", loadCheckout);