const registerBtn = document.getElementById("registerBtn")
registerBtn.addEventListener("click", async (e) => {
    e.preventDefault()

    const username = document.getElementById("username").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const isBidder = document.getElementById("bidder").checked;
    const isSeller = document.getElementById("seller").checked;
    
    try {
        const response = await axios.post("http://127.0.0.1:8000/api/auth/register/", {
            username: username,
            email: email,
            password: password,
            is_seller: isBidder,
            is_bidder: isSeller
        });
        console.log(response.data.token)
        localStorage.setItem("token", response.data.token);
        window.location.href = "dashboard.html";
    } catch(err) {
        alert(err.message);
    }
})
