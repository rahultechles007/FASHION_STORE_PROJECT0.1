// =====================
// GET CART
// =====================

function getCart() {

    return JSON.parse(
        localStorage.getItem("cart")
    ) || [];
}

// =====================
// GET ORDERS
// =====================

function getOrders() {

    return JSON.parse(
        localStorage.getItem("orders")
    ) || [];
}

// =====================
// SAVE ORDERS
// =====================

function saveOrders(orders) {

    localStorage.setItem(
        "orders",
        JSON.stringify(orders)
    );
}

// =====================
// GLOBAL VALUES
// =====================

let cart = getCart();

let total = 0;

// =====================
// LOAD CHECKOUT
// =====================

function loadCheckout() {

    const orderSummary =
        document.getElementById("orderSummary");

    const totalAmount =
        document.getElementById("totalAmount");

    if (!orderSummary || !totalAmount) return;

    orderSummary.innerHTML = "";

    total = 0;

    // EMPTY CART

    if (cart.length === 0) {

        orderSummary.innerHTML = `
            <p class="text-center text-gray-500 py-4">
                Your cart is empty
            </p>
        `;

        totalAmount.innerText = "0";

        return;
    }

    // PRODUCTS

    cart.forEach(item => {

        const quantity =
            item.quantity || 1;

        const itemTotal =
            item.price * quantity;

        total += itemTotal;

        const div =
            document.createElement("div");

        div.className =
            "flex justify-between items-center border-b py-3";

        div.innerHTML = `
            <div>
                <p class="font-medium">
                    ${item.name}
                </p>

                <p class="text-sm text-gray-500">
                    Qty: ${quantity}
                </p>
            </div>

            <span class="font-semibold">
                ₹${itemTotal}
            </span>
        `;

        orderSummary.appendChild(div);
    });

    // TOTAL

    const totalDiv =
        document.createElement("div");

    totalDiv.className =
        "flex justify-between items-center pt-4 font-bold text-lg";

    totalDiv.innerHTML = `
        <span>Total</span>
        <span>₹${total}</span>
    `;

    orderSummary.appendChild(totalDiv);

    totalAmount.innerText = total;
}

// =====================
// PLACE ORDER
// =====================

function placeOrder() {

    const cart =
        getCart();

    if (cart.length === 0) {

        alert("Your cart is empty");

        return;
    }

    const user =
        JSON.parse(
            localStorage.getItem("currentUser")
        );

    if (!user) {

        alert("Please login first");

        window.location.href =
            "./login.html";

        return;
    }

    const orders =
        getOrders();

    const orderTotal =
        cart.reduce(
            (sum, item) =>
                sum +
                (item.price *
                    (item.quantity || 1)),
            0
        );

    const newOrder = {

        id: Date.now(),

        userEmail:
            user.email,

        items: cart,

        total: orderTotal,

        status: "Processing",

        date:
            new Date().toLocaleString()
    };

    orders.push(newOrder);

    saveOrders(orders);

    // CLEAR CART

    localStorage.removeItem("cart");

    alert(
        "Order placed successfully!"
    );

    // REDIRECT

    window.location.href =
        "./order-success.html";
}

// =====================
// PAGE INIT
// =====================

document.addEventListener(
    "DOMContentLoaded",
    () => {

        loadCheckout();
    }
);