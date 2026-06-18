
console.log("AUTH JS LOADED");

// TOAST (FIXED - NO ERROR EVEN IF MISSING HTML)
function showToast(message) {

    let toast = document.getElementById("toast");

    if (!toast) {
        alert(message); // fallback
        return;
    }

    toast.innerText = message;
    toast.classList.remove("hidden");

    setTimeout(() => {
        toast.classList.add("hidden");
    }, 2000);
}


// =====  REGISTER 

function reguser() {

    let name = document.getElementById("name").value.trim();
    let email = document.getElementById("email").value.trim();
    let password = document.getElementById("password").value;
    let confirmPassword = document.getElementById("confirmPassword").value;

    if (!name || !email || !password || !confirmPassword) {
        alert("Fill all fields");
        return;
    }

    if (password !== confirmPassword) {
        alert("Passwords do not match");
        return;
    }

    let users = JSON.parse(localStorage.getItem("users")) || [];

    let exists = users.find(u => u.email === email);

    if (exists) {
        alert("User already exists");
        return;
    }

    users.push({
        id: Date.now(),
        name,
        email,
        password
    });

    localStorage.setItem("users", JSON.stringify(users));

    alert("Registered Successfully");

    window.location.href = "./login.html";
}


// ================= LOGIN 

function loginuser() {

    let email = document.getElementById("loginEmail").value.trim();
    let password = document.getElementById("loginPassword").value;

    // Admin login to logic to condition 
    if (email === "admin@velora.com" && password === "admin123") {
        localStorage.setItem("currentUser", JSON.stringify({
            name: "Admin",
            email,
            role: "admin"
        }));

        alert("Admin Login Successful");
        window.location.href = "./admin.html";
        return;
    }

    let users = JSON.parse(localStorage.getItem("users")) || [];

    let user = users.find(u =>
        u.email === email && u.password === password
    );

    if (!user) {
        alert("Invalid Email or Password");
        return;
    }

    localStorage.setItem("currentUser", JSON.stringify(user));

    alert("Login Successful");

    window.location.href = "../index.html";
}