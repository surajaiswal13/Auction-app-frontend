function register() {
    /*
    Registers a new user by sending a POST request to the API
    */

    // Get the register button element
    const registerBtn = document.getElementById("registerBtn")

    // Add a click event listener to the register button
    registerBtn.addEventListener("click", async (e) => {
        e.preventDefault()

        // Get the values of the input fields
        const username = document.getElementById("username").value;
        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;
        const isBidder = document.getElementById("bidder").checked;
        const isSeller = document.getElementById("seller").checked;
        
        try {
            // Send a POST request to the API to register a new user
            const response = await axios.post("http://127.0.0.1:8000/api/auth/register/", {
                username: username,
                email: email,
                password: password,
                is_seller: isBidder,
                is_bidder: isSeller
            });

            // Store the user's token in local storage
            localStorage.setItem("token", response.data.token);

            // Redirect the user to the dashboard page
            window.location.href = "dashboard.html";
        } catch(err) {
            // Display an error message if there was an error registering the user
            alert(err.message);
        }
    });
}

register();