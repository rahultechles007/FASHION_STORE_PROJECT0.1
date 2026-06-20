// GET ID FROM URL
const product =
JSON.parse(
localStorage.getItem("viewProduct")
);




const container = document.getElementById("productDetails");

if (product) {

    container.innerHTML = `
    
    <img src="${product.image}" class="w-full rounded-xl">

    <div class="mt-4">

        <h1 class="text-3xl font-bold">${product.name}</h1>

        <p class="text-[#C8A96B] text-2xl font-bold mt-3">
            ₹${product.price}
        </p>

        <p class="text-gray-500 text-sm mt-2">
            ${product.description || "No description available"}
        </p>

        <button
            onclick="addToCart(${product.id})"
            class="mt-6 bg-[#1E1A17] text-white px-6 py-3 rounded-xl"
        >
            Add To Cart
        </button>

    </div>
    `;
}
// function addToCart(productId) {

//     let products = JSON.parse(localStorage.getItem("products")) || [];
//     let cart = JSON.parse(localStorage.getItem("cart")) || [];

//     let product = products.find(p => p.id === productId);

//     let existing = cart.find(item => item.id === productId);

//     if (existing) {
//         existing.quantity += 1;
//     } else {
//         cart.push({ ...product, quantity: 1 });
//     }

//     localStorage.setItem("cart", JSON.stringify(cart));

//     alert("Added to cart");
// }

// this optional case 