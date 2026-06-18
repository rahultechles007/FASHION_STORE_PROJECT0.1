console.log("Velora Auth Loaded");

// ======================
// REGISTER
// ======================

function reguser() {

    const name =
        document.getElementById("registerName")
        .value.trim();

    const email =
        document.getElementById("registerEmail")
        .value.trim()
        .toLowerCase();

    const password =
        document.getElementById("registerPassword")
        .value;

    const confirmPassword =
        document.getElementById("confirmPassword")
        .value;

    if (
        !name ||
        !email ||
        !password ||
        !confirmPassword
    ) {
        alert("Please fill all fields");
        return;
    }

    if (password.length < 6) {
        alert("Password must be at least 6 characters");
        return;
    }

    if (password !== confirmPassword) {
        alert("Passwords do not match");
        return;
    }

    let users =
        JSON.parse(
            localStorage.getItem("users")
        ) || [];

    const exists =
        users.find(
            user =>
                user.email === email
        );

    if (exists) {
        alert("User already exists");
        return;
    }

    const newUser = {
        id: Date.now(),
        name,
        email,
        password,
        role: "user",
        createdAt: new Date()
    };

    users.push(newUser);

    localStorage.setItem(
        "users",
        JSON.stringify(users)
    );

    alert("Registration Successful");

    window.location.href =
        "./login.html";
}


// ======================
// LOGIN
// ======================

function loginuser() {

    const email =
        document.getElementById("loginEmail")
        .value.trim()
        .toLowerCase();

    const password =
        document.getElementById("loginPassword")
        .value;

    if (!email || !password) {
        alert("Please fill all fields");
        return;
    }

    // ADMIN LOGIN

    if (
        email === "admin@velora.com" &&
        password === "admin123"
    ) {

        const adminUser = {
            id: 0,
            name: "Admin",
            email: "admin@velora.com",
            role: "admin"
        };

        localStorage.setItem(
            "currentUser",
            JSON.stringify(adminUser)
        );

        alert("Admin Login Successful");

        window.location.href =
            "./admin.html";

        return;
    }

    // USER LOGIN

    const users =
        JSON.parse(
            localStorage.getItem("users")
        ) || [];

    const user =
        users.find(
            u =>
                u.email.toLowerCase() === email &&
                u.password === password
        );

    if (!user) {

        alert(
            "Invalid Email or Password"
        );

        return;
    }

    localStorage.setItem(
        "currentUser",
        JSON.stringify(user)
    );

    alert("Login Successful");

    window.location.href =
        "../index.html";
}


// ======================
// LOGOUT
// ======================

function logout() {

    localStorage.removeItem(
        "currentUser"
    );

    window.location.href =
        "./login.html";
}


// ======================
// FORGOT PASSWORD
// ======================

function resetPassword() {

    const email =
        document.getElementById("resetEmail")
        .value.trim()
        .toLowerCase();

    const newPassword =
        document.getElementById("newPassword")
        .value;

    if (
        !email ||
        !newPassword
    ) {
        alert("Fill all fields");
        return;
    }

    let users =
        JSON.parse(
            localStorage.getItem("users")
        ) || [];

    const user =
        users.find(
            u =>
                u.email.toLowerCase() === email
        );

    if (!user) {

        alert("User not found");

        return;
    }

    user.password =
        newPassword;

    localStorage.setItem(
        "users",
        JSON.stringify(users)
    );

    alert(
        "Password Updated Successfully"
    );

    if (
        typeof closeForgotModal ===
        "function"
    ) {
        closeForgotModal();
    }
}