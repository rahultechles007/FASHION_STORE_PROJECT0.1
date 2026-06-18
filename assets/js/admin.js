
//  AUTH CECK  logic 
const currentUser = JSON.parse(localStorage.getItem("currentUser"));

if (!currentUser || currentUser.role !== "admin") {
    alert("Access Denied");
    window.location.href = "../pages/login.html";
}

//  DATA 
let users = JSON.parse(localStorage.getItem("users")) || [];
let orders = JSON.parse(localStorage.getItem("orders")) || [];
let products = JSON.parse(localStorage.getItem("products")) || [];

//  DASHBOARD COUNTS 
document.getElementById("totalUsers").innerText = users.length;
document.getElementById("totalOrders").innerText = orders.length;
document.getElementById("totalProducts").innerText = products.length;

                                                                                             
// REVENUE 
let revenue = 0;

orders.forEach(order => {
    revenue += order.total;
});

document.getElementById("totalRevenue").innerText = revenue;

//  CHART 
const ctx = document.getElementById('salesChart');

if (ctx) {
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
            datasets: [{
                label: 'Sales',
                data: [12000, 19000, 8000, 15000, 22000],
                backgroundColor: '#C8A96B'
            }]
        }
    });
}


//  ADD PRODUCT 
function addProduct() {

    let name = document.getElementById("productName").value;
    let price = document.getElementById("productPrice").value;
    let image = document.getElementById("productImage").value;
    let description = document.getElementById("pDescription").value.trim();
    let category = document.getElementById("productCategory").value;

    if (!name || !price || !imageFile || !description) {
    alert("Please fill all fields");
    return;
}
    // EDIT MODE
    if (editId !== null) {

        let index = products.findIndex(p => p.id === editId);

        products[index] = {
            id: editId,
            name,
            price: Number(price),
            image,
            description: description,
            category
        };

        editId = null;

        alert("Product Updated");

    } else {

        // ADD MODE
        products.push({
            id: Date.now(),
            name:name,
            price: Number(price),
            image,
            description: description,
            category
        });

        alert("Product Added");
    }

    localStorage.setItem("products", JSON.stringify(products));

    renderAdminProducts();
}
//  DELETE PRODUCT 
function deleteProduct(id) {

    let confirmDelete = confirm("Are you sure you want to delete this product?");

    if (!confirmDelete) return;

    products = products.filter(p => p.id !== id);

    localStorage.setItem("products", JSON.stringify(products));

    renderAdminProducts();
}

//  RENDER PRODUCTS (ADMIN LIST) 
function renderAdminProducts() {

    const container = document.getElementById("adminProductGrid");

    if (!container) return;

    container.innerHTML = "";

    products.forEach(product => {

        container.innerHTML += `
        
        <div class="bg-white p-4 rounded-xl shadow">

            <img src="${product.image}" class="w-full h-40 object-cover rounded-lg"/>

            <h3 class="font-semibold mt-2">${product.name}</h3>

            <p class="text-[#C8A96B] font-bold">₹${product.price}</p>

            <p class="text-sm text-gray-500">${product.category}</p>

            <div class="flex gap-2 mt-3">

                <button
                    onclick="editProduct(${product.id})"
                    class="w-1/2 bg-blue-500 text-white py-2 rounded-xl">
                    Edit
                </button>

                <button
                    onclick="deleteProduct(${product.id})"
                    class="w-1/2 bg-red-500 text-white py-2 rounded-xl">
                    Delete
                </button>

            </div>

        </div>

        `;
    });
}
//  INIT 
renderAdminProducts();

// edit product system

let editId = null;

function editProduct(id) {

    let product = products.find(p => p.id === id);

    document.getElementById("productName").value = product.name;
    document.getElementById("productPrice").value = product.price;
    document.getElementById("productImage").value = product.image;
    document.getElementById("productCategory").value = product.category;
    

    editId = id;
}

// realtime upgarde 

document.getElementById("adminSearch").addEventListener("input", function () {

    let value = this.value.toLowerCase();

    let filtered = products.filter(p => p.name.toLowerCase().includes(value));

    const container = document.getElementById("adminProductGrid");

    container.innerHTML = "";

    filtered.forEach(product => {

        container.innerHTML += `
        
        <div class="bg-white p-4 rounded-xl shadow">

            <img src="${product.image}" class="w-full h-40 object-cover rounded-lg"/>

            <h3 class="font-semibold mt-2">${product.name}</h3>

            <p class="text-[#C8A96B] font-bold">₹${product.price}</p>

        </div>

        `;
    });

});

// news letter 
function downloadSubscribers() {

    const { jsPDF } = window.jspdf;

    const doc = new jsPDF();

    let subscribers =
        JSON.parse(localStorage.getItem("subscribers")) || [];

    doc.setFontSize(18);
    doc.text("Velora Newsletter Subscribers", 20, 20);

    if (subscribers.length === 0) {

        doc.text("No subscribers found.", 20, 40);

    } else {

        let y = 40;

        subscribers.forEach((email, index) => {

            doc.text(
                `${index + 1}. ${email}`,
                20,
                y
            );

            y += 10;
        });

    }

    doc.save("Velora_Subscribers.pdf");
}