// hero slider

const slides = document.querySelectorAll(".slide");
const dots = document.querySelectorAll(".dot");

let currentSlide = 0;

function showSlide(index) {

    slides.forEach((slide) => {
        slide.classList.add("hidden");
    });

    dots.forEach((dot) => {
        dot.classList.remove("bg-white");
        dot.classList.add("bg-white/50");
    });

    slides[index].classList.remove("hidden");

    dots[index].classList.remove("bg-white/50");
    dots[index].classList.add("bg-white");
}

document.getElementById("nextBtn").addEventListener("click", () => {

    currentSlide++;

    if(currentSlide >= slides.length){
        currentSlide = 0;
    }

    showSlide(currentSlide);
});

document.getElementById("prevBtn").addEventListener("click", () => {

    currentSlide--;

    if(currentSlide < 0){
        currentSlide = slides.length - 1;
    }

    showSlide(currentSlide);
});

setInterval(() => {

    currentSlide++;

    if(currentSlide >= slides.length){
        currentSlide = 0;
    }

    showSlide(currentSlide);

}, 5000);

showSlide(0);



// dark mode 

const menuBtn = document.getElementById("menuBtn");
const closeMenu = document.getElementById("closeMenu");
const mobileMenu = document.getElementById("mobileMenu");
const overlay = document.getElementById("overlay");

menuBtn.addEventListener("click", () => {

    mobileMenu.style.right = "0";

    overlay.classList.remove("hidden");

});

closeMenu.addEventListener("click", closeSidebar);

overlay.addEventListener("click", closeSidebar);

function closeSidebar(){

    mobileMenu.style.right = "-100%";

    overlay.classList.add("hidden");

}

//wishlist 


let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];

function toggleWishlist(id) {

    let products = JSON.parse(localStorage.getItem("products")) || [];

    let product = products.find(p => p.id === id);

    if (!product) return;

    let exists = wishlist.find(item => item.id === id);

    if (exists) {

        // REMOVE FROM WISHLIST
        wishlist = wishlist.filter(item => item.id !== id);

    } else {

        // ADD TO WISHLIST
        wishlist.push(product);
    }

    localStorage.setItem("wishlist", JSON.stringify(wishlist));

    updateWishlistUI();
}

//Toast Function 
function showToast(message) {

    let toast = document.getElementById("toast");

    if (!toast) return;

    toast.innerText = message;
    toast.classList.remove("hidden");

    toast.classList.add("opacity-100");

    setTimeout(() => {
        toast.classList.add("hidden");
    }, 2000);
}

// cart 
function addToCart(name, price, image) {

    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    let existing = cart.find(item => item.name === name);

    if (existing) {
        existing.quantity += 1;
    } else {
        cart.push({
            name: name,
            price: price,
            image: image,
            quantity: 1
        });
    }

    localStorage.setItem("cart", JSON.stringify(cart));

    updateCartCount();
}
//count nav bar 
function updateCartCount() {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    let count = cart.reduce((total, item) => total + item.quantity, 0);

    let cartCount = document.getElementById("cartCount");

    if (cartCount) {
        cartCount.innerText = count;
    }
}

updateCartCount();