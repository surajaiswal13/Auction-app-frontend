const loginBtn = document.getElementById("loginBtn");
loginBtn.addEventListener("click", async (e) => {
  e.preventDefault();

  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  try {
    const response = await axios.post("http://127.0.0.1:8000/api/auth/login/", {
      username,
      password
    });

    localStorage.setItem("token", response.data.token);
    window.location.href = "dashboard.html";
  } catch (error) {
    alert("Incorrect username or password. Please try again.");
  }
});