const registerBtn = document.getElementById("registerBtn");
registerBtn.addEventListener("click", (e) => {
    try {
        window.location.href = "register.html";
    } catch (error) {
        alert("Cannot go to login page")
    }
})

const loginBtn = document.getElementById("loginBtn");
loginBtn.addEventListener("click", (e) => {
    // e.preventDefault();
    
    try {
        window.location.href = "login.html";
    } catch (error) {
        alert("Cannot go to login page")
    }
});