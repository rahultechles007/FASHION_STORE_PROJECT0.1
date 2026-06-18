
let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];

let container = document.getElementById("wishlistGrid");

function renderWishlist() {

    container.innerHTML = "";

    if (wishlist.length === 0) {
        container.innerHTML = "<p>No items in wishlist</p>";
        return;
    }

    wishlist.forEach(item => {

        container.innerHTML += `
        
        <div class="bg-white rounded-xl p-3 shadow">

            <img src="${item.image}" class="w-full h-40 object-cover rounded-lg">

            <h3 class="mt-2 font-semibold">${item.name}</h3>

            <p class="text-[#C8A96B] font-bold">₹${item.price}</p>

            <button onclick="removeFromWishlist(${item.id})"
                class="w-full mt-2 bg-red-500 text-white py-2 rounded-xl">
                Remove
            </button>

        </div>

        `;
    });
}


let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];

function toggleWishlist(id) {

    let products = JSON.parse(localStorage.getItem("products")) || [];

    let product = products.find(p => p.id === id);

    let exists = wishlist.find(item => item.id === id);

    if (exists) {
        wishlist = wishlist.filter(item => item.id !== id);
    } else {
        wishlist.push(product);
    }

    localStorage.setItem("wishlist", JSON.stringify(wishlist));
}

function removeFromWishlist(id) {

    wishlist = wishlist.filter(item => item.id !== id);

    localStorage.setItem("wishlist", JSON.stringify(wishlist));

    renderWishlist();
}

renderWishlist();