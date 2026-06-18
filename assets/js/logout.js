// logout.js

function logout() {
    try {
        // Remove logged-in user
        localStorage.removeItem("currentUser");

        // Optional: clear session data
        sessionStorage.clear();

        // Redirect to login page
        window.location.replace("../pages/login.html");

    } catch (error) {
        console.error("Logout failed:", error);
        alert("Unable to logout. Please try again.");
    }
}

// Make available to onclick buttons
window.logout = logout;